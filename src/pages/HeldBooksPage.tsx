import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { getHeldBooks } from '../api/booksApi'
import { BookCard } from '../components/BookCard'
import { BookListSkeleton } from '../components/BookListSkeleton'
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

export function HeldBooksPage() {
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

        const message = getErrorMessage(error) || t('heldBooks.error.fallback')

        setBooks([])
        setErrorMessage(message)
        setBooksState('error')
        showToast({
          tone: 'error',
          title: t('heldBooks.error.toastTitle'),
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

  return (
    <section className="space-y-5">
      <PageHeader
        eyebrow={t('heldBooks.header.eyebrow')}
        title={t('heldBooks.header.title')}
        description={t('heldBooks.header.description')}
        action={
          <Link className="primary-action" to="/app/return-book">
            {t('common.actions.returnBook')}
          </Link>
        }
        meta={
          booksState === 'success' ? (
            <div className="rounded-[0.7rem] border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-4 py-3 text-sm text-[var(--color-muted)] shadow-[var(--shadow-restraint)]">
              <span className="font-bold text-[var(--color-ink)]">
                {books.length}
              </span>{' '}
              {t('heldBooks.header.heldBooksLabel')}
            </div>
          ) : null
        }
      />

      {booksState === 'loading' && (
        <BookListSkeleton label={t('heldBooks.loading')} />
      )}

      {booksState === 'error' && (
        <div className="premium-panel border-[var(--color-status-warning-border)] p-6 sm:p-7" role="alert">
          <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-gold)]">
            {t('heldBooks.error.eyebrow')}
          </p>
          <h2 className="mt-3 font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)]">
            {t('heldBooks.error.title')}
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
            {t('heldBooks.empty.eyebrow')}
          </p>
          <h2 className="mt-3 font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)]">
            {t('heldBooks.empty.title')}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
            {t('heldBooks.empty.description')}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/app/my-books" className="primary-action">
              {t('common.actions.openMyBooks')}
            </Link>

            <Link to="/app/return-book" className="secondary-action">
              {t('common.actions.openReturnFlow')}
            </Link>
          </div>
        </div>
      )}

      {hasBooks && (
        <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="space-y-3">
            <div>
              <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-accent)]">
                {t('heldBooks.catalog.eyebrow')}
              </p>
              <h2 className="mt-1 font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)]">
                {t('heldBooks.catalog.title')}
              </h2>
            </div>

            <div className="grid gap-3">
              {books.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  contextLabel={t('heldBooks.catalog.contextLabel')}
                  actions={
                    <Link
                      to="/app/return-book"
                      className="primary-action min-h-0 px-3 py-2 text-sm"
                    >
                      {t('common.actions.returnThisTitle')}
                    </Link>
                  }
                />
              ))}
            </div>
          </div>

          <aside className="status-panel h-fit p-5">
            <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-blue)]">
              {t('heldBooks.aside.eyebrow')}
            </p>
            <h2 className="mt-3 font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
              {t('heldBooks.aside.title')}
            </h2>
            <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
              {t('heldBooks.aside.description')}
            </p>
          </aside>
        </section>
      )}

      {booksState === 'success' && hasBooks ? (
        <StateMessage tone="success" className="sr-only">
          {t('heldBooks.catalog.loaded')}
        </StateMessage>
      ) : null}
    </section>
  )
}
