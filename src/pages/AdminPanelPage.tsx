import { useEffect, useState } from 'react'

import {
  forceReturnBook,
  getAdminBooks,
  type AdminBook,
} from '../api/booksApi'
import { PageHeader } from '../components/PageHeader'
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
    ? 'border-[#bfd8c7] bg-[#eef7ed] text-[#194934]'
    : 'border-[#e5c47f] bg-[#fff3cf] text-[#704712]'
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
    { label: 'Total books', value: books.length, status: 'Loaded inventory' },
    { label: 'Borrowed', value: borrowedBooks, status: 'Holder differs' },
    { label: 'With owner', value: ownedHeldBooks, status: 'Holder matches' },
  ]

  return (
    <section className="space-y-5">
      <PageHeader
        eyebrow="Admin operations"
        title="Admin panel"
        description="Monitor backend inventory and force borrowed copies back to their owners when an operational recovery is needed."
      />

      {booksState === 'success' && (
        <div className="grid gap-3 md:grid-cols-3">
          {metrics.map((metric) => (
            <article key={metric.label} className="premium-card p-5">
              <div className="relative z-10">
                <p className="text-sm font-bold text-[var(--color-muted)]">
                  {metric.label}
                </p>
                <p className="mt-3 font-[var(--font-display)] text-4xl font-semibold text-[var(--color-ink)]">
                  {metric.value}
                </p>
                <span className="mt-4 inline-flex rounded-full border border-[#bfd1dc] bg-[#edf5f8] px-3 py-1 text-xs font-bold text-[#21455f]">
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
        <div className="premium-panel p-6" role="status" aria-live="polite">
          <span className="sr-only">Loading admin books.</span>
          <div className="h-3 w-40 rounded-full bg-[#e8cfc4]" />
          <div className="mt-5 grid gap-3" aria-hidden="true">
            <div className="h-4 rounded-full bg-[#eadfce]" />
            <div className="h-4 w-5/6 rounded-full bg-[#eadfce]" />
            <div className="h-4 w-2/3 rounded-full bg-[#eadfce]" />
          </div>
        </div>
      )}

      {booksState === 'error' && (
        <div className="premium-panel border-[#e5c47f] p-6 sm:p-7" role="alert">
          <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-gold)]">
            Admin books unavailable
          </p>
          <h2 className="mt-3 font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)]">
            Could not load admin books
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
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
          <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-forest)]">
            Empty catalog
          </p>
          <h2 className="mt-3 font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)]">
            No books found
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
            Books returned from the backend admin endpoint will appear here once
            the exchange catalog has items.
          </p>
        </div>
      )}

      {hasBooks && (
        <section className="premium-panel overflow-hidden" aria-labelledby="admin-books-heading">
          <div className="flex flex-col gap-3 border-b border-[var(--color-border)] bg-[#fffaf2] px-4 py-4 sm:flex-row sm:items-end sm:justify-between sm:px-5">
            <div>
              <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-accent)]">
                Inventory
              </p>
              <h2
                id="admin-books-heading"
                className="mt-1 font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)]"
              >
                Book operations table
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-bold">
              <span className="rounded-full border border-[#bfd8c7] bg-[#eef7ed] px-3 py-1 text-[#194934]">
                With owner
              </span>
              <span className="rounded-full border border-[#e5c47f] bg-[#fff3cf] px-3 py-1 text-[#704712]">
                Borrowed
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] border-collapse text-left text-[var(--color-muted)]">
              <caption className="sr-only">
                Admin book inventory with owner, holder, status, and force
                return actions.
              </caption>
              <thead className="border-b border-[var(--color-border)] bg-[#f4eadc] text-[var(--color-ink)]">
                <tr>
                  <th scope="col" className="px-5 py-4 text-sm font-bold">
                    Book
                  </th>
                  <th scope="col" className="px-5 py-4 text-sm font-bold">
                    ID
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
                      className="border-t border-[var(--color-border)] bg-white transition duration-200 hover:bg-[#fffaf2]"
                    >
                      <th scope="row" className="px-5 py-4 text-left">
                        <span className="block font-[var(--font-display)] text-xl font-semibold leading-6 text-[var(--color-ink)]">
                          {book.title}
                        </span>
                        <span className="mt-1 block text-sm font-semibold text-[var(--color-blue)]">
                          {book.author}
                        </span>
                      </th>
                      <td className="px-5 py-4 text-sm font-semibold text-[var(--color-muted)]">
                        {book.id}
                      </td>
                      <td className="px-5 py-4 text-sm text-[var(--color-muted)]">
                        {book.ownerId}
                      </td>
                      <td className="px-5 py-4 text-sm text-[var(--color-muted)]">
                        {book.holderId}
                      </td>
                      <td className="px-5 py-4 text-sm">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${getStatusClassName(
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
        </section>
      )}
    </section>
  )
}
