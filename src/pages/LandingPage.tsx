import { Link } from 'react-router-dom'

import { repositoryLinks } from '../api/links'
import { featuredBooks } from '../api/mockLibrary'
import { useAuth } from '../auth/useAuth'
import { BookCard } from '../components/BookCard'
import { Navbar } from '../components/Navbar'

const features = [
  {
    title: 'Connected exchange flows',
    description:
      'Manage owned books, held books, sharing, giving, returns, and admin recovery from one connected interface.',
  },
  {
    title: 'Backend-backed actions',
    description:
      'Core screens call the Spring Boot API with Basic Auth and reflect real backend responses.',
  },
  {
    title: 'Portfolio-grade interface',
    description:
      'The UI highlights routing, reusable components, API integration, form states, and visual polish.',
  },
]

const techStack = ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Spring Boot']

export function LandingPage() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen text-slate-100">
      <Navbar />

      <main>
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(34,211,238,0.14),transparent_30rem),radial-gradient(circle_at_78%_4%,rgba(52,211,153,0.10),transparent_28rem)]" />

          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[1fr_520px] lg:px-8 lg:py-20">
            <div className="flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
                Book exchange network
              </p>

              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-tight tracking-tight text-slate-50 sm:text-6xl">
                A modern dashboard for sharing books.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
                A polished React application for managing owned books, borrowed
                books, exchanges, transfers, returns, and admin recovery through
                a connected Spring Boot backend.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/app/my-books" className="primary-action">
                  Open dashboard
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
            </div>

            <div className="premium-panel reveal-blur rounded-2xl p-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
                    Dashboard preview
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-50">
                    Exchange desk
                  </h2>
                </div>

                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">
                  Preview
                </span>
              </div>

              <div className="mt-4 grid gap-4">
                {featuredBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} className="premium-card rounded-2xl p-6">
                <div className="relative z-10">
                  <div className="mb-5 h-1.5 w-16 rounded-full bg-linear-to-r from-cyan-300 to-emerald-300" />
                  <h2 className="text-xl font-semibold text-slate-50">
                    {feature.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {feature.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
              Tech stack
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {techStack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200"
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
