import { useEffect, useState } from 'react'

import {
  forceReturnBook,
  getAdminBooks,
  type AdminBook,
} from '../api/booksApi'
import { StateMessage } from '../components/StateMessage'

type BooksState = 'loading' | 'success' | 'error'

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback
}

function isBookWithOwner(book: AdminBook) {
  return book.ownerId === book.holderId
}

function getStatusLabel(book: AdminBook) {
  return isBookWithOwner(book) ? 'With owner' : 'Borrowed'
}

function getStatusClassName(book: AdminBook) {
  return isBookWithOwner(book)
    ? 'border-green-200 bg-green-50 text-green-800'
    : 'border-amber-200 bg-amber-50 text-amber-800'
}

export function AdminPanelPage() {
  const [books, setBooks] = useState<AdminBook[]>([])
  const [booksState, setBooksState] = useState<BooksState>('loading')
  const [loadErrorMessage, setLoadErrorMessage] = useState<string | null>(null)
  const [actionErrorMessage, setActionErrorMessage] = useState<string | null>(
    null,
  )
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [returningBookIds, setReturningBookIds] = useState<string[]>([])
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let isActive = true

    async function loadBooks() {
      setBooksState('loading')
      setLoadErrorMessage(null)

      try {
        const adminBooks = await getAdminBooks()

        if (!isActive) {
          return
        }

        setBooks(adminBooks)
        setBooksState('success')
      } catch (error) {
        if (!isActive) {
          return
        }

        setBooks([])
        setLoadErrorMessage(
          getErrorMessage(
            error,
            'Unable to load admin books. Please try again.',
          ),
        )
        setBooksState('error')
      }
    }

    void loadBooks()

    return () => {
      isActive = false
    }
  }, [reloadKey])

  async function handleForceReturn(book: AdminBook) {
    setReturningBookIds((bookIds) =>
      bookIds.includes(book.id) ? bookIds : [...bookIds, book.id],
    )
    setActionErrorMessage(null)
    setSuccessMessage(null)

    try {
      await forceReturnBook(book.id)
      setSuccessMessage(`${book.title} was returned to its owner.`)
      setReloadKey((key) => key + 1)
    } catch (error) {
      setActionErrorMessage(
        getErrorMessage(
          error,
          'Unable to force return this book. Please try again.',
        ),
      )
    } finally {
      setReturningBookIds((bookIds) =>
        bookIds.filter((bookId) => bookId !== book.id),
      )
    }
  }

  const borrowedBooks = books.filter((book) => !isBookWithOwner(book)).length
  const ownedHeldBooks = books.length - borrowedBooks
  const hasBooks = booksState === 'success' && books.length > 0
  const isEmpty = booksState === 'success' && books.length === 0
  const metrics = [
    { label: 'Total books', value: books.length, status: 'Loaded from backend' },
    { label: 'Borrowed', value: borrowedBooks, status: 'Holder differs' },
    { label: 'With owner', value: ownedHeldBooks, status: 'Holder matches' },
  ]

  return (
    <section className="space-y-5">
      <div className="page-hero motion-line reveal-blur p-5 sm:p-6">
        <div className="relative z-10">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">
            Admin operations
          </p>
          <h1 className="mt-2 font-[var(--font-display)] text-4xl font-semibold leading-tight text-zinc-950 sm:text-5xl">
            Admin panel
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
            Review backend books and force borrowed copies back to their owners
            when an admin action is required.
          </p>
        </div>
      </div>

      {booksState === 'success' && (
        <div className="grid gap-3 md:grid-cols-3">
          {metrics.map((metric) => (
            <article key={metric.label} className="premium-card p-5">
              <div className="relative z-10">
                <p className="text-sm font-semibold text-zinc-600">
                  {metric.label}
                </p>
                <p className="mt-3 font-[var(--font-display)] text-4xl font-semibold text-zinc-950">
                  {metric.value}
                </p>
                <span className="mt-4 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-blue-800">
                  {metric.status}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      {successMessage && (
        <StateMessage tone="success" title="Force return complete">
          {successMessage}
        </StateMessage>
      )}

      {actionErrorMessage && (
        <StateMessage tone="error" title="Could not force return book">
          {actionErrorMessage}
        </StateMessage>
      )}

      {booksState === 'loading' && (
        <div
          className="premium-panel p-6"
          role="status"
          aria-live="polite"
        >
          <span className="sr-only">Loading admin books.</span>
          <div className="h-3 w-40 rounded-full bg-blue-100" />
          <div className="mt-5 grid gap-3" aria-hidden="true">
            <div className="h-4 rounded-full bg-zinc-100" />
            <div className="h-4 w-5/6 rounded-full bg-zinc-100" />
            <div className="h-4 w-2/3 rounded-full bg-zinc-100" />
          </div>
        </div>
      )}

      {booksState === 'error' && (
        <div className="premium-panel border-amber-200 p-6 sm:p-7" role="alert">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">
            Admin books unavailable
          </p>
          <h2 className="mt-3 font-[var(--font-display)] text-3xl font-semibold text-zinc-950">
            Could not load admin books
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
            {loadErrorMessage}
          </p>
          <button
            className="primary-action mt-5"
            type="button"
            onClick={() => {
              setActionErrorMessage(null)
              setSuccessMessage(null)
              setReloadKey((key) => key + 1)
            }}
          >
            Try again
          </button>
        </div>
      )}

      {isEmpty && (
        <div className="empty-state p-6 sm:p-7" role="status" aria-live="polite">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-green-700">
            Empty catalog
          </p>
          <h2 className="mt-3 font-[var(--font-display)] text-3xl font-semibold text-zinc-950">
            No books found
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
            Books returned from the backend admin endpoint will appear here once
            the exchange catalog has items.
          </p>
        </div>
      )}

      {hasBooks && (
        <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-[0_1px_2px_rgba(17,17,17,0.04)]">
          <table className="w-full min-w-[860px] border-collapse text-left text-zinc-700">
            <caption className="sr-only">
              Admin book inventory with owner, holder, status, and force return
              actions.
            </caption>
            <thead className="border-b border-zinc-200 bg-[#F1EEE8] text-zinc-950">
              <tr>
                <th scope="col" className="px-5 py-4 text-sm font-bold">
                  ID
                </th>
                <th scope="col" className="px-5 py-4 text-sm font-bold">
                  Title
                </th>
                <th scope="col" className="px-5 py-4 text-sm font-bold">
                  Author
                </th>
                <th scope="col" className="px-5 py-4 text-sm font-bold">
                  Owner ID
                </th>
                <th scope="col" className="px-5 py-4 text-sm font-bold">
                  Holder ID
                </th>
                <th scope="col" className="px-5 py-4 text-sm font-bold">
                  Status
                </th>
                <th scope="col" className="px-5 py-4 text-sm font-bold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => {
                const isReturning = returningBookIds.includes(book.id)

                return (
                  <tr
                    key={book.id}
                    className="border-t border-zinc-200 transition duration-200 hover:bg-[#fffefa]"
                  >
                    <td className="px-5 py-4 text-sm font-semibold text-zinc-700">
                      {book.id}
                    </td>
                    <td className="px-5 py-4 text-sm font-bold text-zinc-950">
                      {book.title}
                    </td>
                    <td className="px-5 py-4 text-sm text-zinc-700">
                      {book.author}
                    </td>
                    <td className="px-5 py-4 text-sm text-zinc-600">
                      {book.ownerId}
                    </td>
                    <td className="px-5 py-4 text-sm text-zinc-600">
                      {book.holderId}
                    </td>
                    <td className="px-5 py-4 text-sm">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${getStatusClassName(
                          book,
                        )}`}
                      >
                        {getStatusLabel(book)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm">
                      <button
                        className="secondary-action min-h-0 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-60"
                        type="button"
                        disabled={isReturning}
                        onClick={() => void handleForceReturn(book)}
                        aria-label={`Force return ${book.title}`}
                        aria-busy={isReturning}
                      >
                        {isReturning ? 'Returning...' : 'Force return'}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
