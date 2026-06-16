import i18n, { type ResourceLanguage } from 'i18next'
import { initReactI18next } from 'react-i18next'

import {
  defaultLanguage,
  getLanguageMetadata,
  isSupportedLanguage,
  LANGUAGE_STORAGE_KEY,
  resolveBrowserLanguage,
  supportedLanguageCodes,
  type SupportedLanguage,
} from './languages'
import en from './locales/en'

type DynamicLanguage = Exclude<SupportedLanguage, 'en'>

const localeLoaders = {
  ru: () =>
    import('./locales/ru').then(
      ({ default: resource }) => resource as ResourceLanguage,
    ),
  uk: () =>
    import('./locales/uk').then(
      ({ default: resource }) => resource as ResourceLanguage,
    ),
  pl: () =>
    import('./locales/pl').then(
      ({ default: resource }) => resource as ResourceLanguage,
    ),
  'zh-CN': () =>
    import('./locales/zh-CN').then(
      ({ default: resource }) => resource as ResourceLanguage,
    ),
} satisfies Record<DynamicLanguage, () => Promise<ResourceLanguage>>

const loadedResources = new Map<SupportedLanguage, ResourceLanguage>([
  [defaultLanguage, en as ResourceLanguage],
])
const loadingResources = new Map<SupportedLanguage, Promise<ResourceLanguage>>()

function getStoredLanguage(): SupportedLanguage | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)

    return isSupportedLanguage(storedLanguage) ? storedLanguage : null
  } catch {
    return null
  }
}

function getInitialLanguage(): SupportedLanguage {
  return getStoredLanguage() ?? resolveBrowserLanguage()
}

function persistLanguage(language: SupportedLanguage) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  } catch {
    return
  }
}

function applyDocumentLanguage(language: SupportedLanguage) {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.lang = getLanguageMetadata(language).htmlLang
}

function getCachedResource(language: SupportedLanguage) {
  return loadedResources.get(language)
}

function loadLanguageResource(language: SupportedLanguage) {
  const cachedResource = getCachedResource(language)

  if (cachedResource) {
    return Promise.resolve(cachedResource)
  }

  const existingRequest = loadingResources.get(language)

  if (existingRequest) {
    return existingRequest
  }

  const loader = localeLoaders[language as DynamicLanguage]

  if (!loader) {
    return Promise.resolve(en as ResourceLanguage)
  }

  const nextRequest = loader()
    .then((resource) => {
      loadedResources.set(language, resource)
      loadingResources.delete(language)

      return resource
    })
    .catch((error: unknown) => {
      loadingResources.delete(language)

      throw error
    })

  loadingResources.set(language, nextRequest)

  return nextRequest
}

async function resolveLoadableLanguage(language: SupportedLanguage) {
  if (language === defaultLanguage) {
    return defaultLanguage
  }

  try {
    await loadLanguageResource(language)

    return language
  } catch {
    return defaultLanguage
  }
}

function addLoadedResourceBundle(language: SupportedLanguage) {
  const resource = getCachedResource(language)

  if (
    !resource ||
    !i18n.isInitialized ||
    i18n.hasResourceBundle(language, 'translation')
  ) {
    return
  }

  i18n.addResourceBundle(language, 'translation', resource, true, true)
}

async function getInitialI18nOptions() {
  const requestedLanguage = getInitialLanguage()
  const initialLanguage = await resolveLoadableLanguage(requestedLanguage)
  const initialResources: Partial<
    Record<SupportedLanguage, { translation: ResourceLanguage }>
  > = {
    [defaultLanguage]: {
      translation: en as ResourceLanguage,
    },
  }

  if (initialLanguage !== defaultLanguage) {
    const resource = getCachedResource(initialLanguage)

    if (resource) {
      initialResources[initialLanguage] = {
        translation: resource,
      }
    }
  }

  return {
    initialLanguage,
    initialResources,
  }
}

async function initializeI18n() {
  const { initialLanguage, initialResources } = await getInitialI18nOptions()

  applyDocumentLanguage(initialLanguage)

  await i18n.use(initReactI18next).init({
    resources: initialResources,
    lng: initialLanguage,
    fallbackLng: defaultLanguage,
    supportedLngs: supportedLanguageCodes,
    initAsync: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    returnNull: false,
  })

  persistLanguage(initialLanguage)
}

export async function changeAppLanguage(language: SupportedLanguage) {
  const requestedLanguage = isSupportedLanguage(language)
    ? language
    : defaultLanguage
  const nextLanguage = await resolveLoadableLanguage(requestedLanguage)

  addLoadedResourceBundle(nextLanguage)
  await i18n.changeLanguage(nextLanguage)
  applyDocumentLanguage(nextLanguage)
  persistLanguage(nextLanguage)

  return nextLanguage
}

export const i18nReady = initializeI18n()

i18n.on('languageChanged', (language) => {
  const nextLanguage = isSupportedLanguage(language) ? language : defaultLanguage

  applyDocumentLanguage(nextLanguage)
  persistLanguage(nextLanguage)
})

export default i18n
