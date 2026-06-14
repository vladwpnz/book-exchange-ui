import { useEffect, useMemo, useState, type FormEvent } from 'react'

import { getHeldBooks, getOwnedBooks } from '../api/booksApi'
import {
  getProfile,
  updateProfile,
  type UserProfile,
} from '../api/profileApi'
import { PageHeader } from '../components/PageHeader'
import { StateMessage } from '../components/StateMessage'
import { useToast } from '../components/toastContext'

type ProfileState = 'loading' | 'success' | 'error'
type SubmitState = 'idle' | 'submitting' | 'success' | 'error'
type ProfileStats = {
  ownedBooks: number | null
  heldBooks: number | null
}
type Achievement = {
  id: string
  label: string
  unlocked: boolean
}

function getErrorMessage(error: unknown, fallbackMessage: string) {
  return error instanceof Error ? error.message : fallbackMessage
}

function getInitials(profile: UserProfile) {
  const source = profile.name.trim() || profile.email.trim()
  const parts = source.split(/\s+/).filter(Boolean)
  const initials =
    parts.length > 1
      ? `${parts[0][0]}${parts[1][0]}`
      : source.slice(0, 2)

  return initials.toUpperCase()
}

async function getProfileStats(): Promise<ProfileStats> {
  const [ownedBooksResult, heldBooksResult] = await Promise.allSettled([
    getOwnedBooks(),
    getHeldBooks(),
  ])

  return {
    ownedBooks:
      ownedBooksResult.status === 'fulfilled'
        ? ownedBooksResult.value.length
        : null,
    heldBooks:
      heldBooksResult.status === 'fulfilled' ? heldBooksResult.value.length : null,
  }
}

function formatStatValue(value: number | null) {
  return value === null ? '-' : String(value)
}

export function ProfilePage() {
  const { showToast } = useToast()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [profileStats, setProfileStats] = useState<ProfileStats>({
    ownedBooks: null,
    heldBooks: null,
  })
  const [profileState, setProfileState] = useState<ProfileState>('loading')
  const [profileError, setProfileError] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let isActive = true

    async function loadProfile() {
      setProfileState('loading')
      setProfileError(null)
      setSubmitState('idle')
      setStatusMessage(null)
      setProfileStats({
        ownedBooks: null,
        heldBooks: null,
      })

      try {
        const [loadedProfile, loadedStats] = await Promise.all([
          getProfile(),
          getProfileStats(),
        ])

        if (!isActive) {
          return
        }

        setProfile(loadedProfile)
        setProfileStats(loadedStats)
        setName(loadedProfile.name)
        setProfileState('success')
      } catch (error) {
        if (!isActive) {
          return
        }

        const message = getErrorMessage(
          error,
          'Unable to load your profile. Please try again.',
        )

        setProfile(null)
        setProfileStats({
          ownedBooks: null,
          heldBooks: null,
        })
        setName('')
        setProfileError(message)
        setProfileState('error')
        showToast({
          tone: 'error',
          title: 'Could not load profile',
          message,
        })
      }
    }

    void loadProfile()

    return () => {
      isActive = false
    }
  }, [reloadKey, showToast])

  const initials = useMemo(
    () => (profile ? getInitials(profile) : ''),
    [profile],
  )
  const accountStatus = profileState === 'success' ? 'Active' : '-'
  const achievements = useMemo<Achievement[]>(
    () => [
      {
        id: 'profile-ready',
        label: 'Profile ready',
        unlocked: profileState === 'success',
      },
      {
        id: 'first-book-added',
        label:
          profileStats.ownedBooks !== null && profileStats.ownedBooks > 0
            ? 'First book added'
            : 'Add your first book',
        unlocked: profileStats.ownedBooks !== null && profileStats.ownedBooks > 0,
      },
      {
        id: 'exchange-ready',
        label: 'Exchange ready',
        unlocked: profileState === 'success',
      },
    ],
    [profileState, profileStats.ownedBooks],
  )
  const isSubmitting = submitState === 'submitting'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedName = name.trim()

    if (!trimmedName) {
      const message = 'Name cannot be empty.'

      setStatusMessage(message)
      setSubmitState('error')
      showToast({
        tone: 'warning',
        title: 'Name required',
        message,
      })
      return
    }

    setSubmitState('submitting')
    setStatusMessage(null)

    try {
      const updatedProfile = await updateProfile({ name: trimmedName })

      setProfile(updatedProfile)
      setName(updatedProfile.name)
      setStatusMessage('Profile updated successfully.')
      setSubmitState('success')
      showToast({
        tone: 'success',
        title: 'Profile saved',
        message: 'Your reader name was updated.',
      })
    } catch (error) {
      const message = getErrorMessage(
        error,
        'Unable to update your profile. Please try again.',
      )

      setStatusMessage(message)
      setSubmitState('error')
      showToast({
        tone: 'error',
        title: 'Could not save profile',
        message,
      })
    }
  }

  return (
    <section className="space-y-5">
      <PageHeader
        eyebrow="Account"
        title="Profile"
        description="Manage the reader identity used across owned books, held copies, and exchange actions."
      />

      {profileState === 'loading' && (
        <div
          className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]"
          role="status"
          aria-live="polite"
        >
          <span className="sr-only">Loading profile.</span>
          <div className="premium-panel p-5 sm:p-6" aria-hidden="true">
            <div className="grid gap-5 sm:grid-cols-[7rem_minmax(0,1fr)]">
              <div className="h-28 w-28 rounded-[0.75rem] border border-[var(--color-border)] bg-[var(--color-skeleton)]" />
              <div className="min-w-0">
                <div className="h-3 w-28 rounded-full bg-[var(--color-skeleton-warm)]" />
                <div className="mt-4 h-8 w-3/4 rounded-full bg-[var(--color-skeleton-strong)]" />
                <div className="mt-3 h-4 w-64 max-w-full rounded-full bg-[var(--color-skeleton)]" />
                <div className="mt-6 grid gap-3 sm:grid-cols-4">
                  <div className="h-16 rounded-lg bg-[var(--color-skeleton-soft)]" />
                  <div className="h-16 rounded-lg bg-[var(--color-skeleton-soft)]" />
                  <div className="h-16 rounded-lg bg-[var(--color-skeleton-soft)]" />
                  <div className="h-16 rounded-lg bg-[var(--color-skeleton-soft)]" />
                </div>
              </div>
            </div>
          </div>

          <div className="form-panel self-start p-5 sm:p-6" aria-hidden="true">
            <div className="h-3 w-32 rounded-full bg-[var(--color-skeleton-warm)]" />
            <div className="mt-3 h-7 w-40 rounded-full bg-[var(--color-skeleton-strong)]" />
            <div className="mt-5 h-11 rounded-[0.7rem] bg-[var(--color-skeleton-soft)]" />
            <div className="mt-3 h-11 rounded-[0.7rem] bg-[var(--color-skeleton)]" />
          </div>
        </div>
      )}

      {profileState === 'error' && (
        <div className="premium-panel border-[var(--color-status-warning-border)] p-6 sm:p-7" role="alert">
          <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-gold)]">
            Profile unavailable
          </p>
          <h2 className="mt-3 font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)]">
            Could not load profile
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
            {profileError}
          </p>
          <button
            className="primary-action mt-5"
            type="button"
            onClick={() => setReloadKey((key) => key + 1)}
          >
            Try again
          </button>
        </div>
      )}

      {profileState === 'success' && profile && (
        <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <section className="premium-panel overflow-hidden">
            <div className="grid gap-6 p-5 sm:grid-cols-[7rem_minmax(0,1fr)] sm:p-6">
              <div className="grid h-28 w-28 shrink-0 place-items-center overflow-hidden rounded-[0.75rem] border border-[var(--color-border)] bg-[var(--color-paper)] shadow-[var(--shadow-restraint)]">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={`${profile.name} avatar`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="font-[var(--font-display)] text-4xl font-semibold text-[var(--color-ink)]">
                    {initials}
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-accent)]">
                  Signed-in reader
                </p>
                <h2 className="mt-2 break-words font-[var(--font-display)] text-4xl font-semibold leading-tight text-[var(--color-ink)]">
                  {profile.name}
                </h2>
                <p
                  className="mt-2 max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm text-[var(--color-muted)]"
                  title={profile.email}
                >
                  {profile.email}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-[var(--color-status-info-border)] bg-[var(--color-status-info-bg)] px-3 py-1 text-xs font-bold text-[var(--color-status-info-text)]">
                    {profile.authority}
                  </span>
                  <span className="rounded-full border border-[var(--color-status-success-border)] bg-[var(--color-status-success-bg)] px-3 py-1 text-xs font-bold text-[var(--color-status-success-text)]">
                    {accountStatus}
                  </span>
                </div>
              </div>
            </div>

            <dl className="grid border-y border-[var(--color-border)] bg-[var(--color-table-head)] sm:grid-cols-4">
              {[
                ['Owned books', formatStatValue(profileStats.ownedBooks)],
                ['Held books', formatStatValue(profileStats.heldBooks)],
                ['Role', profile.authority],
                ['Status', accountStatus],
              ].map(([label, value]) => (
                <div key={label} className="border-[var(--color-border)] bg-[var(--color-table-row)] p-4 sm:border-r sm:last:border-r-0">
                  <dt className="text-xs font-bold tracking-[0.14em] text-[var(--color-muted)]">
                    {label}
                  </dt>
                  <dd className="mt-2 break-words font-semibold text-[var(--color-ink)]">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="p-5 sm:p-6">
              <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-forest)]">
                Achievements
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                {achievements.map((achievement) => (
                  <li
                    key={achievement.id}
                    className={`rounded-[0.65rem] border border-[var(--color-border)] bg-[var(--color-paper)] px-4 py-3 ${
                      achievement.unlocked ? '' : 'opacity-70'
                    }`}
                  >
                    <span className="block text-sm font-bold text-[var(--color-ink)]">
                      {achievement.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <form
            className="form-panel p-5 sm:p-6"
            onSubmit={handleSubmit}
            aria-busy={isSubmitting}
          >
            <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-accent)]">
              Edit identity
            </p>
            <h2 className="mt-2 font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
              Reader name
            </h2>
            <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
              This name appears across your account surfaces.
            </p>

            <label
              className="mt-5 block text-sm font-bold text-[var(--color-ink-soft)]"
              htmlFor="profile-name"
            >
              Name
              <input
                id="profile-name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value)
                  if (submitState !== 'submitting') {
                    setSubmitState('idle')
                    setStatusMessage(null)
                  }
                }}
                className="field-input mt-2"
                placeholder="Your name"
                disabled={isSubmitting}
                aria-invalid={submitState === 'error'}
                aria-describedby={
                  submitState === 'error' ? 'profile-save-message' : undefined
                }
              />
            </label>

            <button
              type="submit"
              className="primary-action mt-4 w-full disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save profile'}
            </button>

            {submitState === 'success' && statusMessage && (
              <StateMessage
                className="mt-4"
                tone="success"
                title="Profile saved"
              >
                <span id="profile-save-message">{statusMessage}</span>
              </StateMessage>
            )}

            {submitState === 'error' && statusMessage && (
              <StateMessage
                className="mt-4"
                tone="error"
                title="Could not save profile"
              >
                <span id="profile-save-message">{statusMessage}</span>
              </StateMessage>
            )}
          </form>
        </div>
      )}
    </section>
  )
}
