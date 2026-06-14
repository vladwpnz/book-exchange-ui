import { useEffect, useMemo, useState, type FormEvent } from 'react'

import { getHeldBooks, getOwnedBooks } from '../api/booksApi'
import {
  getProfile,
  updateProfile,
  type UserProfile,
} from '../api/profileApi'
import { StateMessage } from '../components/StateMessage'

type ProfileState = 'loading' | 'success' | 'error'
type SubmitState = 'idle' | 'submitting' | 'success' | 'error'
type ProfileStats = {
  ownedBooks: number | null
  heldBooks: number | null
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

        setProfile(null)
        setProfileStats({
          ownedBooks: null,
          heldBooks: null,
        })
        setName('')
        setProfileError(
          getErrorMessage(error, 'Unable to load your profile. Please try again.'),
        )
        setProfileState('error')
      }
    }

    void loadProfile()

    return () => {
      isActive = false
    }
  }, [reloadKey])

  const initials = useMemo(
    () => (profile ? getInitials(profile) : ''),
    [profile],
  )
  const accountStatus = profileState === 'success' ? 'Active' : '-'
  const achievements = [
    'Profile ready',
    profileStats.ownedBooks !== null && profileStats.ownedBooks > 0
      ? 'First book added'
      : 'Add your first book',
    'Exchange ready',
  ]
  const isSubmitting = submitState === 'submitting'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedName = name.trim()

    if (!trimmedName) {
      setStatusMessage('Name cannot be empty.')
      setSubmitState('error')
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
    } catch (error) {
      setStatusMessage(
        getErrorMessage(error, 'Unable to update your profile. Please try again.'),
      )
      setSubmitState('error')
    }
  }

  return (
    <section className="space-y-5">
      <div className="page-hero motion-line reveal-blur p-5 sm:p-6">
        <div className="relative z-10">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">
            Account settings
          </p>
          <h1 className="mt-2 font-[var(--font-display)] text-4xl font-semibold leading-tight text-zinc-950 sm:text-5xl">
            Profile
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
            Review your account details and keep your reader name current across
            the exchange network.
          </p>
        </div>
      </div>

      {profileState === 'loading' && (
        <div
          className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]"
          role="status"
          aria-live="polite"
        >
          <span className="sr-only">Loading profile.</span>
          <div className="premium-panel p-5 sm:p-6" aria-hidden="true">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="h-24 w-24 rounded-xl border border-zinc-200 bg-[#F1EEE8]" />
              <div className="min-w-0 flex-1">
                <div className="h-3 w-28 rounded-full bg-blue-100" />
                <div className="mt-4 h-7 w-3/4 rounded-full bg-zinc-200" />
                <div className="mt-3 h-4 w-64 max-w-full rounded-full bg-zinc-100" />
                <div className="mt-5 h-8 w-32 rounded-full bg-green-100" />
              </div>
            </div>
          </div>

          <div className="form-panel self-start p-5 sm:p-6" aria-hidden="true">
            <div className="h-3 w-32 rounded-full bg-blue-100" />
            <div className="mt-3 h-7 w-40 rounded-full bg-zinc-200" />
            <div className="mt-5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_8rem]">
              <div className="h-11 rounded-xl bg-zinc-100" />
              <div className="h-11 rounded-xl bg-blue-100" />
            </div>
          </div>
        </div>
      )}

      {profileState === 'error' && (
        <div className="premium-panel border-amber-200 p-6 sm:p-7" role="alert">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">
            Profile unavailable
          </p>
          <h2 className="mt-3 font-[var(--font-display)] text-3xl font-semibold text-zinc-950">
            Could not load profile
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
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
          <section className="premium-panel p-5 sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-xl border border-zinc-200 bg-[#F1EEE8] shadow-[0_1px_2px_rgba(17,17,17,0.06)]">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={`${profile.name} avatar`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="font-[var(--font-display)] text-3xl font-semibold text-zinc-950">
                    {initials}
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">
                  Signed-in reader
                </p>
                <h2 className="mt-2 break-words font-[var(--font-display)] text-3xl font-semibold text-zinc-950">
                  {profile.name}
                </h2>
                <p
                  className="mt-2 max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm text-zinc-600 sm:max-w-[28rem]"
                  title={profile.email}
                >
                  {profile.email}
                </p>
                <span className="mt-4 inline-flex max-w-full rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-blue-800">
                  {profile.authority}
                </span>
              </div>
            </div>

            <dl className="mt-6 grid overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200 sm:grid-cols-2">
              {[
                ['Owned books', formatStatValue(profileStats.ownedBooks)],
                ['Held books', formatStatValue(profileStats.heldBooks)],
                ['Role', profile.authority],
                ['Account status', accountStatus],
              ].map(([label, value]) => (
                <div key={label} className="bg-white p-4">
                  <dt className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
                    {label}
                  </dt>
                  <dd className="mt-3 break-words font-semibold text-zinc-950">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 border-t border-zinc-200 pt-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">
                Achievements
              </p>
              <ul className="mt-4 grid gap-2">
                {achievements.map((achievement) => (
                  <li
                    key={achievement}
                    className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3"
                  >
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full bg-green-700"
                      aria-hidden="true"
                    />
                    <span className="min-w-0 break-words text-sm font-semibold text-zinc-800">
                      {achievement}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <div className="grid content-start gap-5">
            <form
              className="form-panel p-5 sm:p-6"
              onSubmit={handleSubmit}
              aria-busy={isSubmitting}
            >
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">
                Edit profile
              </p>
              <h2 className="mt-2 font-[var(--font-display)] text-2xl font-semibold text-zinc-950">
                Profile name
              </h2>
              <p className="mt-1 text-sm leading-5 text-zinc-600">
                Shown across your exchange activity.
              </p>

              <div className="mt-5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                <label
                  className="block text-sm font-bold text-zinc-800"
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
                      submitState === 'error'
                        ? 'profile-save-message'
                        : undefined
                    }
                  />
                </label>

                <button
                  type="submit"
                  className="primary-action w-full whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-60 lg:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
                </button>
              </div>

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

            <section className="status-panel p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-green-700">
                Account status
              </p>
              <h2 className="mt-3 font-[var(--font-display)] text-2xl font-semibold text-zinc-950">
                Active account
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                Your saved credentials are accepted by the protected profile
                endpoint, and the account role is available for navigation.
              </p>
            </section>

            <section className="status-panel p-5 sm:p-6" aria-disabled="true">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">
                Avatar
              </p>
              <h2 className="mt-3 font-[var(--font-display)] text-2xl font-semibold text-zinc-950">
                Avatar upload unavailable
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                The screen displays an avatar when the API provides one. Upload
                controls are intentionally not part of this release.
              </p>
            </section>
          </div>
        </div>
      )}
    </section>
  )
}
