import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

import { returnBook } from '../api/booksApi'
import { StateMessage } from '../components/StateMessage'

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
    <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="space-y-5">
        <div className="page-hero motion-line reveal-blur p-5 sm:p-6">
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">
              Return flow
            </p>
            <h1 className="mt-2 font-[var(--font-display)] text-4xl font-semibold leading-tight text-zinc-950 sm:text-5xl">
              Return book
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
              Send a borrowed book back to its owner using your current
              signed-in session.
            </p>
          </div>
        </div>

        <form
          className="form-panel p-5 sm:p-6"
          onSubmit={handleSubmit}
          aria-busy={isSubmitting}
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">
              Close a hold
            </p>
            <h2 className="mt-2 font-[var(--font-display)] text-3xl font-semibold text-zinc-950">
              Confirm the borrowed title
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Returns are accepted only for books you currently hold and do not
              own.
            </p>
          </div>

          <label
            className="mt-5 block text-sm font-bold text-zinc-800"
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
              aria-invalid={submitState === 'error' && Boolean(errorMessage)}
              aria-describedby={
                submitState === 'error' && errorMessage
                  ? 'return-error'
                  : undefined
              }
            />
          </label>

          {submitState === 'success' && returnedBook && (
            <StateMessage
              className="mt-5"
              tone="success"
              title="Book returned successfully"
              action={
                <Link className="secondary-action" to="/app/held-books">
                  View held books
                </Link>
              }
            >
              {returnedBook.title} was returned to its owner.
            </StateMessage>
          )}

          {submitState === 'error' && errorMessage && (
            <StateMessage className="mt-5" tone="error" title="Could not return book">
              <span id="return-error">{errorMessage}</span>
            </StateMessage>
          )}

          <button
            type="submit"
            className="primary-action mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Returning...' : 'Return book'}
          </button>
        </form>
      </div>

      <aside className="status-panel h-fit p-5 sm:p-6" aria-labelledby="return-status-heading">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">
          Backend action
        </p>
        <h2
          id="return-status-heading"
          className="mt-3 font-[var(--font-display)] text-2xl font-semibold text-zinc-950"
        >
          Return status
        </h2>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          Use this flow after checking your held shelf.
        </p>

        {returnedBook && (
          <StateMessage className="mt-5" tone="success">
            Last returned: {returnedBook.title}.
          </StateMessage>
        )}

        <Link className="secondary-action mt-5" to="/app/held-books">
          Open held books
        </Link>
      </aside>
    </section>
  )
}
