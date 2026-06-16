import { useEffect, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { markAchievementShownOnce } from '../achievements'
import { createBook } from '../api/booksApi'
import {
  addBookFromCatalog,
  isDuplicateCatalogBookError,
  searchCatalogBooks,
  type CatalogBook,
} from '../api/catalogApi'
import { useAuth } from '../auth/useAuth'
import { BookCover } from '../components/BookCover'
import { PageHeader } from '../components/PageHeader'
import { StateMessage } from '../components/StateMessage'
import { useToast } from '../components/toastContext'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'
type CatalogSearchState = 'loading' | 'ready' | 'empty' | 'error'
type CreatedBookSummary = {
  author: string
  title: string
}

const CATALOG_VISIBLE_STEP = 6
const DESCRIPTION_MAX_LENGTH = 150

function getErrorMessage(error: unknown, fallbackMessage: string) {
  return error instanceof Error ? error.message : fallbackMessage
}

function getShortDescription(description: string) {
  return description.length > DESCRIPTION_MAX_LENGTH
    ? `${description.slice(0, DESCRIPTION_MAX_LENGTH - 3).trim()}...`
    : description
}

function getCatalogTone(index: number) {
  return (['emerald', 'amber', 'paper'] as const)[index % 3]
}

export function AddBookPage() {
  const { t } = useTranslation()
  const { currentUserEmail } = useAuth()
  const { showToast } = useToast()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [createdBook, setCreatedBook] = useState<CreatedBookSummary | null>(
    null,
  )
  const [catalogQuery, setCatalogQuery] = useState('')
  const [catalogBooks, setCatalogBooks] = useState<CatalogBook[]>([])
  const [catalogSearchState, setCatalogSearchState] =
    useState<CatalogSearchState>('loading')
  const [catalogErrorMessage, setCatalogErrorMessage] = useState<string | null>(
    null,
  )
  const [catalogAddErrorMessage, setCatalogAddErrorMessage] = useState<
    string | null
  >(null)
  const [catalogAddedBook, setCatalogAddedBook] =
    useState<CreatedBookSummary | null>(null)
  const [addingCatalogBookIds, setAddingCatalogBookIds] = useState<string[]>([])
  const [ownedCatalogBookIds, setOwnedCatalogBookIds] = useState<string[]>([])
  const [visibleCatalogCount, setVisibleCatalogCount] =
    useState(CATALOG_VISIBLE_STEP)

  const isSubmitting = submitState === 'submitting'
  const visibleCatalogBooks = catalogBooks.slice(0, visibleCatalogCount)
  const hasMoreCatalogBooks = visibleCatalogCount < catalogBooks.length
  const shownCatalogCount = Math.min(visibleCatalogCount, catalogBooks.length)
  const isFilteredCatalogSearch = catalogQuery.trim().length >= 2

  function showFirstBookAchievementIfNeeded() {
    if (!markAchievementShownOnce(currentUserEmail, 'first-book-added')) {
      return
    }

    showToast({
      tone: 'success',
      title: t('addBook.toasts.achievement.title'),
      message: t('addBook.toasts.achievement.message'),
    })
  }

  function markCatalogBookAsOwned(catalogBookId: string) {
    setOwnedCatalogBookIds((currentIds) =>
      currentIds.includes(catalogBookId)
        ? currentIds
        : [...currentIds, catalogBookId],
    )
  }

  useEffect(() => {
    const trimmedQuery = catalogQuery.trim()
    const catalogQueryValue = trimmedQuery.length >= 2 ? trimmedQuery : ''

    let isCurrentSearch = true

    const searchTimeoutId = window.setTimeout(async () => {
      setCatalogSearchState('loading')
      setCatalogErrorMessage(null)

      try {
        const books = await searchCatalogBooks(catalogQueryValue)

        if (!isCurrentSearch) {
          return
        }

        setCatalogBooks(books)
        setCatalogSearchState(books.length > 0 ? 'ready' : 'empty')
      } catch (error) {
        if (!isCurrentSearch) {
          return
        }

        const message = getErrorMessage(error, t('addBook.errors.fallback'))

        setCatalogBooks([])
        setCatalogErrorMessage(message)
        setCatalogSearchState('error')
        showToast({
          tone: 'error',
          title: t('addBook.toasts.searchError'),
          message,
        })
      }
    }, 300)

    return () => {
      isCurrentSearch = false
      window.clearTimeout(searchTimeoutId)
    }
  }, [catalogQuery, showToast, t])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedTitle = title.trim()
    const trimmedAuthor = author.trim()

    if (!trimmedTitle || !trimmedAuthor) {
      const message = t('addBook.errors.required')

      setCreatedBook(null)
      setErrorMessage(message)
      setSubmitState('error')
      showToast({
        tone: 'warning',
        title: t('addBook.toasts.detailsNeeded'),
        message,
      })
      return
    }

    setSubmitState('submitting')
    setErrorMessage(null)

    try {
      await createBook({
        author: trimmedAuthor,
        title: trimmedTitle,
      })

      setCreatedBook({
        author: trimmedAuthor,
        title: trimmedTitle,
      })
      setTitle('')
      setAuthor('')
      setSubmitState('success')
      showToast({
        tone: 'success',
        title: t('addBook.toasts.added'),
        message: t('addBook.messages.addedToShelf', {
          author: trimmedAuthor,
          title: trimmedTitle,
        }),
      })
      showFirstBookAchievementIfNeeded()
    } catch (error) {
      const message = getErrorMessage(error, t('addBook.errors.fallback'))

      setCreatedBook(null)
      setErrorMessage(message)
      setSubmitState('error')
      showToast({
        tone: 'error',
        title: t('addBook.toasts.addError'),
        message,
      })
    }
  }

  function handleCatalogQueryChange(value: string) {
    setCatalogQuery(value)
    setVisibleCatalogCount(CATALOG_VISIBLE_STEP)
    setCatalogSearchState('loading')
    setCatalogErrorMessage(null)
    setCatalogAddErrorMessage(null)
    setCatalogAddedBook(null)
  }

  function handleShowMoreCatalogBooks() {
    setVisibleCatalogCount((currentCount) =>
      Math.min(currentCount + CATALOG_VISIBLE_STEP, catalogBooks.length),
    )
  }

  async function handleAddCatalogBook(book: CatalogBook) {
    if (ownedCatalogBookIds.includes(book.catalogBookId)) {
      return
    }

    setAddingCatalogBookIds((currentIds) =>
      currentIds.includes(book.catalogBookId)
        ? currentIds
        : [...currentIds, book.catalogBookId],
    )
    setCatalogAddedBook(null)
    setCatalogAddErrorMessage(null)

    try {
      const addedBook = await addBookFromCatalog(book.catalogBookId)

      markCatalogBookAsOwned(book.catalogBookId)
      setCatalogAddedBook(addedBook)
      showToast({
        tone: 'success',
        title: t('addBook.toasts.added'),
        message: t('addBook.messages.addedToShelf', {
          author: addedBook.author,
          title: addedBook.title,
        }),
      })
      showFirstBookAchievementIfNeeded()
    } catch (error) {
      const message = getErrorMessage(error, t('addBook.errors.fallback'))

      if (isDuplicateCatalogBookError(error)) {
        markCatalogBookAsOwned(book.catalogBookId)
      }

      setCatalogAddErrorMessage(message)
      showToast({
        tone: 'error',
        title: t('addBook.toasts.catalogAddError'),
        message,
      })
    } finally {
      setAddingCatalogBookIds((currentIds) =>
        currentIds.filter(
          (catalogBookId) => catalogBookId !== book.catalogBookId,
        ),
      )
    }
  }

  return (
    <section className="space-y-5">
      <PageHeader
        eyebrow={t('addBook.header.eyebrow')}
        title={t('addBook.header.title')}
        description={t('addBook.header.description')}
        action={
          <Link className="secondary-action" to="/app/my-books">
            {t('common.actions.viewMyBooks')}
          </Link>
        }
      />

      <section
        className="paper-panel p-5 sm:p-6"
        aria-labelledby="catalog-heading"
        aria-busy={catalogSearchState === 'loading'}
      >
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
          <div className="min-w-0">
            <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-accent)]">
              {t('addBook.catalog.eyebrow')}
            </p>
            <h2
              id="catalog-heading"
              className="mt-2 font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)]"
            >
              {t('addBook.catalog.title')}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
              {t('addBook.catalog.description')}
            </p>
          </div>

          <aside className="rounded-[0.7rem] border border-[var(--color-border)] bg-[var(--color-panel-tint)] p-4">
            <p className="text-sm font-bold text-[var(--color-ink)]">
              {t('addBook.catalog.behaviorTitle')}
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
              {t('addBook.catalog.behaviorDescription')}
            </p>
          </aside>
        </div>

        <label
          className="mt-6 block text-sm font-bold text-[var(--color-ink-soft)]"
          htmlFor="catalog-search"
        >
          {t('addBook.catalog.searchLabel')}
        </label>
        <div className="mt-2 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
          <input
            id="catalog-search"
            value={catalogQuery}
            onChange={(event) => handleCatalogQueryChange(event.target.value)}
            className="field-input"
            placeholder={t('addBook.catalog.searchLabel')}
            aria-describedby="catalog-search-help"
          />
          <span className="secondary-action pointer-events-none min-h-0 text-sm">
            {isFilteredCatalogSearch
              ? t('common.actions.filtered')
              : t('common.actions.browseAll')}
          </span>
        </div>
        <p id="catalog-search-help" className="mt-2 text-xs text-[var(--color-muted)]">
          {t('addBook.catalog.help')}
        </p>

        {catalogAddedBook && (
          <StateMessage
            className="mt-4"
            tone="success"
            title={t('addBook.catalog.addedTitle')}
            action={
              <Link className="secondary-action" to="/app/my-books">
                {t('common.actions.viewMyBooks')}
              </Link>
            }
          >
            {t('addBook.messages.catalogAddedToShelf', {
              author: catalogAddedBook.author,
              title: catalogAddedBook.title,
            })}
          </StateMessage>
        )}

        {catalogAddErrorMessage && (
          <StateMessage
            className="mt-4"
            tone="error"
            title={t('addBook.toasts.catalogAddError')}
          >
            {catalogAddErrorMessage}
          </StateMessage>
        )}

        {catalogSearchState === 'loading' && (
          <div className="mt-5 grid gap-3" role="status" aria-live="polite">
            <span className="sr-only">{t('addBook.catalog.loading')}</span>
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={`catalog-loading-${index}`}
                className="rounded-[0.7rem] border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-4 py-4"
                aria-hidden="true"
              >
                <div className="flex gap-4">
                  <div className="h-20 w-14 shrink-0 rounded-md border border-[var(--color-border)] bg-[var(--color-skeleton)]" />
                  <div className="min-w-0 flex-1">
                    <div className="h-5 w-2/3 rounded-full bg-[var(--color-skeleton-strong)]" />
                    <div className="mt-3 h-3 w-40 rounded-full bg-[var(--color-skeleton-cool)]" />
                    <div className="mt-4 h-3 w-full rounded-full bg-[var(--color-skeleton)]" />
                    <div className="mt-2 h-3 w-4/5 rounded-full bg-[var(--color-skeleton)]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {catalogSearchState === 'empty' && (
          <StateMessage
            className="mt-4"
            tone="info"
            title={t('addBook.catalog.noMatchesTitle')}
          >
            {t('addBook.catalog.noMatchesDescription')}
          </StateMessage>
        )}

        {catalogSearchState === 'error' && catalogErrorMessage && (
          <StateMessage
            className="mt-4"
            tone="error"
            title={t('addBook.toasts.searchError')}
          >
            {catalogErrorMessage}
          </StateMessage>
        )}

        {catalogSearchState === 'ready' && (
          <div className="mt-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
                  {isFilteredCatalogSearch
                    ? t('addBook.catalog.matchingTitle')
                    : t('addBook.catalog.resultsTitle')}
                </h3>
                <p className="mt-1 text-sm text-[var(--color-muted)]" role="status">
                  {t('addBook.catalog.showing', {
                    shown: shownCatalogCount,
                    total: catalogBooks.length,
                  })}
                </p>
              </div>
            </div>

            <div className="mt-3 grid gap-3">
              {visibleCatalogBooks.map((book, index) => {
                const isAddingBook = addingCatalogBookIds.includes(
                  book.catalogBookId,
                )
                const isOwnedCatalogBook = ownedCatalogBookIds.includes(
                  book.catalogBookId,
                )
                const isCatalogActionDisabled =
                  isAddingBook || isOwnedCatalogBook

                return (
                  <article
                    key={book.catalogBookId}
                    className="grid gap-4 rounded-[0.7rem] border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-4 shadow-[var(--shadow-restraint)] transition duration-200 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-card-hover)] sm:grid-cols-[4.5rem_minmax(0,1fr)_auto] sm:items-center"
                  >
                    <BookCover
                      title={book.title}
                      author={book.author}
                      genre={book.genre}
                      tone={getCatalogTone(index)}
                      size="sm"
                      className="mx-auto sm:mx-0"
                    />

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="min-w-0 font-[var(--font-display)] text-2xl font-semibold leading-7 text-[var(--color-ink)]">
                          {book.title}
                        </h4>
                        <span className="rounded-full border border-[var(--color-status-success-border)] bg-[var(--color-status-success-bg)] px-2.5 py-0.5 text-xs font-bold text-[var(--color-status-success-text)]">
                          {book.genre}
                        </span>
                      </div>

                      <p className="mt-1 text-sm font-semibold text-[var(--color-blue)]">
                        {book.author}
                      </p>

                      <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                        {getShortDescription(book.description)}
                      </p>

                      {book.isbn && (
                        <p className="mt-2 text-xs font-bold tracking-[0.14em] text-[var(--color-muted)]">
                          {t('addBook.catalog.isbn', { isbn: book.isbn })}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      className="primary-action w-full shrink-0 whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                      onClick={() => void handleAddCatalogBook(book)}
                      disabled={isCatalogActionDisabled}
                      aria-busy={isAddingBook}
                    >
                      {isOwnedCatalogBook
                        ? t('addBook.catalog.alreadyOwned')
                        : isAddingBook
                          ? t('addBook.catalog.adding')
                          : t('addBook.catalog.addToMine')}
                    </button>
                  </article>
                )
              })}
            </div>

            {hasMoreCatalogBooks && (
              <button
                type="button"
                className="secondary-action mt-4 w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                onClick={handleShowMoreCatalogBooks}
              >
                {t('common.actions.showMore')}
              </button>
            )}
          </div>
        )}
      </section>

      <section className="form-panel p-5 sm:p-6" aria-labelledby="manual-add-heading">
        <div className="grid gap-5 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <div>
            <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-muted)]">
              {t('addBook.manual.eyebrow')}
            </p>
            <h2
              id="manual-add-heading"
              className="mt-2 font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)]"
            >
              {t('addBook.manual.title')}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
              {t('addBook.manual.description')}
            </p>
          </div>

          <div>
            <form
              className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]"
              onSubmit={handleSubmit}
              aria-busy={isSubmitting}
            >
              <label
                className="block text-sm font-bold text-[var(--color-ink-soft)]"
                htmlFor="title"
              >
                {t('common.bookMeta.title')}
                <input
                  id="title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className="field-input mt-2"
                  placeholder={t('common.placeholders.bookTitle')}
                  disabled={isSubmitting}
                  aria-invalid={submitState === 'error' && Boolean(errorMessage)}
                  aria-describedby={
                    submitState === 'error' && errorMessage
                      ? 'manual-add-error'
                      : undefined
                  }
                />
              </label>

              <label
                className="block text-sm font-bold text-[var(--color-ink-soft)]"
                htmlFor="author"
              >
                {t('common.bookMeta.author')}
                <input
                  id="author"
                  value={author}
                  onChange={(event) => setAuthor(event.target.value)}
                  className="field-input mt-2"
                  placeholder={t('common.placeholders.authorName')}
                  disabled={isSubmitting}
                  aria-invalid={submitState === 'error' && Boolean(errorMessage)}
                  aria-describedby={
                    submitState === 'error' && errorMessage
                      ? 'manual-add-error'
                      : undefined
                  }
                />
              </label>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="secondary-action w-full disabled:cursor-not-allowed disabled:opacity-60 lg:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? t('common.actions.saving')
                    : t('common.actions.addManually')}
                </button>
              </div>
            </form>

            {submitState === 'success' && createdBook && (
              <StateMessage
                className="mt-4"
                tone="success"
                title={t('addBook.manual.successTitle')}
                action={
                  <Link className="secondary-action" to="/app/my-books">
                    {t('common.actions.viewMyBooks')}
                  </Link>
                }
              >
                {t('addBook.messages.addedToShelf', {
                  author: createdBook.author,
                  title: createdBook.title,
                })}
              </StateMessage>
            )}

            {submitState === 'error' && errorMessage && (
              <StateMessage
                className="mt-4"
                tone="error"
                title={t('addBook.toasts.addError')}
              >
                <span id="manual-add-error">{errorMessage}</span>
              </StateMessage>
            )}
          </div>
        </div>
      </section>
    </section>
  )
}
