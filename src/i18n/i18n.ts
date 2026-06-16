import i18n from 'i18next'
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
import pl from './locales/pl'
import ru from './locales/ru'
import uk from './locales/uk'
import zhCN from './locales/zh-CN'

const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
  uk: {
    translation: uk,
  },
  pl: {
    translation: pl,
  },
  'zh-CN': {
    translation: zhCN,
  },
} as const

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

const initialLanguage = getInitialLanguage()

applyDocumentLanguage(initialLanguage)

void i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: defaultLanguage,
  supportedLngs: supportedLanguageCodes,
  initAsync: false,
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
})

i18n.on('languageChanged', (language) => {
  const nextLanguage = isSupportedLanguage(language) ? language : defaultLanguage

  applyDocumentLanguage(nextLanguage)
  persistLanguage(nextLanguage)
})

export default i18n
