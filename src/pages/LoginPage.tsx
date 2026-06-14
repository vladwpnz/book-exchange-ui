import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '../auth/useAuth'
import { AuthShell } from '../components/AuthShell'
import { StateMessage } from '../components/StateMessage'

function getSuccessMessage(state: unknown) {
  if (!state || typeof state !== 'object') {
    return ''
  }

  const locationState = state as Record<string, unknown>

  return typeof locationState.successMessage === 'string'
    ? locationState.successMessage
    : ''
}

export function LoginPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { clearAuthError, error, isAuthenticated, isLoading, login } = useAuth()
  const successMessage = getSuccessMessage(location.state)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await login(email, password)
      navigate('/app/my-books')
    } catch {
      return
    }
  }

  if (isAuthenticated) {
    return <Navigate to="/app/my-books" replace />
  }

  return (
    <AuthShell
      title="Login"
      description="Use your email and password to continue to your exchange workspace."
    >
      {successMessage ? (
        <StateMessage className="mt-5" tone="success">
          {successMessage}
        </StateMessage>
      ) : null}

      <form className="mt-6" onSubmit={handleSubmit} aria-busy={isLoading}>
        <label
          className="block text-sm font-bold text-[var(--color-ink-soft)]"
          htmlFor="email"
        >
          Email
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
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => {
            clearAuthError()
            setPassword(event.target.value)
          }}
          placeholder="Password"
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
            title="Could not sign in"
          >
            <span id="login-error">{error.message}</span>
          </StateMessage>
        ) : null}

        {isLoading ? (
          <span className="sr-only" role="status" aria-live="polite">
            Signing in.
          </span>
        ) : null}

        <button
          type="submit"
          disabled={isLoading}
          className="primary-action mt-6 w-full disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Signing in...' : 'Continue'}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-[var(--color-muted)]">
        New here?{' '}
        <Link
          className="font-bold text-[var(--color-accent)] transition duration-200 hover:text-[var(--color-accent-strong)]"
          to="/register"
        >
          Create an account
        </Link>
      </p>
    </AuthShell>
  )
}
