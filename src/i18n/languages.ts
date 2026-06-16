export const LANGUAGE_STORAGE_KEY = 'book-exchange-language'

export type SupportedLanguage = 'en' | 'ru' | 'uk' | 'pl' | 'zh-CN'

export type LanguageMetadata = {
  code: SupportedLanguage
  name: string
  compactLabel: string
  htmlLang: string
}

export const defaultLanguage: SupportedLanguage = 'en'

export const languages = [
  {
    code: 'en',
    name: 'English',
    compactLabel: 'EN',
    htmlLang: 'en',
  },
  {
    code: 'ru',
    name: 'Русский',
    compactLabel: 'RU',
    htmlLang: 'ru',
  },
  {
    code: 'uk',
    name: 'Українська',
    compactLabel: 'UA',
    htmlLang: 'uk',
  },
  {
    code: 'pl',
    name: 'Polski',
    compactLabel: 'PL',
    htmlLang: 'pl',
  },
  {
    code: 'zh-CN',
    name: '简体中文',
    compactLabel: '中文',
    htmlLang: 'zh-CN',
  },
] as const satisfies readonly LanguageMetadata[]

export const supportedLanguageCodes = languages.map(
  ({ code }) => code,
) as SupportedLanguage[]

const supportedLanguageSet = new Set<SupportedLanguage>(supportedLanguageCodes)

export function isSupportedLanguage(
  language: string | null | undefined,
): language is SupportedLanguage {
  return (
    typeof language === 'string' &&
    supportedLanguageSet.has(language as SupportedLanguage)
  )
}

export function getLanguageMetadata(language: SupportedLanguage) {
  return languages.find(({ code }) => code === language) ?? languages[0]
}

export function mapBrowserLanguage(
  language: string | null | undefined,
): SupportedLanguage {
  const normalizedLanguage = language?.toLowerCase()

  if (!normalizedLanguage) {
    return defaultLanguage
  }

  if (normalizedLanguage.startsWith('ru')) {
    return 'ru'
  }

  if (normalizedLanguage.startsWith('uk')) {
    return 'uk'
  }

  if (normalizedLanguage.startsWith('pl')) {
    return 'pl'
  }

  if (normalizedLanguage.startsWith('zh')) {
    return 'zh-CN'
  }

  return defaultLanguage
}

export function resolveBrowserLanguage(): SupportedLanguage {
  if (typeof navigator === 'undefined') {
    return defaultLanguage
  }

  const browserLanguages =
    Array.isArray(navigator.languages) && navigator.languages.length > 0
      ? navigator.languages
      : [navigator.language]
  const supportedBrowserLanguage = browserLanguages.find((language) => {
    const normalizedLanguage = language.toLowerCase()

    return (
      normalizedLanguage.startsWith('ru') ||
      normalizedLanguage.startsWith('uk') ||
      normalizedLanguage.startsWith('pl') ||
      normalizedLanguage.startsWith('zh')
    )
  })

  return mapBrowserLanguage(supportedBrowserLanguage)
}
