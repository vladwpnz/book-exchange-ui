import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

import { shareBook } from '../api/booksApi'

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
    <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <div className="page-hero motion-line reveal-blur p-6 sm:p-8">
          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">
              Share flow
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
              Share book
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400">
              Send a book from your owned shelf to another reader by email and
              keep the exchange action tied to your current session.
            </p>
          </div>
        </div>

        <form className="form-panel p-6 sm:p-7" onSubmit={handleSubmit}>
          <div className="grid gap-5">
            <label
              className="block text-sm font-semibold text-slate-200"
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
              />
            </label>

            <label
              className="block text-sm font-semibold text-slate-200"
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
              />
            </label>
          </div>

          {submitState === 'success' && sharedBook && (
            <div className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.08] px-4 py-4 text-sm leading-6 text-emerald-50">
              <p className="font-semibold">Book shared successfully.</p>
              <p className="mt-1 text-emerald-100/80">
                {sharedBook.title} was shared with {sharedBook.username}.
              </p>
              <Link className="secondary-action mt-4 inline-flex" to="/app/my-books">
                View my books
              </Link>
            </div>
          )}

          {submitState === 'error' && errorMessage && (
            <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/[0.08] px-4 py-4 text-sm leading-6 text-amber-50">
              <p className="font-semibold">Could not share book</p>
              <p className="mt-1 text-amber-100/80">{errorMessage}</p>
            </div>
          )}

          <button
            type="submit"
            className="primary-action mt-6 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sharing...' : 'Share book'}
          </button>
        </form>
      </div>

      <aside className="status-panel h-fit p-6 sm:p-7">
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
            Backend action
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-50">
            Exchange status
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Share requests are sent to the backend using your current signed-in
            session.
          </p>

          {sharedBook && (
            <p className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.08] px-4 py-3 text-sm leading-6 text-emerald-50">
              Last shared: {sharedBook.title} to {sharedBook.username}.
            </p>
          )}
        </div>
      </aside>
    </section>
  )
}