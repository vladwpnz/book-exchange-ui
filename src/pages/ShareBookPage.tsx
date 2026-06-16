import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
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

function getErrorMessage(error: unknown, fallbackMessage: string) {
  return error instanceof Error ? error.message : fallbackMessage
}

export function ShareBookPage() {
  const { t } = useTranslation()
  const { showToast } = useToast()
  const [title, setTitle] = useState('')
  const [username, setUsername] = useState('')
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [sharedBook, setSharedBook] = useState<SharedBookSummary | null>(null)

  const isSubmitting = submitState === 'submitting'
  const shareSteps = [
    {
      title: t('shareBook.steps.name.title'),
      description: t('shareBook.steps.name.description'),
    },
    {
      title: t('shareBook.steps.reader.title'),
      description: t('shareBook.steps.reader.description'),
    },
    {
      title: t('shareBook.steps.collaborative.title'),
      description: t('shareBook.steps.collaborative.description'),
    },
  ]

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedTitle = title.trim()
    const trimmedUsername = username.trim()

    if (!trimmedTitle || !trimmedUsername) {
      const message = t('shareBook.errors.required')

      setSharedBook(null)
      setErrorMessage(message)
      setSubmitState('error')
      showToast({
        tone: 'warning',
        title: t('shareBook.toasts.detailsNeeded'),
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
        title: t('shareBook.toasts.shared'),
        message: t('shareBook.messages.sharedWith', {
          title: trimmedTitle,
          username: trimmedUsername,
        }),
      })
    } catch (error) {
      const message = getErrorMessage(error, t('shareBook.errors.fallback'))

      setSharedBook(null)
      setErrorMessage(message)
      setSubmitState('error')
      showToast({
        tone: 'error',
        title: t('shareBook.toasts.shareError'),
        message,
      })
    }
  }

  return (
    <section className="space-y-5">
      <PageHeader
        eyebrow={t('shareBook.header.eyebrow')}
        title={t('shareBook.header.title')}
        description={t('shareBook.header.description')}
        action={
          <Link className="secondary-action" to="/app/my-books">
            {t('common.actions.checkOwnedShelf')}
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
                {t('shareBook.form.eyebrow')}
              </p>
              <h2 className="mt-2 font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)]">
                {t('shareBook.form.title')}
              </h2>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                {t('shareBook.form.description')}
              </p>
            </div>

            <div className="rounded-[0.7rem] border border-[var(--color-status-info-border)] bg-[var(--color-status-info-bg)] p-4 text-sm leading-6 text-[var(--color-status-info-text)]">
              {t('shareBook.form.note')}
            </div>
          </div>

          <div className="mt-6 grid gap-5">
            <label
              className="block text-sm font-bold text-[var(--color-ink-soft)]"
              htmlFor="share-title"
            >
              {t('shareBook.form.bookTitle')}
              <input
                id="share-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="field-input mt-2"
                placeholder={t('common.placeholders.effectiveJava')}
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
              {t('shareBook.form.targetEmail')}
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
              title={t('shareBook.form.successTitle')}
              action={
                <Link className="secondary-action" to="/app/my-books">
                  {t('common.actions.viewMyBooks')}
                </Link>
              }
            >
              {t('shareBook.messages.sharedWith', {
                title: sharedBook.title,
                username: sharedBook.username,
              })}
            </StateMessage>
          )}

          {submitState === 'error' && errorMessage && (
            <StateMessage
              className="mt-5"
              tone="error"
              title={t('shareBook.toasts.shareError')}
            >
              <span id="share-error">{errorMessage}</span>
            </StateMessage>
          )}

          <button
            type="submit"
            className="primary-action mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? t('shareBook.form.submitting')
              : t('common.actions.shareBook')}
          </button>
        </form>

        <aside className="status-panel h-fit p-5 sm:p-6" aria-labelledby="share-status-heading">
          <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-blue)]">
            {t('shareBook.aside.eyebrow')}
          </p>
          <h2
            id="share-status-heading"
            className="mt-2 font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]"
          >
            {t('shareBook.aside.title')}
          </h2>
          <div className="mt-4">
            <WorkflowSteps steps={shareSteps} currentStep={2} />
          </div>

          {sharedBook && (
            <StateMessage className="mt-5" tone="success">
              {t('shareBook.messages.lastShared', {
                title: sharedBook.title,
                username: sharedBook.username,
              })}
            </StateMessage>
          )}
        </aside>
      </div>
    </section>
  )
}
