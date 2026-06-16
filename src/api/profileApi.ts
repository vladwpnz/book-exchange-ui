import { loadCredentials } from '../auth/authStorage'
import i18n from '../i18n/i18n'
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

  throw new Error(i18n.t('api.profile.readField', { field: fieldName }))
}

function getAvatarUrl(value: unknown) {
  if (value === null || value === undefined) {
    return null
  }

  if (typeof value === 'string') {
    const trimmedValue = value.trim()

    return trimmedValue.length > 0 ? trimmedValue : null
  }

  throw new Error(i18n.t('api.profile.avatar'))
}

function toUserProfile(data: unknown): UserProfile {
  if (!isRecord(data)) {
    throw new Error(i18n.t('api.profile.details'))
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
    throw new Error(i18n.t('api.profile.missingCredentials'))
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
    throw new Error(i18n.t('api.profile.requiredName'))
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
