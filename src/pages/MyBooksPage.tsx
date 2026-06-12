import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getOwnedBooks } from '../api/booksApi'
import { dashboardActions } from '../api/mockLibrary'
import { BookCard } from '../components/BookCard'
import { DashboardCard } from '../components/DashboardCard'
import type { Book } from '../types/book'

type BooksState = 'loading' | 'success' | 'error'

const loadingCards = ['owned-books-loading-1', 'owned-books-loading-2']

function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : 'Unable to load your books. Please try again.'
}

export function MyBooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [booksState, setBooksState] = useState<BooksState>('loading')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let isActive = true

    async function loadBooks() {
      setBooksState('loading')
      setErrorMessage(null)

      try {
        const ownedBooks = await getOwnedBooks()

        if (!isActive) {
          return
        }

        setBooks(ownedBooks)
        setBooksState('success')
      } catch (error) {
        if (!isActive) {
          return
        }

        setBooks([])
        setErrorMessage(getErrorMessage(error))
        setBooksState('error')
      }
    }

    void loadBooks()

    return () => {
      isActive = false
    }
  }, [reloadKey])

  const hasBooks = booksState === 'success' && books.length > 0
  const isEmpty = booksState === 'success' && books.length === 0

  return (
    <section className="space-y-5">
      <div className="page-hero motion-line reveal-blur p-5 sm:p-6">
        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200">
              My library
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
              My books
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
              Manage owned books, availability, and exchange actions from a
              cleaner product dashboard.
            </p>
          </div>

          {booksState === 'success' && (
            <div className="rounded-xl border border-white/10 bg-white/[0.035] px-3.5 py-2.5 text-sm text-slate-300">
              <span className="font-semibold text-slate-50">
                {books.length}
              </span>{' '}
              owned books
            </div>
          )}
        </div>
      </div>

      <nav className="grid gap-3 md:grid-cols-3" aria-label="Book actions">
        {dashboardActions.map((action) => (
          <DashboardCard key={action.href} {...action} />
        ))}
      </nav>

      {booksState === 'loading' && (
        <div className="grid gap-3 xl:grid-cols-2">
          {loadingCards.map((card) => (
            <div
              key={card}
              className="animate-pulse rounded-xl border border-white/10 bg-white/[0.035] p-3 sm:p-4"
            >
              <div className="grid grid-cols-[3.75rem_1fr] gap-3 sm:grid-cols-[4.5rem_1fr] sm:gap-4">
                <div className="h-24 w-15 rounded-lg bg-white/8 sm:h-28 sm:w-18" />
                <div className="flex flex-1 flex-col">
                  <div className="h-3 w-24 rounded-full bg-cyan-300/15" />
                  <div className="mt-3 h-5 w-3/4 rounded-full bg-white/12" />
                  <div className="mt-2 h-4 w-40 rounded-full bg-white/8" />
                  <div className="mt-4 h-4 w-32 rounded-full bg-white/8" />
                  <div className="mt-2 h-4 w-52 max-w-full rounded-full bg-emerald-300/12" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {booksState === 'error' && (
        <div className="premium-panel rounded-2xl border border-amber-300/20 p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200">
            Books unavailable
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-50">
            Could not load books
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            {errorMessage}
          </p>
          <button
            className="mt-5 rounded-xl border border-cyan-300/25 bg-cyan-300/10 px-4 py-2.5 text-sm font-semibold text-cyan-50 transition duration-200 hover:bg-cyan-300/16"
            type="button"
            onClick={() => setReloadKey((key) => key + 1)}
          >
            Try again
          </button>
        </div>
      )}

      {isEmpty && (
        <div className="premium-panel rounded-2xl p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">
            Empty shelf
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-50">
            No owned books yet
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            Your owned catalog will appear here once you add your first book to
            the exchange network.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/app/add-book"
              className="rounded-xl border border-cyan-300/25 bg-cyan-300/10 px-4 py-2.5 text-sm font-semibold text-cyan-50 transition duration-200 hover:bg-cyan-300/16"
            >
              Add your first book
            </Link>

            <Link
              to="/app/share-book"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-slate-200 transition duration-200 hover:bg-white/[0.07]"
            >
              Explore exchange flow
            </Link>
          </div>
        </div>
      )}

      {hasBooks && (
        <section className="space-y-3">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
                Owned catalog
              </p>
              <h2 className="mt-1 text-xl font-semibold text-slate-50">
                Current shelf
              </h2>
            </div>
          </div>

          <div className="grid gap-3 xl:grid-cols-2">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      )}
    </section>
  )
}
