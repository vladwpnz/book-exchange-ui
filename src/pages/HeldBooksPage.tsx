import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getHeldBooks } from '../api/booksApi'
import { BookCard } from '../components/BookCard'
import { BookListSkeleton } from '../components/BookListSkeleton'
import { StateMessage } from '../components/StateMessage'
import type { Book } from '../types/book'

type BooksState = 'loading' | 'success' | 'error'

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
    <section className="space-y-5">
      <div className="page-hero motion-line reveal-blur p-5 sm:p-6">
        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">
              Borrowed shelf
            </p>
            <h1 className="mt-2 font-[var(--font-display)] text-4xl font-semibold leading-tight text-zinc-950 sm:text-5xl">
              Held books
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
              Track books currently borrowed by the signed-in reader and keep
              the return flow visible from one place.
            </p>
          </div>

          {booksState === 'success' && (
            <div className="rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-600 shadow-[0_1px_2px_rgba(17,17,17,0.04)]">
              <span className="font-bold text-zinc-950">
                {books.length}
              </span>{' '}
              held books
            </div>
          )}
        </div>
      </div>

      {booksState === 'loading' && (
        <BookListSkeleton label="Loading held books" />
      )}

      {booksState === 'error' && (
        <div className="premium-panel border-amber-200 p-6 sm:p-7" role="alert">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">
            Held books unavailable
          </p>
          <h2 className="mt-3 font-[var(--font-display)] text-3xl font-semibold text-zinc-950">
            Could not load held books
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
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
        <div className="empty-state p-6 sm:p-7" role="status" aria-live="polite">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-green-700">
            Empty shelf
          </p>
          <h2 className="mt-3 font-[var(--font-display)] text-3xl font-semibold text-zinc-950">
            No held books yet
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
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
        <section className="space-y-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">
              Borrowed catalog
            </p>
            <h2 className="mt-1 font-[var(--font-display)] text-3xl font-semibold text-zinc-950">
              Active holds
            </h2>
          </div>

          <div className="grid gap-3 xl:grid-cols-2">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      )}

      {booksState === 'success' && hasBooks ? (
        <StateMessage tone="success" className="sr-only">
          Held books loaded.
        </StateMessage>
      ) : null}
    </section>
  )
}
