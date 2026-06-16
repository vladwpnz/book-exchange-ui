import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { getOwnedBooks } from '../api/booksApi'
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
    : ''
}

export function MyBooksPage() {
  const { t } = useTranslation()
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

        const message = getErrorMessage(error) || t('myBooks.error.fallback')

        setBooks([])
        setErrorMessage(message)
        setBooksState('error')
        showToast({
          tone: 'error',
          title: t('myBooks.error.toastTitle'),
          message,
        })
      }
    }

    void loadBooks()

    return () => {
      isActive = false
    }
  }, [reloadKey, showToast, t])

  const hasBooks = booksState === 'success' && books.length > 0
  const isEmpty = booksState === 'success' && books.length === 0
  const availableCount = books.filter((book) => book.status === 'available').length
  const activeCount = books.filter((book) => book.status !== 'available').length
  const dashboardActions = [
    {
      title: t('dashboard.cards.add.title'),
      description: t('dashboard.cards.add.description'),
      href: '/app/add-book',
      accent: 'emerald' as const,
    },
    {
      title: t('dashboard.cards.share.title'),
      description: t('dashboard.cards.share.description'),
      href: '/app/share-book',
      accent: 'amber' as const,
    },
    {
      title: t('dashboard.cards.give.title'),
      description: t('dashboard.cards.give.description'),
      href: '/app/give-book',
      accent: 'paper' as const,
    },
    {
      title: t('dashboard.cards.return.title'),
      description: t('dashboard.cards.return.description'),
      href: '/app/return-book',
      accent: 'emerald' as const,
    },
  ]

  return (
    <section className="space-y-5">
      <PageHeader
        eyebrow={t('myBooks.header.eyebrow')}
        title={t('myBooks.header.title')}
        description={t('myBooks.header.description')}
        action={
          <Link className="primary-action" to="/app/add-book">
            {t('common.actions.addBook')}
          </Link>
        }
        meta={
          booksState === 'success' ? (
            <div className="rounded-[0.7rem] border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-4 py-3 text-sm text-[var(--color-muted)] shadow-[var(--shadow-restraint)]">
              <span className="font-bold text-[var(--color-ink)]">
                {books.length}
              </span>{' '}
              {t('myBooks.header.ownedBooksLabel')}
            </div>
          ) : null
        }
      />

      {booksState === 'success' ? (
        <dl className="grid gap-3 sm:grid-cols-3">
          {[
            [t('myBooks.metrics.total'), books.length],
            [t('myBooks.metrics.available'), availableCount],
            [t('myBooks.metrics.inMotion'), activeCount],
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

      <nav className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label={t('dashboard.actionsLabel')}>
        {dashboardActions.map((action) => (
          <DashboardCard key={action.href} {...action} />
        ))}
      </nav>

      {booksState === 'loading' && (
        <BookListSkeleton label={t('myBooks.loading')} />
      )}

      {booksState === 'error' && (
        <div className="premium-panel border-[var(--color-status-warning-border)] p-6 sm:p-7" role="alert">
          <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-gold)]">
            {t('myBooks.error.eyebrow')}
          </p>
          <h2 className="mt-3 font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)]">
            {t('myBooks.error.title')}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
            {errorMessage}
          </p>
          <button
            className="primary-action mt-5"
            type="button"
            onClick={() => setReloadKey((key) => key + 1)}
          >
            {t('common.actions.tryAgain')}
          </button>
        </div>
      )}

      {isEmpty && (
        <div className="empty-state p-6 sm:p-7" role="status" aria-live="polite">
          <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-forest)]">
            {t('myBooks.empty.eyebrow')}
          </p>
          <h2 className="mt-3 font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)]">
            {t('myBooks.empty.title')}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
            {t('myBooks.empty.description')}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/app/add-book" className="primary-action">
              {t('common.actions.searchCatalog')}
            </Link>

            <Link to="/app/share-book" className="secondary-action">
              {t('common.actions.previewShareFlow')}
            </Link>
          </div>
        </div>
      )}

      {hasBooks && (
        <section className="space-y-3">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-accent)]">
                {t('myBooks.catalog.eyebrow')}
              </p>
              <h2 className="mt-1 font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)]">
                {t('myBooks.catalog.title')}
              </h2>
            </div>
          </div>

          <div className="grid gap-3 xl:grid-cols-2">
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                contextLabel={t('myBooks.catalog.contextLabel')}
                actions={
                  <>
                    <Link
                      to="/app/share-book"
                      className="secondary-action min-h-0 px-3 py-2 text-sm"
                    >
                      {t('common.actions.share')}
                    </Link>
                    <Link
                      to="/app/give-book"
                      className="danger-action min-h-0 px-3 py-2 text-sm"
                    >
                      {t('common.actions.give')}
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
          {t('myBooks.catalog.loaded')}
        </StateMessage>
      ) : null}
    </section>
  )
}
