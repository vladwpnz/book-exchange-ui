import { useState, type ReactNode } from 'react'

import {
  apiClient,
  createBasicAuthHeaders,
  isBackendConnectionError,
  isInvalidCredentialsError,
} from '../api/client'
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
  message: 'Backend is unavailable. Check that the API is running and try again.',
}

const unknownAuthError: AuthError = {
  code: 'unknown',
  message: 'Unable to sign in. Please try again.',
}

function getAuthError(error: unknown) {
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
      await apiClient.get('/owned', {
        headers: createBasicAuthHeaders(nextCredentials),
      })
      saveCredentials(nextCredentials.email, nextCredentials.password)
      setCredentials(nextCredentials)
    } catch (loginError) {
      const nextError = getAuthError(loginError)

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
