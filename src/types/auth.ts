export type AuthCredentials = {
  email: string
  password: string
}

export type AuthErrorCode =
  | 'invalid_credentials'
  | 'backend_unavailable'
  | 'unknown'

export type AuthError = {
  code: AuthErrorCode
  message: string
}
