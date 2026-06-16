import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '../auth/useAuth'
import {
  shouldSkipAuthLayoutTransition,
  useAuthExitTransition,
} from '../auth/useAuthExitTransition'
import { AuthShell } from '../components/AuthShell'
import { StateMessage } from '../components/StateMessage'

function getSuccessMessage(state: unknown, t: (key: string) => string) {
  if (!state || typeof state !== 'object') {
    return ''
  }

  const locationState = state as Record<string, unknown>

  if (typeof locationState.successMessageKey === 'string') {
    return t(locationState.successMessageKey)
  }

  return typeof locationState.successMessage === 'string'
    ? locationState.successMessage
    : ''
}

function isRegisterAuthEntry(state: unknown) {
  if (!state || typeof state !== 'object') {
    return false
  }

  const locationState = state as Record<string, unknown>

  return locationState.authEntry === 'from-register'
}

export function LoginPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { clearAuthError, error, isAuthenticated, isLoading, login } = useAuth()
  const { isExiting, startExitTransition } = useAuthExitTransition()
  const successMessage = getSuccessMessage(location.state, t)
  const [usesRegisterEntry] = useState(() => isRegisterAuthEntry(location.state))
  const [shouldAnimateRegisterEntry] = useState(
    () => usesRegisterEntry && !shouldSkipAuthLayoutTransition(),
  )
  const [hasStartedRegisterEntry, setHasStartedRegisterEntry] = useState(
    () => !shouldAnimateRegisterEntry,
  )
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoginPending, setIsLoginPending] = useState(false)
  const isSubmitLockedRef = useRef(false)
  const isSubmitting = isLoading || isLoginPending || isExiting

  useEffect(() => {
    if (!usesRegisterEntry) {
      return
    }

    const nextState = successMessage ? { successMessage } : null

    if (!shouldAnimateRegisterEntry) {
      navigate(location.pathname, { replace: true, state: nextState })
      return
    }

    const frameId = window.requestAnimationFrame(() => {
      setHasStartedRegisterEntry(true)
      navigate(location.pathname, { replace: true, state: nextState })
    })

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [
    location.pathname,
    navigate,
    shouldAnimateRegisterEntry,
    successMessage,
    usesRegisterEntry,
  ])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting || isSubmitLockedRef.current) {
      return
    }

    isSubmitLockedRef.current = true
    setIsLoginPending(true)

    try {
      await login(email, password)
      startExitTransition(() => {
        navigate('/app/my-books')
      })
    } catch {
      isSubmitLockedRef.current = false
      setIsLoginPending(false)
      return
    }
  }

  if (isAuthenticated && !isSubmitting) {
    return <Navigate to="/app/my-books" replace />
  }

  return (
    <AuthShell
      title={t('login.title')}
      description={t('login.description')}
      formSide={usesRegisterEntry ? 'right' : 'left'}
      isExiting={isExiting}
      isEnteringFromRegister={shouldAnimateRegisterEntry}
      hasStartedRegisterEntry={hasStartedRegisterEntry}
    >
      {successMessage ? (
        <StateMessage className="mt-5" tone="success">
          {successMessage}
        </StateMessage>
      ) : null}

      <form className="mt-6" onSubmit={handleSubmit} aria-busy={isSubmitting}>
        <label
          className="block text-sm font-bold text-[var(--color-ink-soft)]"
          htmlFor="email"
        >
          {t('login.email')}
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => {
            clearAuthError()
            setEmail(event.target.value)
          }}
          placeholder="reader@example.com"
          required
          autoComplete="email"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'login-error' : undefined}
          className="field-input mt-2"
        />

        <label
          className="mt-4 block text-sm font-bold text-[var(--color-ink-soft)]"
          htmlFor="password"
        >
          {t('login.password')}
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => {
            clearAuthError()
            setPassword(event.target.value)
          }}
          placeholder={t('common.placeholders.password')}
          required
          autoComplete="current-password"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'login-error' : undefined}
          className="field-input mt-2"
        />

        {error ? (
          <StateMessage
            className="mt-5"
            tone="error"
            title={t('login.errorTitle')}
          >
            <span id="login-error">{error.message}</span>
          </StateMessage>
        ) : null}

        {isSubmitting ? (
          <span className="sr-only" role="status" aria-live="polite">
            {t('login.signingIn')}
          </span>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="primary-action mt-6 w-full disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? t('login.signingIn') : t('common.actions.continue')}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-[var(--color-muted)]">
        {t('login.newHere')}{' '}
        <Link
          className="font-bold text-[var(--color-accent)] transition duration-200 hover:text-[var(--color-accent-strong)]"
          to="/register"
        >
          {t('common.actions.createAccount')}
        </Link>
      </p>
    </AuthShell>
  )
}
