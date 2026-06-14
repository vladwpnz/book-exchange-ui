import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '../auth/useAuth'
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
    <div className="min-h-screen text-zinc-950">
      <main className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-md">
          <Link
            className="secondary-action mb-4"
            to="/"
            aria-label="Back to Book Exchange home"
          >
            Back to home
          </Link>

          <form
            className="form-panel motion-line reveal-blur p-6 sm:p-8"
            onSubmit={handleSubmit}
            aria-busy={isLoading}
          >
            <div className="flex items-center gap-3">
              <div className="relative grid h-14 w-14 place-items-center overflow-hidden rounded-xl border border-zinc-200 bg-[#F1EEE8] shadow-[0_1px_2px_rgba(17,17,17,0.06)]">
                <span className="absolute inset-y-3 left-4 w-[3px] rounded-full bg-blue-600" />
                <span className="absolute left-5 top-3 h-8 w-6 -rotate-6 rounded-[3px] border border-zinc-300 bg-white" />
                <span className="absolute bottom-3 h-px w-9 bg-zinc-300" />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-950">Book Exchange</p>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                  Editorial desk
                </p>
              </div>
            </div>

            <h1 className="mt-8 font-[var(--font-display)] text-4xl font-semibold leading-tight text-zinc-950">
              Login
            </h1>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Use your email and password to continue to your exchange
              dashboard.
            </p>
            {successMessage ? (
              <StateMessage className="mt-5" tone="success">
                {successMessage}
              </StateMessage>
            ) : null}
            <label
              className="mt-6 block text-sm font-bold text-zinc-800"
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
              className="mt-4 block text-sm font-bold text-zinc-800"
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
                <span id="login-error">
                  {error.message}
                </span>
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
            <p className="mt-5 text-center text-sm text-zinc-600">
              New here?{' '}
              <Link
                className="font-bold text-blue-700 transition duration-200 hover:text-blue-800"
                to="/register"
              >
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  )
}
