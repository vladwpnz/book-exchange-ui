import axios from 'axios'

import i18n from '../i18n/i18n'
import { apiClient, isBackendConnectionError } from './client'

export type RegisterUserInput = {
  name: string
  email: string
  password: string
}

function getRegisterSuccessMessage() {
  return i18n.t('api.register.success')
}

function getGenericRegisterError() {
  return i18n.t('api.register.generic')
}

function getBackendUnavailableError() {
  return i18n.t('api.register.backendUnavailable')
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function getJsonErrorMessage(data: unknown) {
  if (isRecord(data) && typeof data.error === 'string') {
    const error = data.error.trim()

    return error.length > 0 ? error : undefined
  }

  return undefined
}

function getTextErrorMessage(data: unknown) {
  if (typeof data !== 'string') {
    return undefined
  }

  const text = data.trim()

  if (text.length === 0) {
    return undefined
  }

  try {
    return getJsonErrorMessage(JSON.parse(text)) ?? text
  } catch {
    return text
  }
}

function getRegisterErrorMessage(error: unknown) {
  if (isBackendConnectionError(error)) {
    return getBackendUnavailableError()
  }

  if (!axios.isAxiosError(error)) {
    return error instanceof Error ? error.message : getGenericRegisterError()
  }

  return (
    getTextErrorMessage(error.response?.data) ??
    getJsonErrorMessage(error.response?.data) ??
    getGenericRegisterError()
  )
}

export async function registerUser(input: RegisterUserInput) {
  try {
    const response = await apiClient.post<string>('/register', {
      name: input.name.trim(),
      email: input.email.trim(),
      password: input.password,
      authority: 'user',
    })

    if (response.status !== 201) {
      throw new Error(getGenericRegisterError())
    }

    return typeof response.data === 'string' && response.data.trim().length > 0
      ? response.data.trim()
      : getRegisterSuccessMessage()
  } catch (error) {
    throw new Error(getRegisterErrorMessage(error), { cause: error })
  }
}
