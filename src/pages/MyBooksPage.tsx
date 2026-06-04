import { useEffect, useState } from 'react'

import { getOwnedBooks } from '../api/booksApi'
import { dashboardActions } from '../api/mockLibrary'
import { BookCard } from '../components/BookCard'
import { DashboardCard } from '../components/DashboardCard'
import type { Book } from '../types/book'

type BooksState = 'loading' | 'success' | 'error'

const loadingCards = ['owned-books-loading-1', 'owned-books-loading-2']

function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : 'Unable to load your books. Please try again.'
}

export function MyBooksPage() {
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

        setBooks([])
        setErrorMessage(getErrorMessage(error))
        setBooksState('error')
      }
    }

    void loadBooks()

    return () => {
      isActive = false
    }
  }, [reloadKey])

  const hasBooks = booksState === 'success' && books.length > 0
  const isEmpty = booksState === 'success' && books.length === 0

  return (
    <section>
      <div className="rounded-lg border border-white/10 bg-[#0d1b16] p-6">
        <p className="text-sm font-semibold uppercase text-amber-200">
          My library
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-stone-50">My books</h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-stone-400">
          Manage the books you own and prepare exchange actions from a calm
          dashboard surface.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {dashboardActions.map((action) => (
          <DashboardCard key={action.href} {...action} />
        ))}
      </div>

      {booksState === 'loading' && (
        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {loadingCards.map((card) => (
            <div
              key={card}
              className="min-h-40 animate-pulse rounded-lg border border-stone-200/70 bg-[#f7efdf] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.16)]"
            >
              <div className="flex gap-4">
                <div className="h-32 w-20 rounded-md bg-stone-300" />
                <div className="flex flex-1 flex-col">
                  <div className="h-3 w-24 rounded-full bg-emerald-700/20" />
                  <div className="mt-4 h-5 w-3/4 rounded-full bg-stone-400/40" />
                  <div className="mt-3 h-4 w-40 rounded-full bg-stone-400/30" />
                  <div className="mt-auto h-4 w-52 rounded-full bg-amber-700/20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {booksState === 'error' && (
        <div className="mt-6 rounded-lg border border-amber-300/40 bg-[#f7efdf] p-6 text-[#15211b] shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
          <p className="text-sm font-semibold uppercase text-amber-800">
            Books unavailable
          </p>
          <h2 className="mt-2 text-2xl font-semibold">Could not load books</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#586357]">
            {errorMessage}
          </p>
          <button
            className="mt-5 rounded-md border border-emerald-700/30 bg-emerald-700 px-4 py-2 text-sm font-semibold text-stone-50 transition hover:bg-emerald-800"
            type="button"
            onClick={() => setReloadKey((key) => key + 1)}
          >
            Try again
          </button>
        </div>
      )}

      {isEmpty && (
        <div className="mt-6 rounded-lg border border-dashed border-amber-300/50 bg-[#f7efdf] p-6 text-[#15211b] shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
          <p className="text-sm font-semibold uppercase text-emerald-700">
            Empty shelf
          </p>
          <h2 className="mt-2 text-2xl font-semibold">No owned books yet</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#586357]">
            Books returned from the backend will appear here once your catalog
            has owned items.
          </p>
        </div>
      )}

      {hasBooks && (
        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </section>
  )
}
