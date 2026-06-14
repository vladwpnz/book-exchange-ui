import { Link } from 'react-router-dom'

import { repositoryLinks } from '../api/links'
import { featuredBooks } from '../api/mockLibrary'
import { useAuth } from '../auth/useAuth'
import { BookCard } from '../components/BookCard'
import { Navbar } from '../components/Navbar'

const features = [
  {
    title: 'Exchange flows in one rhythm',
    description:
      'Owned books, held books, sharing, giving, returns, and admin recovery stay visible without making the interface feel heavy.',
  },
  {
    title: 'Backend-backed product surface',
    description:
      'Core screens still call the Spring Boot API with Basic Auth and reflect real backend responses.',
  },
  {
    title: 'Editorial book identity',
    description:
      'Warm paper tones, restrained borders, and literary type hierarchy make the product feel like a modern reading desk.',
  },
]

const techStack = ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Spring Boot']

const deskStats = [
  { label: 'Owned shelf', value: '3' },
  { label: 'Open flows', value: '7' },
  { label: 'API surface', value: 'Live' },
]

export function LandingPage() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen text-zinc-950">
      <Navbar />

      <main>
        <section className="relative overflow-hidden border-b border-zinc-200">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_500px] lg:items-center lg:px-8 lg:py-12">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-700">
                Editorial Exchange Desk
              </p>

              <h1 className="mt-5 font-[var(--font-display)] text-5xl font-semibold leading-[0.98] text-zinc-950 sm:text-6xl lg:text-7xl">
                Book Exchange
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
                A warm, precise front desk for sharing books: owned catalog,
                borrowed shelf, transfers, returns, and admin recovery connected
                through the existing Spring Boot backend.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/app/my-books" className="primary-action">
                  Open exchange desk
                </Link>

                {!isAuthenticated && (
                  <>
                    <Link to="/login" className="secondary-action">
                      Login
                    </Link>

                    <Link to="/register" className="secondary-action">
                      Register
                    </Link>
                  </>
                )}

                <a
                  href={repositoryLinks.backend}
                  target="_blank"
                  rel="noreferrer"
                  className="secondary-action"
                >
                  View backend
                </a>

                <a
                  href={repositoryLinks.apiTests}
                  target="_blank"
                  rel="noreferrer"
                  className="secondary-action"
                >
                  View API tests
                </a>
              </div>

              <div
                className="mt-7 flex h-20 items-end gap-2 lg:hidden"
                aria-hidden="true"
              >
                <span className="h-16 w-9 rounded-md border border-green-200 bg-[#F0FDF4] shadow-[0_8px_18px_rgba(17,17,17,0.06)]" />
                <span className="h-20 w-10 rounded-md border border-amber-200 bg-[#FFFBEB] shadow-[0_8px_18px_rgba(17,17,17,0.06)]" />
                <span className="h-14 w-9 rounded-md border border-zinc-200 bg-white shadow-[0_8px_18px_rgba(17,17,17,0.06)]" />
                <span className="ml-2 h-px flex-1 bg-zinc-200" />
              </div>

              <dl className="mt-7 hidden max-w-xl grid-cols-3 gap-px overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200 sm:grid">
                {deskStats.map((stat) => (
                  <div key={stat.label} className="bg-white px-4 py-3">
                    <dt className="text-xs font-semibold text-zinc-500">
                      {stat.label}
                    </dt>
                    <dd className="mt-1 font-[var(--font-display)] text-2xl font-semibold text-zinc-950">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <aside
              className="reveal-blur relative hidden lg:block"
              aria-label="Exchange desk preview"
            >
              <div className="absolute inset-x-6 top-6 h-[88%] rounded-xl border border-zinc-200 bg-[#F1EEE8]" />
              <div className="relative mx-auto max-w-[29rem]">
                <div className="mb-3 flex items-center justify-between border-b border-zinc-200 pb-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                      Desk preview
                    </p>
                    <h2 className="mt-2 font-[var(--font-display)] text-3xl font-semibold text-zinc-950">
                      Active shelf
                    </h2>
                  </div>

                  <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-green-800">
                    Live shape
                  </span>
                </div>

                <div className="grid gap-3">
                  {featuredBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <div className="mb-7 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">
              Direction
            </p>
            <h2 className="mt-2 font-[var(--font-display)] text-4xl font-semibold text-zinc-950">
              Premium, restrained, and unmistakably bookish.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="border-l border-zinc-200 pl-5"
              >
                <div className="mb-5 h-1.5 w-14 rounded-full bg-linear-to-r from-blue-600 via-green-700 to-amber-600" />
                <h2 className="font-[var(--font-display)] text-2xl font-semibold leading-7 text-zinc-950">
                  {feature.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-zinc-200 bg-white/60">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">
              Tech stack
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {techStack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
