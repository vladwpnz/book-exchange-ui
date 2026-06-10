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

      <form className="form-panel p-6 sm:p-7" onSubmit={handleSubmit}>
        <div className="grid gap-5 md:grid-cols-2">
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
        </div>

        {submitState === 'success' && createdBook && (
          <div className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-300/8 px-4 py-4 text-sm leading-6 text-emerald-50">
            <p className="font-semibold">Book added successfully.</p>
            <p className="mt-1 text-emerald-100/80">
              {createdBook.title} by {createdBook.author} is now on your owned
              shelf.
            </p>
            <Link className="secondary-action mt-4 inline-flex" to="/app/my-books">
              View my books
            </Link>
          </div>
        )}

        {submitState === 'error' && errorMessage && (
          <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/8 px-4 py-4 text-sm leading-6 text-amber-50">
            <p className="font-semibold">Could not add book</p>
            <p className="mt-1 text-amber-100/80">{errorMessage}</p>
          </div>
        )}

        <button
          type="submit"
          className="primary-action mt-6 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Add book'}
        </button>
      </form>
    </section>
  )
}