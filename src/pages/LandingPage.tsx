import { Link } from 'react-router-dom'

import { repositoryLinks } from '../api/links'
import { featuredBooks } from '../api/mockLibrary'
import { useAuth } from '../auth/useAuth'
import { BookCard } from '../components/BookCard'
import { BookCover } from '../components/BookCover'
import { Navbar } from '../components/Navbar'

const workflow = [
  {
    title: 'Find or add a title',
    description:
      'Start with the catalog search, then add a missing book manually only when needed.',
    href: '/app/add-book',
  },
  {
    title: 'Share with a reader',
    description:
      'Send a book to another account while keeping the hold visible in the exchange.',
    href: '/app/share-book',
  },
  {
    title: 'Transfer ownership',
    description:
      'Give a book when the copy should permanently move to another reader.',
    href: '/app/give-book',
  },
  {
    title: 'Close the hold',
    description:
      'Return borrowed books and keep the owned and held shelves clean.',
    href: '/app/return-book',
  },
]

const benefits = [
  'Book-first catalog cards with title, author, owner, status, and notes.',
  'Separate flows for sharing, giving, returning, and admin recovery.',
  'A compact app shell that works across phone, tablet, and desktop layouts.',
]

export function LandingPage() {
  const { isAuthenticated } = useAuth()
  const primaryHref = isAuthenticated ? '/app/my-books' : '/register'
  const primaryLabel = isAuthenticated ? 'Open my shelf' : 'Create account'

  return (
    <div className="min-h-screen text-[var(--color-ink)]">
      <Navbar />

      <main>
        <section className="relative overflow-hidden border-b border-[var(--color-border)]">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 md:py-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(22rem,0.75fr)] lg:items-center lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-accent)]">
                A reader-to-reader exchange service
              </p>

              <h1 className="mt-4 max-w-4xl font-[var(--font-display)] text-5xl font-semibold leading-[0.98] text-[var(--color-ink)] sm:text-6xl lg:text-7xl">
                Book Exchange
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
                Keep your owned shelf, borrowed books, collaborative shares,
                transfers, returns, and admin recovery in one calm publishing
                workspace.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link to={primaryHref} className="primary-action">
                  {primaryLabel}
                </Link>

                {!isAuthenticated ? (
                  <Link to="/login" className="secondary-action">
                    Login
                  </Link>
                ) : (
                  <Link to="/app/add-book" className="secondary-action">
                    Add a book
                  </Link>
                )}
              </div>

              <dl className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
                {[
                  ['Catalog first', 'Search before manual entry'],
                  ['Clear flows', 'Share, give, return'],
                  ['Admin ready', 'Force-return visibility'],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="border-l border-[var(--color-border-strong)] pl-4"
                  >
                    <dt className="text-sm font-bold text-[var(--color-ink)]">
                      {label}
                    </dt>
                    <dd className="mt-1 text-sm leading-5 text-[var(--color-muted)]">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <aside
              className="relative min-h-[25rem] overflow-hidden rounded-[0.75rem] border border-[var(--color-border)] bg-[#fffaf2] p-4 shadow-[var(--shadow-restraint)] sm:p-5"
              aria-label="Book Exchange catalog preview"
            >
              <div className="brand-ribbon absolute inset-x-0 top-0 h-1" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold tracking-[0.16em] text-[var(--color-accent)]">
                    Live shelf shape
                  </p>
                  <h2 className="mt-2 font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)]">
                    Books stay central
                  </h2>
                </div>
                <span className="rounded-full border border-[#bfd8c7] bg-[#eef7ed] px-3 py-1 text-xs font-bold text-[#194934]">
                  Product preview
                </span>
              </div>

              <div className="mt-8 flex items-end justify-center gap-3 sm:gap-4">
                {featuredBooks.map((book, index) => (
                  <BookCover
                    key={book.id}
                    title={book.title}
                    author={book.author}
                    genre={book.genre}
                    tone={book.tone}
                    size={index === 1 ? 'hero' : 'lg'}
                    className={index === 0 ? 'rotate-[-5deg]' : index === 2 ? 'rotate-[5deg]' : ''}
                  />
                ))}
              </div>

              <div className="mt-8 rounded-[0.7rem] border border-[var(--color-border)] bg-white p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-[var(--color-ink)]">
                      Share request
                    </p>
                    <p className="mt-1 text-sm text-[var(--color-muted)]">
                      Maps of Quiet Cities is held until Sunday.
                    </p>
                  </div>
                  <Link to="/app/share-book" className="secondary-action min-h-0 px-3 py-2 text-sm">
                    Open share
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-accent)]">
                Product workflow
              </p>
              <h2 className="mt-3 font-[var(--font-display)] text-4xl font-semibold leading-tight text-[var(--color-ink)]">
                A simple circulation desk for everyday exchanges.
              </h2>
              <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
                Each area focuses on one familiar exchange task. The interface
                separates collaboration from final transfer so readers understand
                what will happen before they submit.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {workflow.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="group rounded-[0.7rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-restraint)] transition duration-200 hover:-translate-y-0.5 hover:border-[var(--color-border-strong)] hover:bg-white hover:shadow-[var(--shadow-lift)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
                >
                  <span
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#b9d7c5] bg-[#eef7ed] text-[#194934]"
                    aria-hidden="true"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-current" />
                  </span>
                  <h3 className="mt-3 font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                    {item.description}
                  </p>
                  <span className="mt-4 inline-flex text-sm font-bold text-[var(--color-accent)] transition duration-200 group-hover:translate-x-1">
                    Open workflow -&gt;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[var(--color-border)] bg-[#fffaf2]/72">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div>
              <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-accent)]">
                Catalog presentation
              </p>
              <h2 className="mt-3 font-[var(--font-display)] text-4xl font-semibold text-[var(--color-ink)]">
                Every book gets a real hierarchy.
              </h2>
              <ul className="mt-5 grid gap-3">
                {benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex gap-3 text-sm leading-6 text-[var(--color-muted)]"
                  >
                    <span
                      className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-forest)]"
                      aria-hidden="true"
                    />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-3">
              {featuredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  contextLabel="Featured catalog"
                  actions={
                    <Link
                      to="/app/my-books"
                      className="secondary-action min-h-0 px-3 py-2 text-sm"
                    >
                      View in app
                    </Link>
                  }
                />
              ))}
            </div>
          </div>
        </section>

        <footer className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 border-t border-[var(--color-border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
                Book Exchange
              </p>
              <p className="mt-1 text-sm text-[var(--color-muted)]">
                A premium, editorial workspace for reader-to-reader exchanges.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm font-bold text-[var(--color-muted)]">
              <a
                href={repositoryLinks.backend}
                target="_blank"
                rel="noreferrer"
                className="transition duration-200 hover:text-[var(--color-accent)]"
              >
                Service repo
              </a>
              <a
                href={repositoryLinks.apiTests}
                target="_blank"
                rel="noreferrer"
                className="transition duration-200 hover:text-[var(--color-accent)]"
              >
                Quality checks
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
