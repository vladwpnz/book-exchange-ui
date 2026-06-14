import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getOwnedBooks } from '../api/booksApi'
import { dashboardActions } from '../api/mockLibrary'
import { BookCard } from '../components/BookCard'
import { BookListSkeleton } from '../components/BookListSkeleton'
import { DashboardCard } from '../components/DashboardCard'
import { PageHeader } from '../components/PageHeader'
import { StateMessage } from '../components/StateMessage'
import { useToast } from '../components/toastContext'
import type { Book } from '../types/book'

type BooksState = 'loading' | 'success' | 'error'

function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : 'Unable to load your books. Please try again.'
}

export function MyBooksPage() {
  const { showToast } = useToast()
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

        const message = getErrorMessage(error)

        setBooks([])
        setErrorMessage(message)
        setBooksState('error')
        showToast({
          tone: 'error',
          title: 'Could not load your books',
          message,
        })
      }
    }

    void loadBooks()

    return () => {
      isActive = false
    }
  }, [reloadKey, showToast])

  const hasBooks = booksState === 'success' && books.length > 0
  const isEmpty = booksState === 'success' && books.length === 0
  const availableCount = books.filter((book) => book.status === 'available').length
  const activeCount = books.filter((book) => book.status !== 'available').length

  return (
    <section className="space-y-5">
      <PageHeader
        eyebrow="My library desk"
        title="My books"
        description="Your owned shelf is the working center for sharing, giving, and catalog upkeep."
        action={
          <Link className="primary-action" to="/app/add-book">
            Add book
          </Link>
        }
        meta={
          booksState === 'success' ? (
            <div className="rounded-[0.7rem] border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-muted)] shadow-[var(--shadow-restraint)]">
              <span className="font-bold text-[var(--color-ink)]">
                {books.length}
              </span>{' '}
              owned books
            </div>
          ) : null
        }
      />

      {booksState === 'success' ? (
        <dl className="grid gap-3 sm:grid-cols-3">
          {[
            ['Total shelf', books.length],
            ['Available', availableCount],
            ['In motion', activeCount],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-[0.7rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-restraint)]"
            >
              <dt className="text-sm font-bold text-[var(--color-muted)]">
                {label}
              </dt>
              <dd className="mt-2 font-[var(--font-display)] text-4xl font-semibold text-[var(--color-ink)]">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      <nav className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Book workflows">
        {dashboardActions.map((action) => (
          <DashboardCard key={action.href} {...action} />
        ))}
      </nav>

      {booksState === 'loading' && (
        <BookListSkeleton label="Loading owned books" />
      )}

      {booksState === 'error' && (
        <div className="premium-panel border-[#e5c47f] p-6 sm:p-7" role="alert">
          <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-gold)]">
            Books unavailable
          </p>
          <h2 className="mt-3 font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)]">
            Could not load books
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
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
          <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-forest)]">
            Empty shelf
          </p>
          <h2 className="mt-3 font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)]">
            Add your first exchange copy
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
            Start with catalog search so your book enters the exchange with the
            richest available details.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/app/add-book" className="primary-action">
              Search catalog
            </Link>

            <Link to="/app/share-book" className="secondary-action">
              Preview share flow
            </Link>
          </div>
        </div>
      )}

      {hasBooks && (
        <section className="space-y-3">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-accent)]">
                Owned catalog
              </p>
              <h2 className="mt-1 font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)]">
                Current shelf
              </h2>
            </div>
          </div>

          <div className="grid gap-3 xl:grid-cols-2">
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                contextLabel="Owned copy"
                actions={
                  <>
                    <Link
                      to="/app/share-book"
                      className="secondary-action min-h-0 px-3 py-2 text-sm"
                    >
                      Share
                    </Link>
                    <Link
                      to="/app/give-book"
                      className="danger-action min-h-0 px-3 py-2 text-sm"
                    >
                      Give
                    </Link>
                  </>
                }
              />
            ))}
          </div>
        </section>
      )}

      {booksState === 'success' && hasBooks ? (
        <StateMessage tone="success" className="sr-only">
          Owned books loaded.
        </StateMessage>
      ) : null}
    </section>
  )
}
