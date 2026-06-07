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
      <div className="rounded-lg border border-white/10 bg-[#f6eddc] p-6 text-[#17221d] shadow-[0_24px_80px_rgba(0,0,0,0.2)]">
        <p className="text-sm font-semibold uppercase text-emerald-800">
          Share flow
        </p>
        <h1 className="mt-3 text-4xl font-semibold">Share book</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5c675b]">
          Send a book from your owned shelf to another reader by email.
        </p>
        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-semibold" htmlFor="share-title">
            Book title
            <input
              id="share-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="mt-2 w-full rounded-md border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
              placeholder="Effective Java"
              disabled={isSubmitting}
            />
          </label>
          <label
            className="block text-sm font-semibold"
            htmlFor="share-reader"
          >
            Target user email
            <input
              id="share-reader"
              type="email"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="mt-2 w-full rounded-md border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
              placeholder="reader@example.com"
              disabled={isSubmitting}
            />
          </label>

          {submitState === 'success' && sharedBook && (
            <div className="rounded-md border border-emerald-700/20 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-900">
              <p className="font-semibold">Book shared successfully.</p>
              <p>
                {sharedBook.title} was shared with {sharedBook.username}.
              </p>
              <Link
                className="mt-3 inline-flex rounded-md border border-emerald-700/30 px-4 py-2 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-100"
                to="/app/my-books"
              >
                View my books
              </Link>
            </div>
          )}

          {submitState === 'error' && errorMessage && (
            <div className="rounded-md border border-amber-500/30 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
              <p className="font-semibold">Could not share book</p>
              <p>{errorMessage}</p>
            </div>
          )}

          <button
            type="submit"
            className="rounded-md bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-900/60 md:w-fit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sharing...' : 'Share book'}
          </button>
        </form>
      </div>

      <aside className="rounded-lg border border-amber-200/30 bg-amber-200/10 p-6">
        <h2 className="text-2xl font-semibold text-amber-100">
          Exchange status
        </h2>
        <p className="mt-3 text-sm leading-6 text-stone-300">
          Share requests are sent to the backend using your current signed-in
          session.
        </p>
        {sharedBook && (
          <p className="mt-4 rounded-md border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm leading-6 text-emerald-50">
            Last shared: {sharedBook.title} to {sharedBook.username}.
          </p>
        )}
      </aside>
    </section>
  )
}
