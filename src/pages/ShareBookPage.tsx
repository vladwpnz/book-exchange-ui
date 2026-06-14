import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

import { shareBook } from '../api/booksApi'
import { PageHeader } from '../components/PageHeader'
import { StateMessage } from '../components/StateMessage'
import { useToast } from '../components/toastContext'
import { WorkflowSteps } from '../components/WorkflowSteps'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'
type SharedBookSummary = {
  title: string
  username: string
}

const shareSteps = [
  {
    title: 'Name the owned copy',
    description: 'Use the title exactly as it appears on your shelf.',
  },
  {
    title: 'Choose the reader',
    description: 'Enter the recipient email so the exchange can create the hold.',
  },
  {
    title: 'Keep it collaborative',
    description: 'The book remains part of the exchange while it is shared.',
  },
]

function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : 'Unable to share this book. Please try again.'
}

export function ShareBookPage() {
  const { showToast } = useToast()
  const [title, setTitle] = useState('')
  const [username, setUsername] = useState('')
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [sharedBook, setSharedBook] = useState<SharedBookSummary | null>(null)

  const isSubmitting = submitState === 'submitting'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedTitle = title.trim()
    const trimmedUsername = username.trim()

    if (!trimmedTitle || !trimmedUsername) {
      const message = 'Title and target user email are required.'

      setSharedBook(null)
      setErrorMessage(message)
      setSubmitState('error')
      showToast({
        tone: 'warning',
        title: 'Share details needed',
        message,
      })
      return
    }

    setSubmitState('submitting')
    setErrorMessage(null)

    try {
      await shareBook({
        title: trimmedTitle,
        username: trimmedUsername,
      })

      setSharedBook({
        title: trimmedTitle,
        username: trimmedUsername,
      })
      setTitle('')
      setUsername('')
      setSubmitState('success')
      showToast({
        tone: 'success',
        title: 'Book shared',
        message: `${trimmedTitle} was shared with ${trimmedUsername}.`,
      })
    } catch (error) {
      const message = getErrorMessage(error)

      setSharedBook(null)
      setErrorMessage(message)
      setSubmitState('error')
      showToast({
        tone: 'error',
        title: 'Could not share book',
        message,
      })
    }
  }

  return (
    <section className="space-y-5">
      <PageHeader
        eyebrow="Share workflow"
        title="Share book"
        description="Create a collaborative handoff by pairing one owned title with another reader account."
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
          <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_14rem] md:items-start">
            <div>
              <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-accent)]">
                Collaborative exchange
              </p>
              <h2 className="mt-2 font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)]">
                Send a readable copy
              </h2>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                Sharing is a temporary exchange state, not a final transfer of
                ownership.
              </p>
            </div>

            <div className="rounded-[0.7rem] border border-[#bfd1dc] bg-[#edf5f8] p-4 text-sm leading-6 text-[#21455f]">
              The recipient email connects this action to a real user account.
            </div>
          </div>

          <div className="mt-6 grid gap-5">
            <label
              className="block text-sm font-bold text-[var(--color-ink-soft)]"
              htmlFor="share-title"
            >
              Book title
              <input
                id="share-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="field-input mt-2"
                placeholder="Effective Java"
                disabled={isSubmitting}
                aria-invalid={submitState === 'error' && Boolean(errorMessage)}
                aria-describedby={
                  submitState === 'error' && errorMessage
                    ? 'share-error'
                    : undefined
                }
              />
            </label>

            <label
              className="block text-sm font-bold text-[var(--color-ink-soft)]"
              htmlFor="share-reader"
            >
              Target user email
              <input
                id="share-reader"
                type="email"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="field-input mt-2"
                placeholder="reader@example.com"
                disabled={isSubmitting}
                aria-invalid={submitState === 'error' && Boolean(errorMessage)}
                aria-describedby={
                  submitState === 'error' && errorMessage
                    ? 'share-error'
                    : undefined
                }
              />
            </label>
          </div>

          {submitState === 'success' && sharedBook && (
            <StateMessage
              className="mt-5"
              tone="success"
              title="Book shared successfully"
              action={
                <Link className="secondary-action" to="/app/my-books">
                  View my books
                </Link>
              }
            >
              {sharedBook.title} was shared with {sharedBook.username}.
            </StateMessage>
          )}

          {submitState === 'error' && errorMessage && (
            <StateMessage className="mt-5" tone="error" title="Could not share book">
              <span id="share-error">{errorMessage}</span>
            </StateMessage>
          )}

          <button
            type="submit"
            className="primary-action mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sharing...' : 'Share book'}
          </button>
        </form>

        <aside className="status-panel h-fit p-5 sm:p-6" aria-labelledby="share-status-heading">
          <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-blue)]">
            Workflow
          </p>
          <h2
            id="share-status-heading"
            className="mt-2 font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]"
          >
            How sharing works
          </h2>
          <div className="mt-4">
            <WorkflowSteps steps={shareSteps} currentStep={2} />
          </div>

          {sharedBook && (
            <StateMessage className="mt-5" tone="success">
              Last shared: {sharedBook.title} to {sharedBook.username}.
            </StateMessage>
          )}
        </aside>
      </div>
    </section>
  )
}
