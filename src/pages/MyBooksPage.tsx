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
    <section className="space-y-6">
      <div className="premium-panel motion-line reveal-blur rounded-2xl p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200">
          My library
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
          My books
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400">
          Manage the books you own, monitor availability, and prepare exchange
          actions from a cleaner product dashboard.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {dashboardActions.map((action) => (
          <DashboardCard key={action.href} {...action} />
        ))}
      </div>

      {booksState === 'loading' && (
        <div className="grid gap-4 xl:grid-cols-2">
          {loadingCards.map((card) => (
            <div
              key={card}
              className="premium-card min-h-44 rounded-2xl p-5 animate-pulse"
            >
              <div className="flex gap-4">
                <div className="h-32 w-20 rounded-xl bg-white/8" />
                <div className="flex flex-1 flex-col">
                  <div className="h-3 w-24 rounded-full bg-cyan-300/15" />
                  <div className="mt-4 h-6 w-3/4 rounded-full bg-white/12" />
                  <div className="mt-3 h-4 w-40 rounded-full bg-white/8" />
                  <div className="mt-3 h-4 w-32 rounded-full bg-white/8" />
                  <div className="mt-auto h-4 w-52 rounded-full bg-emerald-300/12" />
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
        <div className="grid gap-4 xl:grid-cols-2">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </section>
  )
}