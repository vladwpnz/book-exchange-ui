import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

import { giveBook } from '../api/booksApi'
import { StateMessage } from '../components/StateMessage'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'
type GivenBookSummary = {
  title: string
  username: string
}

function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : 'Unable to give this book. Please try again.'
}

export function GiveBookPage() {
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
      setGivenBook(null)
      setErrorMessage('Title and target user email are required.')
      setSubmitState('error')
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
    } catch (error) {
      setGivenBook(null)
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
              Ownership transfer
            </p>
            <h1 className="mt-2 font-[var(--font-display)] text-4xl font-semibold leading-tight text-zinc-950 sm:text-5xl">
              Give book
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
              Transfer ownership of one of your books to another reader by
              email.
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
              Final action
            </p>
            <h2 className="mt-2 font-[var(--font-display)] text-3xl font-semibold text-zinc-950">
              Confirm the recipient
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Giving changes ownership after the backend accepts the request.
            </p>
          </div>

          <StateMessage className="mt-5" tone="warning" title="Ownership moves">
            Check the title and recipient email before submitting this transfer.
          </StateMessage>

          <div className="mt-5 grid gap-5">
            <label
              className="block text-sm font-bold text-zinc-800"
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
              className="block text-sm font-bold text-zinc-800"
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
      </div>

      <aside className="status-panel h-fit p-5 sm:p-6" aria-labelledby="give-status-heading">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">
          Backend action
        </p>
        <h2
          id="give-status-heading"
          className="mt-3 font-[var(--font-display)] text-2xl font-semibold text-zinc-950"
        >
          Transfer status
        </h2>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          Give requests are sent to the backend using your current signed-in
          session.
        </p>

        {givenBook && (
          <StateMessage className="mt-5" tone="success">
            Last given: {givenBook.title} to {givenBook.username}.
          </StateMessage>
        )}
      </aside>
    </section>
  )
}
