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
    ? 'border-emerald-700/20 bg-emerald-50 text-emerald-900'
    : 'border-amber-700/20 bg-amber-50 text-amber-950'
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
    <section>
      <div className="rounded-lg border border-white/10 bg-[#0d1b16] p-6">
        <p className="text-sm font-semibold uppercase text-amber-200">
          Admin operations
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-stone-50">
          Admin panel
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-stone-400">
          Review all backend books and force borrowed copies back to their
          owners when an admin action is required.
        </p>
      </div>

      {booksState === 'success' && (
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {metrics.map((metric) => (
            <article
              key={metric.label}
              className="rounded-lg border border-white/10 bg-white/5 p-5"
            >
              <p className="text-sm text-stone-400">{metric.label}</p>
              <p className="mt-3 text-4xl font-semibold text-stone-50">
                {metric.value}
              </p>
              <span className="mt-4 inline-flex rounded-md border border-emerald-300/40 bg-emerald-300/10 px-3 py-1 text-sm text-emerald-100">
                {metric.status}
              </span>
            </article>
          ))}
        </div>
      )}

      {successMessage && (
        <div className="mt-6 rounded-lg border border-emerald-300/30 bg-emerald-300/10 px-5 py-4 text-sm font-semibold text-emerald-50">
          {successMessage}
        </div>
      )}

      {actionErrorMessage && (
        <div className="mt-6 rounded-lg border border-amber-300/40 bg-amber-200/10 px-5 py-4 text-sm leading-6 text-amber-50">
          <p className="font-semibold">Could not force return book</p>
          <p>{actionErrorMessage}</p>
        </div>
      )}

      {booksState === 'loading' && (
        <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-6">
          <div className="h-3 w-40 animate-pulse rounded-full bg-amber-200/30" />
          <div className="mt-5 grid gap-3">
            <div className="h-4 animate-pulse rounded-full bg-stone-300/20" />
            <div className="h-4 w-5/6 animate-pulse rounded-full bg-stone-300/20" />
            <div className="h-4 w-2/3 animate-pulse rounded-full bg-stone-300/20" />
          </div>
        </div>
      )}

      {booksState === 'error' && (
        <div className="mt-6 rounded-lg border border-amber-300/40 bg-[#f7efdf] p-6 text-[#15211b] shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
          <p className="text-sm font-semibold uppercase text-amber-800">
            Admin books unavailable
          </p>
          <h2 className="mt-2 text-2xl font-semibold">
            Could not load admin books
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#586357]">
            {loadErrorMessage}
          </p>
          <button
            className="mt-5 rounded-md border border-emerald-700/30 bg-emerald-700 px-4 py-2 text-sm font-semibold text-stone-50 transition hover:bg-emerald-800"
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
        <div className="mt-6 rounded-lg border border-dashed border-amber-300/50 bg-[#f7efdf] p-6 text-[#15211b] shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
          <p className="text-sm font-semibold uppercase text-emerald-700">
            Empty catalog
          </p>
          <h2 className="mt-2 text-2xl font-semibold">No books found</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#586357]">
            Books returned from the backend admin endpoint will appear here once
            the exchange catalog has items.
          </p>
        </div>
      )}

      {hasBooks && (
        <div className="mt-6 overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full min-w-[860px] border-collapse bg-[#f6eddc] text-left text-[#17221d]">
            <thead className="bg-emerald-950 text-stone-100">
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
                  <tr key={book.id} className="border-t border-stone-300">
                    <td className="px-5 py-4 text-sm font-semibold">
                      {book.id}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold">
                      {book.title}
                    </td>
                    <td className="px-5 py-4 text-sm">{book.author}</td>
                    <td className="px-5 py-4 text-sm">{book.ownerId}</td>
                    <td className="px-5 py-4 text-sm">{book.holderId}</td>
                    <td className="px-5 py-4 text-sm">
                      <span
                        className={`inline-flex rounded-md border px-3 py-1 text-sm font-semibold ${getStatusClassName(
                          book,
                        )}`}
                      >
                        {getStatusLabel(book)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm">
                      <button
                        className="rounded-md border border-emerald-700/30 bg-emerald-700 px-4 py-2 text-sm font-semibold text-stone-50 transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:border-stone-400/30 disabled:bg-stone-500/70"
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
