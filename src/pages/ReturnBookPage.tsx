import { useEffect, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { getHeldBooks, returnBook } from '../api/booksApi'
import { BookCover } from '../components/BookCover'
import { BookListSkeleton } from '../components/BookListSkeleton'
import { PageHeader } from '../components/PageHeader'
import { StateMessage } from '../components/StateMessage'
import { useToast } from '../components/toastContext'
import { WorkflowSteps } from '../components/WorkflowSteps'
import type { Book } from '../types/book'

type BooksState = 'loading' | 'success' | 'empty' | 'error'
type SubmitState = 'idle' | 'submitting' | 'success' | 'error'
type ReturnedBookSummary = {
  title: string
  author: string
}

function getErrorMessage(error: unknown, fallbackMessage: string) {
  return error instanceof Error ? error.message : fallbackMessage
}

export function ReturnBookPage() {
  const { t } = useTranslation()
  const { showToast } = useToast()
  const [heldBooks, setHeldBooks] = useState<Book[]>([])
  const [booksState, setBooksState] = useState<BooksState>('loading')
  const [loadErrorMessage, setLoadErrorMessage] = useState<string | null>(null)
  const [selectedBookId, setSelectedBookId] = useState('')
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [returnedBook, setReturnedBook] =
    useState<ReturnedBookSummary | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  const isSubmitting = submitState === 'submitting'
  const selectedBook =
    heldBooks.find((book) => book.id === selectedBookId) ?? null
  const currentStep = selectedBook ? (isConfirmed ? 3 : 2) : 1
  const returnSteps = [
    {
      title: t('returnBook.steps.choose.title'),
      description: t('returnBook.steps.choose.description'),
    },
    {
      title: t('returnBook.steps.review.title'),
      description: t('returnBook.steps.review.description'),
    },
    {
      title: t('returnBook.steps.confirm.title'),
      description: t('returnBook.steps.confirm.description'),
    },
  ]

  useEffect(() => {
    let isActive = true

    async function loadHeldBooks() {
      setBooksState('loading')
      setLoadErrorMessage(null)
      setErrorMessage(null)
      setSubmitState('idle')
      setSelectedBookId('')
      setIsConfirmed(false)

      try {
        const books = await getHeldBooks()

        if (!isActive) {
          return
        }

        setHeldBooks(books)
        setBooksState(books.length > 0 ? 'success' : 'empty')
      } catch (error) {
        if (!isActive) {
          return
        }

        const message = getErrorMessage(error, t('heldBooks.error.fallback'))

        setHeldBooks([])
        setLoadErrorMessage(message)
        setBooksState('error')
        showToast({
          tone: 'error',
          title: t('returnBook.toasts.loadError'),
          message,
        })
      }
    }

    void loadHeldBooks()

    return () => {
      isActive = false
    }
  }, [reloadKey, showToast, t])

  function handleSelectBook(bookId: string) {
    setSelectedBookId(bookId)
    setIsConfirmed(false)
    setErrorMessage(null)

    if (submitState !== 'submitting') {
      setSubmitState('idle')
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!selectedBook) {
      const message = t('returnBook.errors.choose')

      setReturnedBook(null)
      setErrorMessage(message)
      setSubmitState('error')
      showToast({
        tone: 'warning',
        title: t('returnBook.toasts.chooseBook'),
        message,
      })
      return
    }

    if (!isConfirmed) {
      const message = t('returnBook.errors.confirm')

      setReturnedBook(null)
      setErrorMessage(message)
      setSubmitState('error')
      showToast({
        tone: 'warning',
        title: t('returnBook.toasts.confirmReturn'),
        message,
      })
      return
    }

    setSubmitState('submitting')
    setErrorMessage(null)

    try {
      await returnBook({
        title: selectedBook.title,
      })

      const nextHeldBooks = heldBooks.filter(
        (book) => book.id !== selectedBook.id,
      )

      setReturnedBook({
        title: selectedBook.title,
        author: selectedBook.author,
      })
      setHeldBooks(nextHeldBooks)
      setBooksState(nextHeldBooks.length > 0 ? 'success' : 'empty')
      setSelectedBookId('')
      setIsConfirmed(false)
      setSubmitState('success')
      showToast({
        tone: 'success',
        title: t('returnBook.toasts.returned'),
        message: t('returnBook.messages.returnedToOwner', {
          author: selectedBook.author,
          title: selectedBook.title,
        }),
      })
    } catch (error) {
      const message = getErrorMessage(error, t('returnBook.errors.fallback'))

      setReturnedBook(null)
      setErrorMessage(message)
      setSubmitState('error')
      showToast({
        tone: 'error',
        title: t('returnBook.toasts.returnError'),
        message,
      })
    }
  }

  return (
    <section className="space-y-5">
      <PageHeader
        eyebrow={t('returnBook.header.eyebrow')}
        title={t('returnBook.header.title')}
        description={t('returnBook.header.description')}
        action={
          <Link className="secondary-action" to="/app/held-books">
            {t('common.actions.openHeldBooks')}
          </Link>
        }
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_21rem]">
        <form
          className="form-panel p-5 sm:p-6"
          onSubmit={handleSubmit}
          aria-busy={isSubmitting}
        >
          <div className="max-w-2xl">
            <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-blue)]">
              {t('returnBook.form.eyebrow')}
            </p>
            <h2 className="mt-2 font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)]">
              {t('returnBook.form.title')}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
              {t('returnBook.form.description')}
            </p>
          </div>

          {booksState === 'loading' && (
            <div className="mt-6">
              <BookListSkeleton count={2} label={t('returnBook.form.loading')} />
            </div>
          )}

          {booksState === 'error' && (
            <StateMessage
              className="mt-5"
              tone="error"
              title={t('returnBook.toasts.loadError')}
              action={
                <button
                  className="secondary-action min-h-0 px-3 py-2 text-sm"
                  type="button"
                  onClick={() => setReloadKey((key) => key + 1)}
                >
                  {t('common.actions.tryAgain')}
                </button>
              }
            >
              {loadErrorMessage}
            </StateMessage>
          )}

          {booksState === 'empty' && (
            <StateMessage
              className="mt-5"
              tone="info"
              title={t('returnBook.form.noBooksTitle')}
            >
              {t('returnBook.form.noBooksDescription')}
            </StateMessage>
          )}

          {booksState === 'success' && (
            <>
              <fieldset className="mt-6">
                <legend className="text-sm font-bold text-[var(--color-ink-soft)]">
                  {t('returnBook.form.chooseLegend')}
                </legend>

                <div className="mt-3 grid gap-3">
                  {heldBooks.map((book) => (
                    <label key={book.id} className="block cursor-pointer">
                      <input
                        className="peer sr-only"
                        type="radio"
                        name="return-book"
                        value={book.id}
                        checked={book.id === selectedBookId}
                        disabled={isSubmitting}
                        onChange={() => handleSelectBook(book.id)}
                      />
                      <span className="grid gap-4 rounded-[0.7rem] border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-4 shadow-[var(--shadow-restraint)] transition duration-200 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-card-hover)] peer-checked:border-[var(--color-accent)] peer-checked:bg-[var(--color-accent-soft)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-[var(--color-accent)] sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:items-center">
                        <BookCover
                          title={book.title}
                          author={book.author}
                          genre={book.genre}
                          tone={book.tone}
                          size="sm"
                          className="mx-auto sm:mx-0"
                        />

                        <span className="min-w-0">
                          <span className="block font-[var(--font-display)] text-2xl font-semibold leading-7 text-[var(--color-ink)]">
                            {book.title}
                          </span>
                          <span className="mt-1 block text-sm font-semibold text-[var(--color-blue)]">
                            {book.author}
                          </span>
                          <span className="mt-2 block text-sm leading-6 text-[var(--color-muted)]">
                            {t('returnBook.form.ownerLine', {
                              owner: book.owner,
                            })}
                          </span>
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {selectedBook && (
                <StateMessage
                  className="mt-5"
                  tone="info"
                  title={t('returnBook.form.selectedTitle')}
                >
                  {t('returnBook.messages.selected', {
                    author: selectedBook.author,
                    title: selectedBook.title,
                  })}
                </StateMessage>
              )}

              <label className="mt-4 flex gap-3 rounded-[0.7rem] border border-[var(--color-border)] bg-[var(--color-panel-tint)] px-4 py-3 text-sm leading-6 text-[var(--color-muted)]">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-accent)]"
                  checked={isConfirmed}
                  disabled={!selectedBook || isSubmitting}
                  onChange={(event) => setIsConfirmed(event.target.checked)}
                />
                <span>{t('returnBook.form.confirmLabel')}</span>
              </label>
            </>
          )}

          {submitState === 'error' && errorMessage && (
            <StateMessage
              className="mt-5"
              tone="error"
              title={t('returnBook.toasts.returnError')}
            >
              <span id="return-error">{errorMessage}</span>
            </StateMessage>
          )}

          <button
            type="submit"
            className="primary-action mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            disabled={booksState !== 'success' || isSubmitting}
          >
            {isSubmitting
              ? t('returnBook.form.submitting')
              : t('common.actions.confirmReturn')}
          </button>
        </form>

        <aside className="status-panel h-fit p-5 sm:p-6" aria-labelledby="return-status-heading">
          <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-blue)]">
            {t('returnBook.aside.eyebrow')}
          </p>
          <h2
            id="return-status-heading"
            className="mt-2 font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]"
          >
            {t('returnBook.aside.title')}
          </h2>
          <div className="mt-4">
            <WorkflowSteps steps={returnSteps} currentStep={currentStep} />
          </div>

          {returnedBook && (
            <StateMessage className="mt-5" tone="success">
              {t('returnBook.messages.lastReturned', {
                author: returnedBook.author,
                title: returnedBook.title,
              })}
            </StateMessage>
          )}
        </aside>
      </div>
    </section>
  )
}
