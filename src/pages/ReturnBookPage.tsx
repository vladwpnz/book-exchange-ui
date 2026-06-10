import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

import { returnBook } from '../api/booksApi'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'
type ReturnedBookSummary = {
  title: string
}

function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : 'Unable to return this book. Please try again.'
}

export function ReturnBookPage() {
  const [title, setTitle] = useState('')
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [returnedBook, setReturnedBook] =
    useState<ReturnedBookSummary | null>(null)

  const isSubmitting = submitState === 'submitting'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      setReturnedBook(null)
      setErrorMessage('Book title is required.')
      setSubmitState('error')
      return
    }

    setSubmitState('submitting')
    setErrorMessage(null)

    try {
      await returnBook({
        title: trimmedTitle,
      })

      setReturnedBook({
        title: trimmedTitle,
      })
      setTitle('')
      setSubmitState('success')
    } catch (error) {
      setReturnedBook(null)
      setErrorMessage(getErrorMessage(error))
      setSubmitState('error')
    }
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <div className="page-hero motion-line reveal-blur p-6 sm:p-8">
          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">
              Return flow
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
              Return book
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400">
              Send a borrowed book back to its owner using your current
              signed-in session.
            </p>
          </div>
        </div>

        <form className="form-panel p-6 sm:p-7" onSubmit={handleSubmit}>
          <label
            className="block text-sm font-semibold text-slate-200"
            htmlFor="return-title"
          >
            Book title
            <input
              id="return-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="field-input mt-2"
              placeholder="Return Test Book"
              disabled={isSubmitting}
            />
          </label>

          {submitState === 'success' && returnedBook && (
            <div className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.08] px-4 py-4 text-sm leading-6 text-emerald-50">
              <p className="font-semibold">Book returned successfully.</p>
              <p className="mt-1 text-emerald-100/80">
                {returnedBook.title} was returned to its owner.
              </p>
              <Link className="secondary-action mt-4 inline-flex" to="/app/held-books">
                View held books
              </Link>
            </div>
          )}

          {submitState === 'error' && errorMessage && (
            <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/[0.08] px-4 py-4 text-sm leading-6 text-amber-50">
              <p className="font-semibold">Could not return book</p>
              <p className="mt-1 text-amber-100/80">{errorMessage}</p>
            </div>
          )}

          <button
            type="submit"
            className="primary-action mt-6 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Returning...' : 'Return book'}
          </button>
        </form>
      </div>

      <aside className="status-panel h-fit p-6 sm:p-7">
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
            Backend action
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-50">
            Return status
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Return requests are accepted only for books you currently hold and
            do not own.
          </p>

          {returnedBook && (
            <p className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.08] px-4 py-3 text-sm leading-6 text-emerald-50">
              Last returned: {returnedBook.title}.
            </p>
          )}

          <Link className="secondary-action mt-5 inline-flex" to="/app/held-books">
            Open held books
          </Link>
        </div>
      </aside>
    </section>
  )
}