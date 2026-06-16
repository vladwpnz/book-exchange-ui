import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
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

function getErrorMessage(error: unknown, fallbackMessage: string) {
  return error instanceof Error ? error.message : fallbackMessage
}

export function GiveBookPage() {
  const { t } = useTranslation()
  const { showToast } = useToast()
  const [title, setTitle] = useState('')
  const [username, setUsername] = useState('')
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [givenBook, setGivenBook] = useState<GivenBookSummary | null>(null)

  const isSubmitting = submitState === 'submitting'
  const giveSteps = [
    {
      title: t('giveBook.steps.verify.title'),
      description: t('giveBook.steps.verify.description'),
    },
    {
      title: t('giveBook.steps.recipient.title'),
      description: t('giveBook.steps.recipient.description'),
    },
    {
      title: t('giveBook.steps.submit.title'),
      description: t('giveBook.steps.submit.description'),
    },
  ]

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedTitle = title.trim()
    const trimmedUsername = username.trim()

    if (!trimmedTitle || !trimmedUsername) {
      const message = t('giveBook.errors.required')

      setGivenBook(null)
      setErrorMessage(message)
      setSubmitState('error')
      showToast({
        tone: 'warning',
        title: t('giveBook.toasts.detailsNeeded'),
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
        title: t('giveBook.toasts.given'),
        message: t('giveBook.messages.givenTo', {
          title: trimmedTitle,
          username: trimmedUsername,
        }),
      })
    } catch (error) {
      const message = getErrorMessage(error, t('giveBook.errors.fallback'))

      setGivenBook(null)
      setErrorMessage(message)
      setSubmitState('error')
      showToast({
        tone: 'error',
        title: t('giveBook.toasts.giveError'),
        message,
      })
    }
  }

  return (
    <section className="space-y-5">
      <PageHeader
        eyebrow={t('giveBook.header.eyebrow')}
        title={t('giveBook.header.title')}
        description={t('giveBook.header.description')}
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
          <div>
            <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-danger)]">
              {t('giveBook.form.eyebrow')}
            </p>
            <h2 className="mt-2 font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)]">
              {t('giveBook.form.title')}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
              {t('giveBook.form.description')}
            </p>
          </div>

          <StateMessage
            className="mt-5"
            tone="warning"
            title={t('giveBook.form.warningTitle')}
          >
            {t('giveBook.form.warning')}
          </StateMessage>

          <div className="mt-5 grid gap-5">
            <label
              className="block text-sm font-bold text-[var(--color-ink-soft)]"
              htmlFor="give-title"
            >
              {t('giveBook.form.bookTitle')}
              <input
                id="give-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="field-input mt-2"
                placeholder={t('common.placeholders.giveTestBook')}
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
              {t('giveBook.form.targetEmail')}
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
              title={t('giveBook.form.successTitle')}
              action={
                <Link className="secondary-action" to="/app/my-books">
                  {t('common.actions.viewMyBooks')}
                </Link>
              }
            >
              {t('giveBook.messages.givenTo', {
                title: givenBook.title,
                username: givenBook.username,
              })}
            </StateMessage>
          )}

          {submitState === 'error' && errorMessage && (
            <StateMessage
              className="mt-5"
              tone="error"
              title={t('giveBook.toasts.giveError')}
            >
              <span id="give-error">{errorMessage}</span>
            </StateMessage>
          )}

          <button
            type="submit"
            className="danger-action mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? t('giveBook.form.submitting')
              : t('common.actions.giveBook')}
          </button>
        </form>

        <aside className="status-panel h-fit p-5 sm:p-6" aria-labelledby="give-status-heading">
          <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-danger)]">
            {t('giveBook.aside.eyebrow')}
          </p>
          <h2
            id="give-status-heading"
            className="mt-2 font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]"
          >
            {t('giveBook.aside.title')}
          </h2>
          <div className="mt-4">
            <WorkflowSteps steps={giveSteps} currentStep={3} />
          </div>

          {givenBook && (
            <StateMessage className="mt-5" tone="success">
              {t('giveBook.messages.lastGiven', {
                title: givenBook.title,
                username: givenBook.username,
              })}
            </StateMessage>
          )}
        </aside>
      </div>
    </section>
  )
}
