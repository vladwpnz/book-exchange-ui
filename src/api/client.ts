import axios from 'axios'

import type { AuthCredentials } from '../types/auth'

export const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
})

export function createBasicAuthHeaders(credentials: AuthCredentials) {
  return {
    Authorization: `Basic ${window.btoa(
      `${credentials.email}:${credentials.password}`,
    )}`,
  }
}

export function isInvalidCredentialsError(error: unknown) {
  if (!axios.isAxiosError(error)) {
    return false
  }

  const status = error.response?.status

  return (
    status === 401 ||
    status === 403 ||
    (typeof status === 'number' && status >= 300 && status < 400)
  )
}

export function isBackendConnectionError(error: unknown) {
  return axios.isAxiosError(error) && !error.response
}
