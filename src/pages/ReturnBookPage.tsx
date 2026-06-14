import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

import { returnBook } from '../api/booksApi'
import { PageHeader } from '../components/PageHeader'
import { StateMessage } from '../components/StateMessage'
import { WorkflowSteps } from '../components/WorkflowSteps'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'
type ReturnedBookSummary = {
  title: string
}

const returnSteps = [
  {
    title: 'Check held shelf',
    description: 'Confirm the book appears in your currently held list.',
  },
  {
    title: 'Enter the title',
    description: 'Use the borrowed title so the backend can close the hold.',
  },
  {
    title: 'Return to owner',
    description: 'A successful response removes the active hold state.',
  },
]

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
    <section className="space-y-5">
      <PageHeader
        eyebrow="Return workflow"
        title="Return book"
        description="Close an active hold when a borrowed copy goes back to its owner."
        action={
          <Link className="secondary-action" to="/app/held-books">
            Open held books
          </Link>
        }
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_21rem]">
        <form
          className="form-panel p-5 sm:p-6"
          onSubmit={handleSubmit}
          aria-busy={isSubmitting}
        >
          <div className="max-w-2xl">
            <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-blue)]">
              Close a hold
            </p>
            <h2 className="mt-2 font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)]">
              Confirm the borrowed title
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
              Returns are accepted only for books you currently hold and do not
              own.
            </p>
          </div>

          <label
            className="mt-6 block text-sm font-bold text-[var(--color-ink-soft)]"
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

        <aside className="status-panel h-fit p-5 sm:p-6" aria-labelledby="return-status-heading">
          <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-blue)]">
            Hold closure
          </p>
          <h2
            id="return-status-heading"
            className="mt-2 font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]"
          >
            Return sequence
          </h2>
          <div className="mt-4">
            <WorkflowSteps steps={returnSteps} currentStep={2} />
          </div>

          {returnedBook && (
            <StateMessage className="mt-5" tone="success">
              Last returned: {returnedBook.title}.
            </StateMessage>
          )}
        </aside>
      </div>
    </section>
  )
}
