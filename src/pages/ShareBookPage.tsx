import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

import { shareBook } from '../api/booksApi'
import { StateMessage } from '../components/StateMessage'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'
type SharedBookSummary = {
  title: string
  username: string
}

function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : 'Unable to share this book. Please try again.'
}

export function ShareBookPage() {
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
      setSharedBook(null)
      setErrorMessage('Title and target user email are required.')
      setSubmitState('error')
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
    } catch (error) {
      setSharedBook(null)
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
              Share flow
            </p>
            <h1 className="mt-2 font-[var(--font-display)] text-4xl font-semibold leading-tight text-zinc-950 sm:text-5xl">
              Share book
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
              Send an owned book to another reader by email while keeping the
              exchange tied to your signed-in session.
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
              Exchange request
            </p>
            <h2 className="mt-2 font-[var(--font-display)] text-3xl font-semibold text-zinc-950">
              Choose a book and reader
            </h2>
          </div>

          <div className="mt-5 grid gap-5">
            <label
              className="block text-sm font-bold text-zinc-800"
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
              className="block text-sm font-bold text-zinc-800"
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
      </div>

      <aside className="status-panel h-fit p-5 sm:p-6" aria-labelledby="share-status-heading">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">
          Backend action
        </p>
        <h2
          id="share-status-heading"
          className="mt-3 font-[var(--font-display)] text-2xl font-semibold text-zinc-950"
        >
          Exchange status
        </h2>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          Share requests are sent to the backend using your current signed-in
          session.
        </p>

        {sharedBook && (
          <StateMessage className="mt-5" tone="success">
            Last shared: {sharedBook.title} to {sharedBook.username}.
          </StateMessage>
        )}
      </aside>
    </section>
  )
}
