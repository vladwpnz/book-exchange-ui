import { useState, type ReactNode } from 'react'

import {
  apiClient,
  createBasicAuthHeaders,
  isBackendConnectionError,
  isInvalidCredentialsError,
} from '../api/client'
import { isOwnedBooksPayload } from '../api/booksApi'
import type { AuthCredentials, AuthError } from '../types/auth'
import { AuthContext } from './authContextValue'
import {
  clearCredentials,
  loadCredentials,
  saveCredentials,
} from './authStorage'

const invalidCredentialsError: AuthError = {
  code: 'invalid_credentials',
  message: 'Email or password is incorrect. Please try again.',
}

const backendUnavailableError: AuthError = {
  code: 'backend_unavailable',
  message: 'The book service is unavailable right now. Please try again shortly.',
}

const unknownAuthError: AuthError = {
  code: 'unknown',
  message: 'Unable to sign in. Please try again.',
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
    return invalidCredentialsError
  }

  if (isBackendConnectionError(error)) {
    return backendUnavailableError
  }

  return unknownAuthError
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
        throw invalidCredentialsError
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
