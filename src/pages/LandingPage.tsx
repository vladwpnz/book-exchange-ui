import { Link } from 'react-router-dom'

import { repositoryLinks } from '../api/links'
import { featuredBooks } from '../api/mockLibrary'
import { BookCard } from '../components/BookCard'
import { Navbar } from '../components/Navbar'

const features = [
  {
    title: 'Catalog-first flows',
    description:
      'Reader actions are framed around books, holders, and simple exchange states.',
  },
  {
    title: 'Backend-ready placeholders',
    description:
      'Screens are prepared for the Spring Boot API while staying fully static here.',
  },
  {
    title: 'Portfolio-friendly polish',
    description:
      'The shell highlights routing, layout structure, forms, and real application rhythm.',
  },
]

const techStack = ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Spring Boot API']

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#07130f] text-stone-100">
      <Navbar />
      <main>
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.16),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(245,158,11,0.12),transparent_32%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[1fr_520px] lg:px-8 lg:py-20">
            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold uppercase text-amber-200">
                Dark Modern Library
              </p>
              <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-14 text-stone-50 sm:text-6xl sm:leading-18">
                Book Exchange UI
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300">
                A polished React application shell for browsing, sharing, giving,
                and returning books through a future Spring Boot integration.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/app/my-books"
                  className="rounded-md bg-emerald-400 px-5 py-3 text-sm font-semibold text-[#07130f] shadow-[0_14px_40px_rgba(16,185,129,0.28)] transition hover:-translate-y-0.5 hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-200"
                >
                  Get started
                </Link>
                <Link
                  to="/login"
                  className="rounded-md border border-white/15 px-5 py-3 text-sm font-semibold text-stone-100 transition hover:-translate-y-0.5 hover:border-amber-200/50 hover:bg-white/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-200"
                >
                  Login
                </Link>
                <a
                  href={repositoryLinks.backend}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-white/15 px-5 py-3 text-sm font-semibold text-stone-100 transition hover:-translate-y-0.5 hover:border-emerald-200/50 hover:bg-white/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-200"
                >
                  View backend
                </a>
                <a
                  href={repositoryLinks.apiTests}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-white/15 px-5 py-3 text-sm font-semibold text-stone-100 transition hover:-translate-y-0.5 hover:border-amber-200/50 hover:bg-white/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-200"
                >
                  View API tests
                </a>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-[#0d1b16] p-4 shadow-[0_30px_100px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase text-emerald-200">
                    Dashboard preview
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold text-stone-50">
                    Exchange desk
                  </h2>
                </div>
                <span className="rounded-md border border-amber-200/40 bg-amber-200/10 px-3 py-1 text-sm text-amber-100">
                  Mock
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
              <article
                key={feature.title}
                className="rounded-lg border border-white/10 bg-white/5 p-6 transition duration-200 hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-white/8"
              >
                <div className="mb-5 h-1.5 w-16 rounded-full bg-linear-to-r from-emerald-300 to-amber-200" />
                <h2 className="text-xl font-semibold text-stone-50">
                  {feature.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-stone-400">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#0b1813]">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase text-amber-200">
              Tech stack
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {techStack.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-white/10 bg-[#f6eddc] px-4 py-2 text-sm font-semibold text-[#16221c]"
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
