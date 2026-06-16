import { useRef, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import { registerUser } from '../api/registerApi'
import { useAuth } from '../auth/useAuth'
import { useAuthExitTransition } from '../auth/useAuthExitTransition'
import { AuthShell } from '../components/AuthShell'
import { StateMessage } from '../components/StateMessage'

export function RegisterPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { isAuthenticated } = useAuth()
  const { isExiting, startExitTransition } = useAuthExitTransition()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const isSubmitLockedRef = useRef(false)
  const isSubmitting = isLoading || isExiting

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting || isSubmitLockedRef.current) {
      return
    }

    isSubmitLockedRef.current = true
    setIsLoading(true)
    setError('')
    setSuccessMessage('')

    try {
      await registerUser({ name, email, password })
      const message = t('register.success')

      setSuccessMessage(message)
      startExitTransition(() => {
        navigate('/login', {
          state: {
            successMessageKey: 'register.success',
            authEntry: 'from-register',
          },
        })
      })
    } catch (registerError) {
      isSubmitLockedRef.current = false
      setError(
        registerError instanceof Error
          ? registerError.message
          : t('register.fallbackError'),
      )
    } finally {
      setIsLoading(false)
    }
  }

  if (isAuthenticated) {
    return <Navigate to="/app/my-books" replace />
  }

  return (
    <AuthShell
      title={t('register.title')}
      description={t('register.description')}
      isExiting={isExiting}
    >
      <form className="mt-6" onSubmit={handleSubmit} aria-busy={isSubmitting}>
        <label
          className="block text-sm font-bold text-[var(--color-ink-soft)]"
          htmlFor="name"
        >
          {t('register.name')}
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => {
            setError('')
            setName(event.target.value)
          }}
          placeholder={t('common.placeholders.readerName')}
          required
          autoComplete="name"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'register-error' : undefined}
          className="field-input mt-2"
        />

        <label
          className="mt-4 block text-sm font-bold text-[var(--color-ink-soft)]"
          htmlFor="email"
        >
          {t('register.email')}
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => {
            setError('')
            setEmail(event.target.value)
          }}
          placeholder="reader@example.com"
          required
          autoComplete="email"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'register-error' : undefined}
          className="field-input mt-2"
        />

        <label
          className="mt-4 block text-sm font-bold text-[var(--color-ink-soft)]"
          htmlFor="password"
        >
          {t('register.password')}
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => {
            setError('')
            setPassword(event.target.value)
          }}
          placeholder={t('common.placeholders.password')}
          required
          autoComplete="new-password"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'register-error' : undefined}
          className="field-input mt-2"
        />

        {error ? (
          <StateMessage
            className="mt-5"
            tone="error"
            title={t('register.errorTitle')}
          >
            <span id="register-error">{error}</span>
          </StateMessage>
        ) : null}

        {successMessage ? (
          <StateMessage className="mt-5" tone="success">
            {successMessage}
          </StateMessage>
        ) : null}

        {isSubmitting ? (
          <span className="sr-only" role="status" aria-live="polite">
            {t('register.creating')}
          </span>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting || successMessage.length > 0}
          className="primary-action mt-6 w-full disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? t('register.creating') : t('register.title')}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-[var(--color-muted)]">
        {t('register.alreadyRegistered')}{' '}
        <Link
          className="font-bold text-[var(--color-accent)] transition duration-200 hover:text-[var(--color-accent-strong)]"
          to="/login"
        >
          {t('common.actions.login')}
        </Link>
      </p>
    </AuthShell>
  )
}
