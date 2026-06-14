import { useEffect, useState, type FormEvent } from 'react'
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

function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : 'Unable to add this book. Please try again.'
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
      title: 'Achievement unlocked',
      message: 'First book added',
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

        const message = getErrorMessage(error)

        setCatalogBooks([])
        setCatalogErrorMessage(message)
        setCatalogSearchState('error')
        showToast({
          tone: 'error',
          title: 'Could not search catalog',
          message,
        })
      }
    }, 300)

    return () => {
      isCurrentSearch = false
      window.clearTimeout(searchTimeoutId)
    }
  }, [catalogQuery, showToast])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedTitle = title.trim()
    const trimmedAuthor = author.trim()

    if (!trimmedTitle || !trimmedAuthor) {
      const message = 'Title and author are required.'

      setCreatedBook(null)
      setErrorMessage(message)
      setSubmitState('error')
      showToast({
        tone: 'warning',
        title: 'Add title and author',
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
        title: 'Book added',
        message: `${trimmedTitle} by ${trimmedAuthor} is now on your owned shelf.`,
      })
      showFirstBookAchievementIfNeeded()
    } catch (error) {
      const message = getErrorMessage(error)

      setCreatedBook(null)
      setErrorMessage(message)
      setSubmitState('error')
      showToast({
        tone: 'error',
        title: 'Could not add book',
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
        title: 'Book added',
        message: `${addedBook.title} by ${addedBook.author} is now on your owned shelf.`,
      })
      showFirstBookAchievementIfNeeded()
    } catch (error) {
      const message = getErrorMessage(error)

      if (isDuplicateCatalogBookError(error)) {
        markCatalogBookAsOwned(book.catalogBookId)
      }

      setCatalogAddErrorMessage(message)
      showToast({
        tone: 'error',
        title: 'Could not add catalog book',
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
        eyebrow="Catalog entry"
        title="Add book"
        description="Search the shared catalog first. Manual entry stays available when a title is missing from the index."
        action={
          <Link className="secondary-action" to="/app/my-books">
            View my books
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
              Primary path
            </p>
            <h2
              id="catalog-heading"
              className="mt-2 font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)]"
            >
              Search the exchange catalog
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
              Results update after a short pause while you type. Add from here
              to preserve catalog metadata and keep shelves consistent.
            </p>
          </div>

          <aside className="rounded-[0.7rem] border border-[var(--color-border)] bg-[#fbf4ea] p-4">
            <p className="text-sm font-bold text-[var(--color-ink)]">
              Catalog behavior
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
              Search waits briefly while you type. Use Show more to browse the
              rest of the catalog.
            </p>
          </aside>
        </div>

        <label
          className="mt-6 block text-sm font-bold text-[var(--color-ink-soft)]"
          htmlFor="catalog-search"
        >
          Search by title or author
        </label>
        <div className="mt-2 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
          <input
            id="catalog-search"
            value={catalogQuery}
            onChange={(event) => handleCatalogQueryChange(event.target.value)}
            className="field-input"
            placeholder="Search by title or author"
            aria-describedby="catalog-search-help"
          />
          <span className="secondary-action pointer-events-none min-h-0 text-sm">
            {isFilteredCatalogSearch ? 'Filtered' : 'Browse all'}
          </span>
        </div>
        <p id="catalog-search-help" className="mt-2 text-xs text-[var(--color-muted)]">
          Type at least two characters to filter the catalog.
        </p>

        {catalogAddedBook && (
          <StateMessage
            className="mt-4"
            tone="success"
            title="Catalog book added"
            action={
              <Link className="secondary-action" to="/app/my-books">
                View my books
              </Link>
            }
          >
            {catalogAddedBook.title} by {catalogAddedBook.author} is on your
            owned shelf.
          </StateMessage>
        )}

        {catalogAddErrorMessage && (
          <StateMessage
            className="mt-4"
            tone="error"
            title="Could not add catalog book"
          >
            {catalogAddErrorMessage}
          </StateMessage>
        )}

        {catalogSearchState === 'loading' && (
          <div className="mt-5 grid gap-3" role="status" aria-live="polite">
            <span className="sr-only">Loading catalog books.</span>
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={`catalog-loading-${index}`}
                className="rounded-[0.7rem] border border-[var(--color-border)] bg-white px-4 py-4"
                aria-hidden="true"
              >
                <div className="flex gap-4">
                  <div className="h-20 w-14 shrink-0 rounded-md border border-[var(--color-border)] bg-[#eadfce]" />
                  <div className="min-w-0 flex-1">
                    <div className="h-5 w-2/3 rounded-full bg-[#ddd0bf]" />
                    <div className="mt-3 h-3 w-40 rounded-full bg-[#dfeaf1]" />
                    <div className="mt-4 h-3 w-full rounded-full bg-[#eadfce]" />
                    <div className="mt-2 h-3 w-4/5 rounded-full bg-[#eadfce]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {catalogSearchState === 'empty' && (
          <StateMessage className="mt-4" tone="info" title="No catalog matches">
            No catalog books matched this search. Manual adding is available
            below as a secondary fallback.
          </StateMessage>
        )}

        {catalogSearchState === 'error' && catalogErrorMessage && (
          <StateMessage
            className="mt-4"
            tone="error"
            title="Could not search catalog"
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
                    ? 'Matching catalog books'
                    : 'Catalog books'}
                </h3>
                <p className="mt-1 text-sm text-[var(--color-muted)]" role="status">
                  Showing {shownCatalogCount} of {catalogBooks.length}
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
                    className="grid gap-4 rounded-[0.7rem] border border-[var(--color-border)] bg-white p-4 shadow-[var(--shadow-restraint)] transition duration-200 hover:border-[var(--color-border-strong)] hover:bg-[#fffdf8] sm:grid-cols-[4.5rem_minmax(0,1fr)_auto] sm:items-center"
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
                        <span className="rounded-full border border-[#bfd8c7] bg-[#eef7ed] px-2.5 py-0.5 text-xs font-bold text-[#194934]">
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
                          ISBN {book.isbn}
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
                        ? 'Already in my books'
                        : isAddingBook
                          ? 'Adding...'
                          : 'Add to my books'}
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
                Show more
              </button>
            )}
          </div>
        )}
      </section>

      <section className="form-panel p-5 sm:p-6" aria-labelledby="manual-add-heading">
        <div className="grid gap-5 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <div>
            <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-muted)]">
              Secondary fallback
            </p>
            <h2
              id="manual-add-heading"
              className="mt-2 font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)]"
            >
              Add manually
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
              Can't find your book? Add a real title that is missing from the
              shared catalog.
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
                Title
                <input
                  id="title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className="field-input mt-2"
                  placeholder="Book title"
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
                Author
                <input
                  id="author"
                  value={author}
                  onChange={(event) => setAuthor(event.target.value)}
                  className="field-input mt-2"
                  placeholder="Author name"
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
                  {isSubmitting ? 'Saving...' : 'Add manually'}
                </button>
              </div>
            </form>

            {submitState === 'success' && createdBook && (
              <StateMessage
                className="mt-4"
                tone="success"
                title="Book added successfully"
                action={
                  <Link className="secondary-action" to="/app/my-books">
                    View my books
                  </Link>
                }
              >
                {createdBook.title} by {createdBook.author} is now on your
                owned shelf.
              </StateMessage>
            )}

            {submitState === 'error' && errorMessage && (
              <StateMessage
                className="mt-4"
                tone="error"
                title="Could not add book"
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
