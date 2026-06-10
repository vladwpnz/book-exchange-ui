import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getHeldBooks } from '../api/booksApi'
import { BookCard } from '../components/BookCard'
import type { Book } from '../types/book'

type BooksState = 'loading' | 'success' | 'error'

const loadingCards = ['held-books-loading-1', 'held-books-loading-2']

function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : 'Unable to load held books. Please try again.'
}

export function HeldBooksPage() {
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
        const heldBooks = await getHeldBooks()

        if (!isActive) {
          return
        }

        setBooks(heldBooks)
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
      <div className="page-hero motion-line reveal-blur p-6 sm:p-8">
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
            Borrowed shelf
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
            Held books
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400">
            Track books currently borrowed by the signed-in reader and keep the
            return flow visible from one place.
          </p>
        </div>
      </div>

      {booksState === 'loading' && (
        <div className="grid gap-4 xl:grid-cols-2">
          {loadingCards.map((card) => (
            <div
              key={card}
              className="premium-card min-h-44 animate-pulse rounded-2xl p-5"
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
            Held books unavailable
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-50">
            Could not load held books
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            {errorMessage}
          </p>
          <button
            className="primary-action mt-5"
            type="button"
            onClick={() => setReloadKey((key) => key + 1)}
          >
            Try again
          </button>
        </div>
      )}

      {isEmpty && (
        <div className="empty-state p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">
            Empty shelf
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-50">
            No held books yet
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            Borrowed books will appear here after another reader shares or gives
            a book to your account.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/app/my-books" className="primary-action">
              Open my books
            </Link>

            <Link to="/app/return-book" className="secondary-action">
              View return flow
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