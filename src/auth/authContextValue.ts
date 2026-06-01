import { createContext } from 'react'

import type { AuthError } from '../types/auth'

export type AuthContextValue = {
  currentUserEmail: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: AuthError | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  clearAuthError: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
