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

  return error.response?.status === 401 || error.response?.status === 403
}

export function isBackendConnectionError(error: unknown) {
  return axios.isAxiosError(error) && !error.response
}
