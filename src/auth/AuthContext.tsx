import { useState, type ReactNode } from 'react'

import {
  apiClient,
  createBasicAuthHeaders,
  isBackendConnectionError,
  isInvalidCredentialsError,
} from '../api/client'
import { isOwnedBooksPayload } from '../api/booksApi'
import i18n from '../i18n/i18n'
import type { AuthCredentials, AuthError } from '../types/auth'
import { AuthContext } from './authContextValue'
import {
  clearCredentials,
  loadCredentials,
  saveCredentials,
} from './authStorage'

function getInvalidCredentialsError(): AuthError {
  return {
    code: 'invalid_credentials',
    message: i18n.t('api.auth.invalidCredentials'),
  }
}

function getBackendUnavailableError(): AuthError {
  return {
    code: 'backend_unavailable',
    message: i18n.t('api.auth.backendUnavailable'),
  }
}

function getUnknownAuthError(): AuthError {
  return {
    code: 'unknown',
    message: i18n.t('api.auth.unknown'),
  }
}

function isAuthError(error: unknown): error is AuthError {
  if (!error || typeof error !== 'object') {
    return false
  }

  const authError = error as Record<string, unknown>

  return (
    (authError.code === 'invalid_credentials' ||
      authError.code === 'backend_unavailable' ||
      authError.code === 'unknown') &&
    typeof authError.message === 'string'
  )
}

function getAuthError(error: unknown) {
  if (isAuthError(error)) {
    return error
  }

  if (isInvalidCredentialsError(error)) {
    return getInvalidCredentialsError()
  }

  if (isBackendConnectionError(error)) {
    return getBackendUnavailableError()
  }

  return getUnknownAuthError()
}

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [credentials, setCredentials] = useState<AuthCredentials | null>(() =>
    loadCredentials(),
  )
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<AuthError | null>(null)

  const login = async (email: string, password: string) => {
    const normalizedEmail = email.trim()
    const nextCredentials = { email: normalizedEmail, password }

    setIsLoading(true)
    setError(null)

    try {
      const response = await apiClient.get<unknown>('/owned', {
        headers: createBasicAuthHeaders(nextCredentials),
      })

      if (!isOwnedBooksPayload(response.data)) {
        throw getInvalidCredentialsError()
      }

      saveCredentials(nextCredentials.email, nextCredentials.password)
      setCredentials(nextCredentials)
    } catch (loginError) {
      const nextError = getAuthError(loginError)

      if (nextError.code === 'invalid_credentials') {
        clearCredentials()
        setCredentials(null)
      }

      setError(nextError)
      throw nextError
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    clearCredentials()
    setCredentials(null)
    setError(null)
  }

  const clearAuthError = () => {
    setError(null)
  }

  return (
    <AuthContext.Provider
      value={{
        currentUserEmail: credentials?.email ?? null,
        isAuthenticated: credentials !== null,
        isLoading,
        error,
        login,
        logout,
        clearAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
