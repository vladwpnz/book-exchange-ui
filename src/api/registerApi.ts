import axios from 'axios'

import { apiClient, isBackendConnectionError } from './client'

export type RegisterUserInput = {
  name: string
  email: string
  password: string
}

const registerSuccessMessage =
  'Successfully registered, your email is your username'

const genericRegisterError =
  'Unable to create the account. Please check your details and try again.'

const backendUnavailableError =
  'The book service is unavailable right now. Please try again shortly.'

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
    return backendUnavailableError
  }

  if (!axios.isAxiosError(error)) {
    return error instanceof Error ? error.message : genericRegisterError
  }

  return (
    getTextErrorMessage(error.response?.data) ??
    getJsonErrorMessage(error.response?.data) ??
    genericRegisterError
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
      throw new Error(genericRegisterError)
    }

    return typeof response.data === 'string' && response.data.trim().length > 0
      ? response.data.trim()
      : registerSuccessMessage
  } catch (error) {
    throw new Error(getRegisterErrorMessage(error), { cause: error })
  }
}
