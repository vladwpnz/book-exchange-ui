import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../auth/useAuth'
import { Navbar } from '../components/Navbar'

export function LoginPage() {
  const navigate = useNavigate()
  const { clearAuthError, error, isLoading, login } = useAuth()
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

  return (
    <div className="min-h-screen bg-[#07130f] text-stone-100">
      <Navbar />
      <main className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
        <section className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase text-amber-200">
            Member access
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-12 text-stone-50">
            Sign in to manage your exchanges.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-stone-400">
            Use your backend account credentials. The app validates access with
            Basic Auth before opening your exchange workspace.
          </p>
        </section>

        <form
          className="rounded-lg border border-white/10 bg-[#f6eddc] p-6 text-[#17221d] shadow-[0_30px_90px_rgba(0,0,0,0.28)]"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-semibold">Login</h2>
          <p className="mt-2 text-sm leading-6 text-[#5c675b]">
            Sign in with the same email and password used by the Spring Boot
            API.
          </p>
          <label className="mt-6 block text-sm font-semibold" htmlFor="email">
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
              clearAuthError()
              setPassword(event.target.value)
            }}
            placeholder="Password"
            required
            autoComplete="current-password"
            className="mt-2 w-full rounded-md border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
          />
          {error ? (
            <p
              className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
              role="alert"
            >
              {error.message}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 w-full rounded-md bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:bg-emerald-900 disabled:text-white/70"
          >
            {isLoading ? 'Signing in...' : 'Continue'}
          </button>
          <p className="mt-5 text-sm text-[#5c675b]">
            New here?{' '}
            <Link className="font-semibold text-emerald-800" to="/register">
              Create an account
            </Link>
          </p>
        </form>
      </main>
    </div>
  )
}
