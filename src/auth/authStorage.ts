import type { AuthCredentials } from '../types/auth'

const STORAGE_KEY = 'bookExchange.credentials'

function isAuthCredentials(value: unknown): value is AuthCredentials {
  if (!value || typeof value !== 'object') {
    return false
  }

  const credentials = value as Record<string, unknown>

  return (
    typeof credentials.email === 'string' &&
    typeof credentials.password === 'string'
  )
}

export function saveCredentials(email: string, password: string) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ email, password }))
}

export function loadCredentials(): AuthCredentials | null {
  const storedCredentials = localStorage.getItem(STORAGE_KEY)

  if (!storedCredentials) {
    return null
  }

  try {
    const credentials = JSON.parse(storedCredentials)

    if (isAuthCredentials(credentials)) {
      return credentials
    }
  } catch {
    clearCredentials()
  }

  return null
}

export function clearCredentials() {
  localStorage.removeItem(STORAGE_KEY)
}

export function hasCredentials() {
  return loadCredentials() !== null
}
