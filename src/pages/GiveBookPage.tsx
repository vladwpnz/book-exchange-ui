import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

import { giveBook } from '../api/booksApi'
import { PageHeader } from '../components/PageHeader'
import { StateMessage } from '../components/StateMessage'
import { useToast } from '../components/toastContext'
import { WorkflowSteps } from '../components/WorkflowSteps'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'
type GivenBookSummary = {
  title: string
  username: string
}

const giveSteps = [
  {
    title: 'Verify the title',
    description: 'Use the exact owned title that should leave your shelf.',
  },
  {
    title: 'Confirm recipient',
    description: 'The target email receives ownership after the transfer is confirmed.',
  },
  {
    title: 'Submit final transfer',
    description: 'This is intentionally more serious than a shared hold.',
  },
]

function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : 'Unable to give this book. Please try again.'
}

export function GiveBookPage() {
  const { showToast } = useToast()
  const [title, setTitle] = useState('')
  const [username, setUsername] = useState('')
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [givenBook, setGivenBook] = useState<GivenBookSummary | null>(null)

  const isSubmitting = submitState === 'submitting'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedTitle = title.trim()
    const trimmedUsername = username.trim()

    if (!trimmedTitle || !trimmedUsername) {
      const message = 'Title and target user email are required.'

      setGivenBook(null)
      setErrorMessage(message)
      setSubmitState('error')
      showToast({
        tone: 'warning',
        title: 'Give details needed',
        message,
      })
      return
    }

    setSubmitState('submitting')
    setErrorMessage(null)

    try {
      await giveBook({
        title: trimmedTitle,
        username: trimmedUsername,
      })

      setGivenBook({
        title: trimmedTitle,
        username: trimmedUsername,
      })
      setTitle('')
      setUsername('')
      setSubmitState('success')
      showToast({
        tone: 'success',
        title: 'Book given',
        message: `${trimmedTitle} was given to ${trimmedUsername}.`,
      })
    } catch (error) {
      const message = getErrorMessage(error)

      setGivenBook(null)
      setErrorMessage(message)
      setSubmitState('error')
      showToast({
        tone: 'error',
        title: 'Could not give book',
        message,
      })
    }
  }

  return (
    <section className="space-y-5">
      <PageHeader
        eyebrow="Ownership transfer"
        title="Give book"
        description="Move a copy from your owned shelf to another reader as a final transfer."
        action={
          <Link className="secondary-action" to="/app/my-books">
            Check owned shelf
          </Link>
        }
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_21rem]">
        <form
          className="form-panel p-5 sm:p-6"
          onSubmit={handleSubmit}
          aria-busy={isSubmitting}
        >
          <div>
            <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-danger)]">
              Final transfer
            </p>
            <h2 className="mt-2 font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)]">
              Confirm ownership move
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
              Giving changes ownership after the transfer is confirmed.
            </p>
          </div>

          <StateMessage className="mt-5" tone="warning" title="Ownership moves">
            Check the title and recipient email before submitting this transfer.
          </StateMessage>

          <div className="mt-5 grid gap-5">
            <label
              className="block text-sm font-bold text-[var(--color-ink-soft)]"
              htmlFor="give-title"
            >
              Book title
              <input
                id="give-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="field-input mt-2"
                placeholder="Give Test Book"
                disabled={isSubmitting}
                aria-invalid={submitState === 'error' && Boolean(errorMessage)}
                aria-describedby={
                  submitState === 'error' && errorMessage
                    ? 'give-error'
                    : undefined
                }
              />
            </label>

            <label
              className="block text-sm font-bold text-[var(--color-ink-soft)]"
              htmlFor="give-reader"
            >
              Target user email
              <input
                id="give-reader"
                type="email"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="field-input mt-2"
                placeholder="reader@example.com"
                disabled={isSubmitting}
                aria-invalid={submitState === 'error' && Boolean(errorMessage)}
                aria-describedby={
                  submitState === 'error' && errorMessage
                    ? 'give-error'
                    : undefined
                }
              />
            </label>
          </div>

          {submitState === 'success' && givenBook && (
            <StateMessage
              className="mt-5"
              tone="success"
              title="Book given successfully"
              action={
                <Link className="secondary-action" to="/app/my-books">
                  View my books
                </Link>
              }
            >
              {givenBook.title} was given to {givenBook.username}.
            </StateMessage>
          )}

          {submitState === 'error' && errorMessage && (
            <StateMessage className="mt-5" tone="error" title="Could not give book">
              <span id="give-error">{errorMessage}</span>
            </StateMessage>
          )}

          <button
            type="submit"
            className="danger-action mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Giving...' : 'Give book'}
          </button>
        </form>

        <aside className="status-panel h-fit p-5 sm:p-6" aria-labelledby="give-status-heading">
          <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-danger)]">
            Transfer checks
          </p>
          <h2
            id="give-status-heading"
            className="mt-2 font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]"
          >
            Before you give
          </h2>
          <div className="mt-4">
            <WorkflowSteps steps={giveSteps} currentStep={3} />
          </div>

          {givenBook && (
            <StateMessage className="mt-5" tone="success">
              Last given: {givenBook.title} to {givenBook.username}.
            </StateMessage>
          )}
        </aside>
      </div>
    </section>
  )
}
