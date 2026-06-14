import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import { registerUser } from '../api/registerApi'
import { useAuth } from '../auth/useAuth'
import { AuthShell } from '../components/AuthShell'
import { StateMessage } from '../components/StateMessage'

export function RegisterPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsLoading(true)
    setError('')
    setSuccessMessage('')

    try {
      await registerUser({ name, email, password })
      const message = 'Account created. You can now sign in.'

      setSuccessMessage(message)
      window.setTimeout(() => {
        navigate('/login', { state: { successMessage: message } })
      }, 900)
    } catch (registerError) {
      setError(
        registerError instanceof Error
          ? registerError.message
          : 'Unable to create the account. Please try again.',
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
      title="Create account"
      description="Create your reader account to start cataloging and exchanging books."
    >
      <form className="mt-6" onSubmit={handleSubmit} aria-busy={isLoading}>
        <label
          className="block text-sm font-bold text-[var(--color-ink-soft)]"
          htmlFor="name"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => {
            setError('')
            setName(event.target.value)
          }}
          placeholder="Reader name"
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
          Email
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
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => {
            setError('')
            setPassword(event.target.value)
          }}
          placeholder="Password"
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
            title="Could not create account"
          >
            <span id="register-error">{error}</span>
          </StateMessage>
        ) : null}

        {successMessage ? (
          <StateMessage className="mt-5" tone="success">
            {successMessage}
          </StateMessage>
        ) : null}

        {isLoading ? (
          <span className="sr-only" role="status" aria-live="polite">
            Creating account.
          </span>
        ) : null}

        <button
          type="submit"
          disabled={isLoading || successMessage.length > 0}
          className="primary-action mt-6 w-full disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-[var(--color-muted)]">
        Already registered?{' '}
        <Link
          className="font-bold text-[var(--color-accent)] transition duration-200 hover:text-[var(--color-accent-strong)]"
          to="/login"
        >
          Login
        </Link>
      </p>
    </AuthShell>
  )
}
