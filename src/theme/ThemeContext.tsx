import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { ThemeContext, type Theme } from './themeContextValue'

type ThemeProviderProps = {
  children: ReactNode
}

const THEME_STORAGE_KEY = 'bookExchange.theme'
const DEFAULT_THEME: Theme = 'dark'

function isTheme(value: string | null | undefined): value is Theme {
  return value === 'dark' || value === 'light'
}

function getStoredTheme() {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY)
  } catch {
    return null
  }
}

function getInitialTheme(): Theme {
  if (typeof document === 'undefined') {
    return DEFAULT_THEME
  }

  const currentTheme = document.documentElement.dataset.theme

  if (isTheme(currentTheme)) {
    return currentTheme
  }

  const storedTheme = getStoredTheme()

  return isTheme(storedTheme) ? storedTheme : DEFAULT_THEME
}

function applyTheme(theme: Theme) {
  const root = document.documentElement

  root.dataset.theme = theme
  root.style.colorScheme = theme
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)

  const setTheme = useCallback((nextTheme: Theme) => {
    applyTheme(nextTheme)
    setThemeState(nextTheme)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((currentTheme) => {
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark'

      applyTheme(nextTheme)

      return nextTheme
    })
  }, [])

  useEffect(() => {
    applyTheme(theme)

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      return
    }
  }, [theme])

  const value = useMemo(
    () => ({
      setTheme,
      theme,
      toggleTheme,
    }),
    [setTheme, theme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
