import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

import { createBook } from '../api/booksApi'
import {
  addBookFromCatalog,
  searchCatalogBooks,
  type CatalogBook,
} from '../api/catalogApi'
import { StateMessage } from '../components/StateMessage'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'
type CatalogSearchState = 'loading' | 'ready' | 'empty' | 'error'
type CreatedBookSummary = {
  author: string
  title: string
}

const CATALOG_VISIBLE_STEP = 6
const DESCRIPTION_MAX_LENGTH = 130

function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : 'Unable to add this book. Please try again.'
}

function getCatalogInitials(book: CatalogBook) {
  return `${book.title.charAt(0)}${book.author.charAt(0)}`.toUpperCase()
}

function getShortDescription(description: string) {
  return description.length > DESCRIPTION_MAX_LENGTH
    ? `${description.slice(0, DESCRIPTION_MAX_LENGTH - 3).trim()}...`
    : description
}

export function AddBookPage() {
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
  const [visibleCatalogCount, setVisibleCatalogCount] =
    useState(CATALOG_VISIBLE_STEP)

  const isSubmitting = submitState === 'submitting'
  const visibleCatalogBooks = catalogBooks.slice(0, visibleCatalogCount)
  const hasMoreCatalogBooks = visibleCatalogCount < catalogBooks.length
  const shownCatalogCount = Math.min(visibleCatalogCount, catalogBooks.length)
  const isFilteredCatalogSearch = catalogQuery.trim().length >= 2

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

        setCatalogBooks([])
        setCatalogErrorMessage(getErrorMessage(error))
        setCatalogSearchState('error')
      }
    }, 300)

    return () => {
      isCurrentSearch = false
      window.clearTimeout(searchTimeoutId)
    }
  }, [catalogQuery])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedTitle = title.trim()
    const trimmedAuthor = author.trim()

    if (!trimmedTitle || !trimmedAuthor) {
      setCreatedBook(null)
      setErrorMessage('Title and author are required.')
      setSubmitState('error')
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
    } catch (error) {
      setCreatedBook(null)
      setErrorMessage(getErrorMessage(error))
      setSubmitState('error')
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
    setAddingCatalogBookIds((currentIds) =>
      currentIds.includes(book.catalogBookId)
        ? currentIds
        : [...currentIds, book.catalogBookId],
    )
    setCatalogAddedBook(null)
    setCatalogAddErrorMessage(null)

    try {
      const addedBook = await addBookFromCatalog(book.catalogBookId)

      setCatalogAddedBook(addedBook)
    } catch (error) {
      setCatalogAddErrorMessage(getErrorMessage(error))
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
      <div className="page-hero motion-line reveal-blur p-5 sm:p-6">
        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">
              Catalog entry
            </p>
            <h1 className="mt-2 font-[var(--font-display)] text-4xl font-semibold leading-tight text-zinc-950 sm:text-5xl">
              Add book
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
              Start with the shared catalog, then use manual entry only when a
              title is missing from the exchange index.
            </p>
          </div>
          <Link className="secondary-action" to="/app/my-books">
            View my books
          </Link>
        </div>
      </div>

      <section
        className="form-panel p-5 sm:p-6"
        aria-labelledby="catalog-heading"
        aria-busy={catalogSearchState === 'loading'}
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">
              Primary path
            </p>
            <h2
              id="catalog-heading"
              className="mt-2 font-[var(--font-display)] text-3xl font-semibold text-zinc-950"
            >
              Choose from catalog first
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-zinc-600">
            Search waits briefly while you type and keeps the result list stable
            before adding a book to your owned shelf.
          </p>
        </div>

        <label
          className="mt-5 block text-sm font-bold text-zinc-800"
          htmlFor="catalog-search"
        >
          Search by title or author
        </label>
        <input
          id="catalog-search"
          value={catalogQuery}
          onChange={(event) => handleCatalogQueryChange(event.target.value)}
          className="field-input mt-2"
          placeholder="Search by title or author"
          aria-describedby="catalog-search-help"
        />
        <p id="catalog-search-help" className="mt-2 text-xs text-zinc-500">
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
          <div
            className="mt-4 grid gap-3"
            role="status"
            aria-live="polite"
          >
            <span className="sr-only">Loading catalog books.</span>
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={`catalog-loading-${index}`}
                className="rounded-xl border border-zinc-200 bg-white px-4 py-4"
                aria-hidden="true"
              >
                <div className="flex gap-3">
                  <div className="h-16 w-12 shrink-0 rounded-lg border border-zinc-200 bg-[#F1EEE8]" />
                  <div className="min-w-0 flex-1">
                    <div className="h-4 w-2/3 rounded-full bg-zinc-200" />
                    <div className="mt-3 h-3 w-40 rounded-full bg-blue-100" />
                    <div className="mt-3 h-3 w-full rounded-full bg-zinc-100" />
                    <div className="mt-2 h-3 w-4/5 rounded-full bg-zinc-100" />
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
          <div className="mt-5">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="font-[var(--font-display)] text-2xl font-semibold text-zinc-950">
                  {isFilteredCatalogSearch
                    ? 'Matching catalog books'
                    : 'Catalog books'}
                </h3>
                <p className="mt-1 text-sm text-zinc-600" role="status">
                  Showing {shownCatalogCount} of {catalogBooks.length}
                </p>
              </div>
            </div>

            <div className="mt-3 overflow-hidden rounded-xl border border-zinc-200 bg-white">
              {visibleCatalogBooks.map((book) => {
                const isAddingBook = addingCatalogBookIds.includes(
                  book.catalogBookId,
                )

                return (
                  <article
                    key={book.catalogBookId}
                    className="flex flex-col gap-3 border-b border-zinc-200 px-4 py-4 transition duration-200 last:border-b-0 hover:bg-[#fffefa] sm:flex-row sm:items-center"
                  >
                    <div className="flex min-w-0 flex-1 gap-3 sm:gap-4">
                      <div className="flex h-16 w-12 shrink-0 flex-col justify-between overflow-hidden rounded-lg border border-zinc-200 bg-[#F1EEE8] p-2 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.78)]">
                        {book.coverUrl ? (
                          <img
                            src={book.coverUrl}
                            alt=""
                            className="-m-2 h-[calc(100%+1rem)] w-[calc(100%+1rem)] object-cover"
                          />
                        ) : (
                          <>
                            <span className="h-1 w-5 rounded-full bg-blue-600/70" />
                            <span className="text-center text-sm font-bold tracking-wide text-zinc-900">
                              {getCatalogInitials(book)}
                            </span>
                            <span className="h-1 w-7 rounded-full bg-green-700/55" />
                          </>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="min-w-0 font-semibold text-zinc-950">
                            {book.title}
                          </h4>
                          <span className="rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-xs font-bold uppercase tracking-[0.14em] text-green-800">
                            {book.genre}
                          </span>
                        </div>

                        <p className="mt-1 text-sm font-medium text-blue-700">
                          {book.author}
                        </p>

                        <p className="mt-1 text-sm leading-6 text-zinc-600">
                          {getShortDescription(book.description)}
                        </p>

                        {book.isbn && (
                          <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">
                            ISBN {book.isbn}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      className="secondary-action w-full shrink-0 whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                      onClick={() => void handleAddCatalogBook(book)}
                      disabled={isAddingBook}
                      aria-busy={isAddingBook}
                    >
                      {isAddingBook ? 'Adding...' : 'Add to my books'}
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

        <div className="mt-7 border-t border-zinc-200 pt-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-zinc-600">
            Secondary fallback
          </p>
          <h3 className="mt-2 font-[var(--font-display)] text-2xl font-semibold text-zinc-950">
            Can't find the book? Add it manually
          </h3>

          <form
            className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]"
            onSubmit={handleSubmit}
            aria-busy={isSubmitting}
          >
            <label
              className="block text-sm font-bold text-zinc-800"
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
              className="block text-sm font-bold text-zinc-800"
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
                className="primary-action w-full disabled:cursor-not-allowed disabled:opacity-60 lg:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Add book'}
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
              {createdBook.title} by {createdBook.author} is now on your owned
              shelf.
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
      </section>
    </section>
  )
}
