import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  forceReturnBook,
  getAdminBooks,
  type AdminBook,
} from '../api/booksApi'
import { PageHeader } from '../components/PageHeader'
import { StateMessage } from '../components/StateMessage'
import { useToast } from '../components/toastContext'

type BooksState = 'loading' | 'success' | 'error'

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback
}

function isBookWithOwner(book: AdminBook) {
  return book.ownerId === book.holderId
}

function getStatusClassName(book: AdminBook) {
  return isBookWithOwner(book)
    ? 'border-[var(--color-status-success-border)] bg-[var(--color-status-success-bg)] text-[var(--color-status-success-text)]'
    : 'border-[var(--color-status-warning-border)] bg-[var(--color-status-warning-bg)] text-[var(--color-status-warning-text)]'
}

export function AdminPanelPage() {
  const { t } = useTranslation()
  const { showToast } = useToast()
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

        const message = getErrorMessage(
          error,
          t('admin.errors.loadFallback'),
        )

        setBooks([])
        setLoadErrorMessage(message)
        setBooksState('error')
        showToast({
          tone: 'error',
          title: t('admin.errors.loadTitle'),
          message,
        })
      }
    }

    void loadBooks()

    return () => {
      isActive = false
    }
  }, [reloadKey, showToast, t])

  async function handleForceReturn(book: AdminBook) {
    if (isBookWithOwner(book)) {
      showToast({
        tone: 'info',
        title: t('admin.toasts.noActionTitle'),
        message: t('admin.messages.alreadyWithOwner', {
          title: book.title,
        }),
      })
      return
    }

    setReturningBookIds((bookIds) =>
      bookIds.includes(book.id) ? bookIds : [...bookIds, book.id],
    )
    setActionErrorMessage(null)
    setSuccessMessage(null)

    try {
      await forceReturnBook(book.id)
      const message = t('admin.messages.returnedToOwner', {
        title: book.title,
      })

      setSuccessMessage(message)
      showToast({
        tone: 'success',
        title: t('admin.toasts.forceCompleteTitle'),
        message,
      })
      setReloadKey((key) => key + 1)
    } catch (error) {
      const message = getErrorMessage(
        error,
        t('admin.errors.forceFallback'),
      )

      setActionErrorMessage(message)
      showToast({
        tone: 'error',
        title: t('admin.errors.actionTitle'),
        message,
      })
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
    {
      id: 'total',
      label: t('admin.metrics.totalBooks'),
      value: books.length,
      status: t('admin.metrics.inventoryReady'),
    },
    {
      id: 'borrowed',
      label: t('admin.metrics.borrowed'),
      value: borrowedBooks,
      status: t('admin.metrics.onLoan'),
    },
    {
      id: 'with-owner',
      label: t('admin.metrics.withOwner'),
      value: ownedHeldBooks,
      status: t('admin.metrics.atHome'),
    },
  ]

  return (
    <section className="space-y-5">
      <PageHeader
        eyebrow={t('admin.header.eyebrow')}
        title={t('admin.header.title')}
        description={t('admin.header.description')}
      />

      {booksState === 'success' && (
        <div className="grid gap-3 md:grid-cols-3">
          {metrics.map((metric) => (
            <article key={metric.id} className="premium-card p-5">
              <div className="relative z-10">
                <p className="text-sm font-bold text-[var(--color-muted)]">
                  {metric.label}
                </p>
                <p className="mt-3 font-[var(--font-display)] text-4xl font-semibold text-[var(--color-ink)]">
                  {metric.value}
                </p>
                <span className="mt-4 inline-flex rounded-full border border-[var(--color-status-info-border)] bg-[var(--color-status-info-bg)] px-3 py-1 text-xs font-bold text-[var(--color-status-info-text)]">
                  {metric.status}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      {successMessage && (
        <StateMessage
          tone="success"
          title={t('admin.toasts.forceCompleteTitle')}
        >
          {successMessage}
        </StateMessage>
      )}

      {actionErrorMessage && (
        <StateMessage tone="error" title={t('admin.errors.actionTitle')}>
          {actionErrorMessage}
        </StateMessage>
      )}

      {booksState === 'loading' && (
        <div className="premium-panel p-6" role="status" aria-live="polite">
          <span className="sr-only">{t('admin.loading')}</span>
          <div className="h-3 w-40 rounded-full bg-[var(--color-skeleton-warm)]" />
          <div className="mt-5 grid gap-3" aria-hidden="true">
            <div className="h-4 rounded-full bg-[var(--color-skeleton)]" />
            <div className="h-4 w-5/6 rounded-full bg-[var(--color-skeleton)]" />
            <div className="h-4 w-2/3 rounded-full bg-[var(--color-skeleton)]" />
          </div>
        </div>
      )}

      {booksState === 'error' && (
        <div className="premium-panel border-[var(--color-status-warning-border)] p-6 sm:p-7" role="alert">
          <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-gold)]">
            {t('admin.unavailable')}
          </p>
          <h2 className="mt-3 font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)]">
            {t('admin.errors.loadTitle')}
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
            {t('common.actions.tryAgain')}
          </button>
        </div>
      )}

      {isEmpty && (
        <div className="empty-state p-6 sm:p-7" role="status" aria-live="polite">
          <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-forest)]">
            {t('admin.empty.eyebrow')}
          </p>
          <h2 className="mt-3 font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)]">
            {t('admin.empty.title')}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
            {t('admin.empty.description')}
          </p>
        </div>
      )}

      {hasBooks && (
        <section className="premium-panel overflow-hidden" aria-labelledby="admin-books-heading">
          <div className="flex flex-col gap-3 border-b border-[var(--color-border)] bg-[var(--color-paper)] px-4 py-4 sm:flex-row sm:items-end sm:justify-between sm:px-5">
            <div>
              <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-accent)]">
                {t('admin.table.eyebrow')}
              </p>
              <h2
                id="admin-books-heading"
                className="mt-1 font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)]"
              >
                {t('admin.table.title')}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-bold">
              <span className="rounded-full border border-[var(--color-status-success-border)] bg-[var(--color-status-success-bg)] px-3 py-1 text-[var(--color-status-success-text)]">
                {t('admin.status.withOwner')}
              </span>
              <span className="rounded-full border border-[var(--color-status-warning-border)] bg-[var(--color-status-warning-bg)] px-3 py-1 text-[var(--color-status-warning-text)]">
                {t('admin.status.borrowed')}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] border-collapse text-left text-[var(--color-muted)]">
              <caption className="sr-only">
                {t('admin.table.caption')}
              </caption>
              <thead className="border-b border-[var(--color-border)] bg-[var(--color-table-head)] text-[var(--color-ink)]">
                <tr>
                  <th scope="col" className="px-5 py-4 text-sm font-bold">
                    {t('common.bookMeta.book')}
                  </th>
                  <th scope="col" className="px-5 py-4 text-sm font-bold">
                    {t('common.bookMeta.id')}
                  </th>
                  <th scope="col" className="px-5 py-4 text-sm font-bold">
                    {t('common.bookMeta.ownerId')}
                  </th>
                  <th scope="col" className="px-5 py-4 text-sm font-bold">
                    {t('common.bookMeta.holderId')}
                  </th>
                  <th scope="col" className="px-5 py-4 text-sm font-bold">
                    {t('common.bookMeta.status')}
                  </th>
                  <th scope="col" className="px-5 py-4 text-sm font-bold">
                    {t('common.bookMeta.action')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => {
                  const isReturning = returningBookIds.includes(book.id)

                  return (
                    <tr
                      key={book.id}
                      className="border-t border-[var(--color-border)] bg-[var(--color-table-row)] transition duration-200 hover:bg-[var(--color-table-row-hover)]"
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
                          {isBookWithOwner(book)
                            ? t('admin.status.withOwner')
                            : t('admin.status.borrowed')}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm">
                        {isBookWithOwner(book) ? (
                          <span className="inline-flex rounded-full border border-[var(--color-status-success-border)] bg-[var(--color-status-success-bg)] px-3 py-1 text-xs font-bold text-[var(--color-status-success-text)]">
                            {t('admin.table.noAction')}
                          </span>
                        ) : (
                          <button
                            className="secondary-action min-h-0 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-60"
                            type="button"
                            disabled={isReturning}
                            onClick={() => void handleForceReturn(book)}
                            aria-label={t('admin.messages.forceReturnLabel', {
                              title: book.title,
                            })}
                            aria-busy={isReturning}
                          >
                            {isReturning
                              ? t('admin.table.returning')
                              : t('admin.table.forceReturn')}
                          </button>
                        )}
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
