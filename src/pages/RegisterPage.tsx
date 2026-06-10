import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import { registerUser } from '../api/registerApi'
import { useAuth } from '../auth/useAuth'
import { Navbar } from '../components/Navbar'

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
    <div className="min-h-screen bg-[#07130f] text-stone-100">
      <Navbar />
      <main className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-6 lg:grid-cols-[420px_1fr] lg:px-8">
        <form
          className="rounded-lg border border-white/10 bg-[#f6eddc] p-6 text-[#17221d] shadow-[0_30px_90px_rgba(0,0,0,0.28)]"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl font-semibold">Create account</h1>
          <p className="mt-2 text-sm leading-6 text-[#5c675b]">
            Create your account in the backend, then sign in with your email and
            password.
          </p>
          <label className="mt-6 block text-sm font-semibold" htmlFor="name">
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
            className="mt-2 w-full rounded-md border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
          />
          <label className="mt-4 block text-sm font-semibold" htmlFor="email">
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
            className="mt-2 w-full rounded-md border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
          />
          <label className="mt-4 block text-sm font-semibold" htmlFor="password">
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
            className="mt-2 w-full rounded-md border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
          />
          {error ? (
            <p
              className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
              role="alert"
            >
              {error}
            </p>
          ) : null}
          {successMessage ? (
            <p
              className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
              role="status"
            >
              {successMessage}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={isLoading || successMessage.length > 0}
            className="mt-6 w-full rounded-md bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:bg-emerald-900 disabled:text-white/70"
          >
            {isLoading ? 'Creating account...' : 'Register'}
          </button>
          <p className="mt-5 text-sm text-[#5c675b]">
            Already registered?{' '}
            <Link className="font-semibold text-emerald-800" to="/login">
              Login
            </Link>
          </p>
        </form>

        <section className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase text-amber-200">
            Join the shelf
          </p>
          <h2 className="mt-4 text-4xl font-semibold leading-12 text-stone-50">
            Build a personal exchange catalog.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-stone-400">
            Register as a reader, then use your new backend credentials to open
            the exchange workspace.
          </p>
        </section>
      </main>
    </div>
  )
}
