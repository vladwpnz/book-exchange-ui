import { loadCredentials } from '../auth/authStorage'
import { apiClient, createBasicAuthHeaders } from './client'

export type UserProfile = {
  name: string
  email: string
  authority: string
  avatarUrl: string | null
}

export type UpdateProfileInput = {
  name: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function getRequiredText(value: unknown, fieldName: string) {
  if (typeof value === 'string' && value.trim().length > 0) {
    return value.trim()
  }

  throw new Error(`Profile response contains an invalid ${fieldName}.`)
}

function getAvatarUrl(value: unknown) {
  if (value === null || value === undefined) {
    return null
  }

  if (typeof value === 'string') {
    const trimmedValue = value.trim()

    return trimmedValue.length > 0 ? trimmedValue : null
  }

  throw new Error('Profile response contains an invalid avatarUrl.')
}

function toUserProfile(data: unknown): UserProfile {
  if (!isRecord(data)) {
    throw new Error('Profile response has an unexpected format.')
  }

  return {
    name: getRequiredText(data.name, 'name'),
    email: getRequiredText(data.email, 'email'),
    authority: getRequiredText(data.authority, 'authority'),
    avatarUrl: getAvatarUrl(data.avatarUrl),
  }
}

function getSavedCredentials() {
  const credentials = loadCredentials()

  if (!credentials) {
    throw new Error('Saved sign-in details are missing. Please sign in again.')
  }

  return credentials
}

export async function getProfile() {
  const credentials = getSavedCredentials()

  const response = await apiClient.get<unknown>('/me', {
    headers: createBasicAuthHeaders(credentials),
  })

  return toUserProfile(response.data)
}

export async function updateProfile(input: UpdateProfileInput) {
  const credentials = getSavedCredentials()
  const name = input.name.trim()

  if (!name) {
    throw new Error('Profile name is required.')
  }

  const response = await apiClient.patch<unknown>(
    '/me',
    { name },
    {
      headers: createBasicAuthHeaders(credentials),
    },
  )

  return toUserProfile(response.data)
}
