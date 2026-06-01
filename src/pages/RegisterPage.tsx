import { Link } from 'react-router-dom'

import { Navbar } from '../components/Navbar'

export function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#07130f] text-stone-100">
      <Navbar />
      <main className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-6 lg:grid-cols-[420px_1fr] lg:px-8">
        <form
          className="rounded-lg border border-white/10 bg-[#f6eddc] p-6 text-[#17221d] shadow-[0_30px_90px_rgba(0,0,0,0.28)]"
          onSubmit={(event) => event.preventDefault()}
        >
          <h1 className="text-3xl font-semibold">Create account</h1>
          <p className="mt-2 text-sm leading-6 text-[#5c675b]">
            Registration will be connected to the backend later. This form does
            not create an account yet.
          </p>
          <label className="mt-6 block text-sm font-semibold" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Reader name"
            className="mt-2 w-full rounded-md border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
          />
          <label className="mt-4 block text-sm font-semibold" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="reader@example.com"
            className="mt-2 w-full rounded-md border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
          />
          <label className="mt-4 block text-sm font-semibold" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="mt-2 w-full rounded-md border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
          />
          <button
            type="submit"
            className="mt-6 w-full rounded-md bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600"
          >
            Register
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
            Account creation stays as a planned integration while the first
            Basic Auth login flow is wired to the backend.
          </p>
        </section>
      </main>
    </div>
  )
}
