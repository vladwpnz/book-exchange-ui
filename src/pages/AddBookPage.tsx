import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

import { createBook } from '../api/booksApi'
import {
  addBookFromCatalog,
  searchCatalogBooks,
  type CatalogBook,
} from '../api/catalogApi'

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
    <section className="space-y-6">
      <div className="page-hero motion-line reveal-blur p-6 sm:p-8">
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">
            Catalog entry
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
            Add book
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400">
            Add a new title to your owned shelf and make it available for the
            exchange workflow.
          </p>
        </div>
      </div>

      <section className="form-panel p-6 sm:p-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
              Add book
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-50">
              Choose from catalog first
            </h2>
          </div>
          <Link className="secondary-action inline-flex" to="/app/my-books">
            View my books
          </Link>
        </div>

        <label
          className="mt-5 block text-sm font-semibold text-slate-200"
          htmlFor="catalog-search"
        >
          Search by title or author
          <input
            id="catalog-search"
            value={catalogQuery}
            onChange={(event) => handleCatalogQueryChange(event.target.value)}
            className="field-input mt-2"
            placeholder="Search by title or author"
          />
        </label>

        {catalogAddedBook && (
          <div className="mt-4 flex flex-col gap-3 rounded-xl border border-emerald-300/20 bg-emerald-300/8 px-4 py-3 text-sm leading-6 text-emerald-50 sm:flex-row sm:items-center sm:justify-between">
            <p>
              <span className="font-semibold">Added.</span>{' '}
              <span className="text-emerald-100/80">
                {catalogAddedBook.title} by {catalogAddedBook.author} is on your
                owned shelf.
              </span>
            </p>
            <Link
              className="font-semibold text-emerald-100 hover:text-white"
              to="/app/my-books"
            >
              View my books
            </Link>
          </div>
        )}

        {catalogAddErrorMessage && (
          <div className="mt-4 rounded-xl border border-amber-300/20 bg-amber-300/8 px-4 py-3 text-sm leading-6 text-amber-50">
            <p className="font-semibold">Could not add catalog book</p>
            <p className="mt-1 text-amber-100/80">{catalogAddErrorMessage}</p>
          </div>
        )}

        {catalogSearchState === 'loading' && (
          <div className="status-panel mt-4 p-4 text-sm leading-6 text-cyan-100">
            Loading catalog books...
          </div>
        )}

        {catalogSearchState === 'empty' && (
          <div className="status-panel mt-4 p-4 text-sm leading-6 text-slate-300">
            No catalog books matched this search.
          </div>
        )}

        {catalogSearchState === 'error' && catalogErrorMessage && (
          <div className="mt-4 rounded-xl border border-amber-300/20 bg-amber-300/8 px-4 py-3 text-sm leading-6 text-amber-50">
            <p className="font-semibold">Could not search catalog</p>
            <p className="mt-1 text-amber-100/80">{catalogErrorMessage}</p>
          </div>
        )}

        {catalogSearchState === 'ready' && (
          <div className="mt-5">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-50">
                  {isFilteredCatalogSearch
                    ? 'Matching catalog books'
                    : 'Catalog books'}
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  Showing {shownCatalogCount} of {catalogBooks.length}
                </p>
              </div>
            </div>

            <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/30">
              {visibleCatalogBooks.map((book) => {
                const isAddingBook = addingCatalogBookIds.includes(
                  book.catalogBookId,
                )

                return (
                  <article
                    key={book.catalogBookId}
                    className="flex flex-col gap-3 border-b border-white/10 px-4 py-4 transition hover:bg-white/[0.035] last:border-b-0 sm:flex-row sm:items-center"
                  >
                    <div className="flex min-w-0 flex-1 gap-3 sm:gap-4">
                      <div className="flex h-16 w-12 shrink-0 flex-col justify-between rounded-lg border border-cyan-200/20 bg-slate-950/70 p-2">
                        <span className="h-1 w-5 rounded-full bg-cyan-200/60" />
                        <span className="text-center text-sm font-bold tracking-wide text-cyan-50">
                          {getCatalogInitials(book)}
                        </span>
                        <span className="h-1 w-7 rounded-full bg-emerald-200/50" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="min-w-0 text-base font-semibold text-slate-50">
                            {book.title}
                          </h4>
                          <span className="rounded-full border border-emerald-200/20 bg-emerald-200/8 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-100">
                            {book.genre}
                          </span>
                        </div>

                        <p className="mt-1 text-sm font-medium text-cyan-100">
                          {book.author}
                        </p>

                        <p className="mt-1 text-sm leading-6 text-slate-400">
                          {getShortDescription(book.description)}
                        </p>

                        {book.isbn && (
                          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
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

        <div className="mt-7 border-t border-white/10 pt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">
            Add manually
          </p>
          <h3 className="mt-2 text-xl font-semibold text-slate-50">
            Can't find the book? Add it manually
          </h3>

          <form
            className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]"
            onSubmit={handleSubmit}
          >
            <label
              className="block text-sm font-semibold text-slate-200"
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
              />
            </label>

            <label
              className="block text-sm font-semibold text-slate-200"
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
            <div className="mt-4 rounded-xl border border-emerald-300/20 bg-emerald-300/8 px-4 py-3 text-sm leading-6 text-emerald-50">
              <p className="font-semibold">Book added successfully.</p>
              <p className="mt-1 text-emerald-100/80">
                {createdBook.title} by {createdBook.author} is now on your
                owned shelf.
              </p>
              <Link
                className="mt-2 inline-flex font-semibold text-emerald-100 hover:text-white"
                to="/app/my-books"
              >
                View my books
              </Link>
            </div>
          )}

          {submitState === 'error' && errorMessage && (
            <div className="mt-4 rounded-xl border border-amber-300/20 bg-amber-300/8 px-4 py-3 text-sm leading-6 text-amber-50">
              <p className="font-semibold">Could not add book</p>
              <p className="mt-1 text-amber-100/80">{errorMessage}</p>
            </div>
          )}
        </div>
      </section>
    </section>
  )
}
