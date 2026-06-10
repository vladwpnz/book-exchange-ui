import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '../auth/useAuth'

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
    <div className="min-h-screen text-slate-100">
      <main className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-6">
        <div className="w-full max-w-md">
          <form
            className="form-panel reveal-blur p-6 sm:p-8"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col items-center text-center">
              <div className="relative grid h-20 w-20 place-items-center overflow-hidden rounded-2xl border border-cyan-300/25 bg-white/[0.045] shadow-[0_0_44px_rgba(34,211,238,0.12)]">
                <span className="absolute inset-0 bg-linear-to-br from-cyan-300/16 via-transparent to-emerald-300/14" />
                <span className="absolute h-11 w-8 -rotate-6 rounded-sm border-l-[7px] border-cyan-200 bg-slate-100 shadow-[0_0_18px_rgba(125,211,252,0.34)]" />
                <span className="absolute h-10 w-8 translate-x-3 rotate-6 rounded-sm border-l-[7px] border-emerald-200 bg-cyan-50/90 shadow-[0_0_18px_rgba(52,211,153,0.22)]" />
                <span className="absolute bottom-5 h-1 w-12 rounded-full bg-linear-to-r from-cyan-300 to-emerald-300" />
              </div>

              <p className="mt-5 text-xl font-semibold text-slate-50">
                Book Exchange
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
                Exchange Network
              </p>
            </div>

            <h1 className="mt-8 text-3xl font-semibold tracking-tight text-slate-50">
              Login
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Use your email and password to continue to your exchange
              dashboard.
            </p>
            {successMessage ? (
              <p
                className="mt-5 rounded-xl border border-emerald-300/25 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-100"
                role="status"
              >
                {successMessage}
              </p>
            ) : null}
            <label
              className="mt-6 block text-sm font-semibold text-slate-200"
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
              className="field-input mt-2"
            />
            <label
              className="mt-4 block text-sm font-semibold text-slate-200"
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
              className="field-input mt-2"
            />
            {error ? (
              <p
                className="mt-5 rounded-xl border border-red-300/25 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-100"
                role="alert"
              >
                {error.message}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={isLoading}
              className="primary-action mt-6 w-full disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? 'Signing in...' : 'Continue'}
            </button>
            <p className="mt-5 text-center text-sm text-slate-400">
              New here?{' '}
              <Link
                className="font-semibold text-cyan-200 transition hover:text-cyan-100"
                to="/register"
              >
                Create an account
              </Link>
            </p>
          </form>

          <p className="mt-5 text-center text-sm">
            <Link
              className="font-semibold text-slate-400 transition hover:text-slate-200"
              to="/"
            >
              Back to home
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
