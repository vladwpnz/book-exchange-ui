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
      <div className="rounded-lg border border-white/10 bg-[#f6eddc] p-6 text-[#17221d] shadow-[0_24px_80px_rgba(0,0,0,0.2)]">
        <p className="text-sm font-semibold uppercase text-emerald-800">
          Return flow
        </p>
        <h1 className="mt-3 text-4xl font-semibold">Return book</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5c675b]">
          Send a borrowed book back to its owner using your current signed-in
          session.
        </p>
        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-semibold" htmlFor="return-title">
            Book title
            <input
              id="return-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="mt-2 w-full rounded-md border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
              placeholder="Return Test Book"
              disabled={isSubmitting}
            />
          </label>

          {submitState === 'success' && returnedBook && (
            <div className="rounded-md border border-emerald-700/20 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-900">
              <p className="font-semibold">
                Book returned successfully. {returnedBook.title} was returned
                to its owner.
              </p>
              <Link
                className="mt-3 inline-flex rounded-md border border-emerald-700/30 px-4 py-2 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-100"
                to="/app/held-books"
              >
                View held books
              </Link>
            </div>
          )}

          {submitState === 'error' && errorMessage && (
            <div className="rounded-md border border-amber-500/30 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
              <p className="font-semibold">Could not return book</p>
              <p>{errorMessage}</p>
            </div>
          )}

          <button
            type="submit"
            className="rounded-md bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-900/60 md:w-fit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Returning...' : 'Return book'}
          </button>
        </form>
      </div>

      <aside className="rounded-lg border border-amber-200/30 bg-amber-200/10 p-6">
        <h2 className="text-2xl font-semibold text-amber-100">
          Return status
        </h2>
        <p className="mt-3 text-sm leading-6 text-stone-300">
          Return requests are accepted only for books you currently hold and do
          not own.
        </p>
        {returnedBook && (
          <p className="mt-4 rounded-md border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm leading-6 text-emerald-50">
            Last returned: {returnedBook.title}.
          </p>
        )}
        <Link
          className="mt-5 inline-flex rounded-md border border-amber-100/20 px-4 py-2 text-sm font-semibold text-amber-50 transition hover:bg-amber-100/10"
          to="/app/held-books"
        >
          Open held books
        </Link>
      </aside>
    </section>
  )
}
