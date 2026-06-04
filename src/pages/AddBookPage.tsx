import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

import { createBook } from '../api/booksApi'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'
type CreatedBookSummary = {
  author: string
  title: string
}

function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : 'Unable to add this book. Please try again.'
}

export function AddBookPage() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [createdBook, setCreatedBook] = useState<CreatedBookSummary | null>(
    null,
  )

  const isSubmitting = submitState === 'submitting'

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

  return (
    <section className="rounded-lg border border-white/10 bg-[#f6eddc] p-6 text-[#17221d] shadow-[0_24px_80px_rgba(0,0,0,0.2)]">
      <p className="text-sm font-semibold uppercase text-emerald-800">
        Catalog entry
      </p>
      <h1 className="mt-3 text-4xl font-semibold">Add book</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5c675b]">
        Add a title and author to place a new book on your owned shelf.
      </p>
      <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <label className="block text-sm font-semibold" htmlFor="title">
          Title
          <input
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="mt-2 w-full rounded-md border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
            placeholder="Book title"
            disabled={isSubmitting}
          />
        </label>
        <label className="block text-sm font-semibold" htmlFor="author">
          Author
          <input
            id="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            className="mt-2 w-full rounded-md border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
            placeholder="Author name"
            disabled={isSubmitting}
          />
        </label>

        {submitState === 'success' && createdBook && (
          <div className="rounded-md border border-emerald-700/20 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-900 md:col-span-2">
            <p className="font-semibold">Book added successfully.</p>
            <p>
              {createdBook.title} by {createdBook.author} is now on your owned
              shelf.
            </p>
            <Link
              className="mt-3 inline-flex rounded-md border border-emerald-700/30 px-4 py-2 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-100"
              to="/app/my-books"
            >
              View my books
            </Link>
          </div>
        )}

        {submitState === 'error' && errorMessage && (
          <div className="rounded-md border border-amber-500/30 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950 md:col-span-2">
            <p className="font-semibold">Could not add book</p>
            <p>{errorMessage}</p>
          </div>
        )}

        <button
          type="submit"
          className="rounded-md bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-900/60 md:w-fit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Add book'}
        </button>
      </form>
    </section>
  )
}
