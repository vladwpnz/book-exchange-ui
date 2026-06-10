import { useEffect, useState } from 'react'

import {
  forceReturnBook,
  getAdminBooks,
  type AdminBook,
} from '../api/booksApi'

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
    ? 'border-emerald-300/20 bg-emerald-300/[0.08] text-emerald-100'
    : 'border-amber-300/20 bg-amber-300/[0.08] text-amber-100'
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
    <section className="space-y-6">
      <div className="page-hero motion-line reveal-blur p-6 sm:p-8">
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
            Admin operations
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
            Admin panel
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400">
            Review all backend books and force borrowed copies back to their
            owners when an admin action is required.
          </p>
        </div>
      </div>

      {booksState === 'success' && (
        <div className="grid gap-4 md:grid-cols-3">
          {metrics.map((metric) => (
            <article key={metric.label} className="premium-card rounded-2xl p-5">
              <div className="relative z-10">
                <p className="text-sm text-slate-400">{metric.label}</p>
                <p className="mt-3 text-4xl font-semibold text-slate-50">
                  {metric.value}
                </p>
                <span className="mt-4 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">
                  {metric.status}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      {successMessage && (
        <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.08] px-5 py-4 text-sm font-semibold text-emerald-50">
          {successMessage}
        </div>
      )}

      {actionErrorMessage && (
        <div className="rounded-2xl border border-amber-300/20 bg-amber-300/[0.08] px-5 py-4 text-sm leading-6 text-amber-50">
          <p className="font-semibold">Could not force return book</p>
          <p className="mt-1 text-amber-100/80">{actionErrorMessage}</p>
        </div>
      )}

      {booksState === 'loading' && (
        <div className="premium-panel rounded-2xl p-6">
          <div className="h-3 w-40 animate-pulse rounded-full bg-cyan-300/20" />
          <div className="mt-5 grid gap-3">
            <div className="h-4 animate-pulse rounded-full bg-white/10" />
            <div className="h-4 w-5/6 animate-pulse rounded-full bg-white/10" />
            <div className="h-4 w-2/3 animate-pulse rounded-full bg-white/10" />
          </div>
        </div>
      )}

      {booksState === 'error' && (
        <div className="premium-panel rounded-2xl border border-amber-300/20 p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200">
            Admin books unavailable
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-50">
            Could not load admin books
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
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
        <div className="empty-state p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">
            Empty catalog
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-50">
            No books found
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            Books returned from the backend admin endpoint will appear here once
            the exchange catalog has items.
          </p>
        </div>
      )}

      {hasBooks && (
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/50 shadow-[0_24px_90px_rgba(0,0,0,0.32)]">
          <table className="w-full min-w-[860px] border-collapse text-left text-slate-200">
            <thead className="border-b border-white/10 bg-white/[0.035] text-slate-100">
              <tr>
                <th className="px-5 py-4 text-sm font-semibold">ID</th>
                <th className="px-5 py-4 text-sm font-semibold">Title</th>
                <th className="px-5 py-4 text-sm font-semibold">Author</th>
                <th className="px-5 py-4 text-sm font-semibold">Owner ID</th>
                <th className="px-5 py-4 text-sm font-semibold">Holder ID</th>
                <th className="px-5 py-4 text-sm font-semibold">Status</th>
                <th className="px-5 py-4 text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => {
                const isReturning = returningBookIds.includes(book.id)

                return (
                  <tr
                    key={book.id}
                    className="border-t border-white/8 transition duration-200 hover:bg-white/[0.035]"
                  >
                    <td className="px-5 py-4 text-sm font-semibold text-slate-300">
                      {book.id}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-slate-50">
                      {book.title}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-300">
                      {book.author}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-400">
                      {book.ownerId}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-400">
                      {book.holderId}
                    </td>
                    <td className="px-5 py-4 text-sm">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${getStatusClassName(
                          book,
                        )}`}
                      >
                        {getStatusLabel(book)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm">
                      <button
                        className="rounded-xl border border-cyan-300/25 bg-cyan-300/[0.08] px-4 py-2 text-sm font-semibold text-cyan-50 transition duration-200 hover:bg-cyan-300/[0.14] disabled:cursor-not-allowed disabled:border-slate-500/20 disabled:bg-slate-500/10 disabled:text-slate-500"
                        type="button"
                        disabled={isReturning}
                        onClick={() => void handleForceReturn(book)}
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