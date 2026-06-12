import { useEffect, useMemo, useState, type FormEvent } from 'react'

import { getHeldBooks, getOwnedBooks } from '../api/booksApi'
import {
  getProfile,
  updateProfile,
  type UserProfile,
} from '../api/profileApi'

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
  return value === null ? '—' : String(value)
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
  const accountStatus = profileState === 'success' ? 'Active' : '—'
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
    <section className="space-y-6">
      <div className="page-hero motion-line reveal-blur p-6 sm:p-8">
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
            Account settings
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
            Profile
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400">
            Review your account details and keep your reader name current across
            the exchange network.
          </p>
        </div>
      </div>

      {profileState === 'loading' && (
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="premium-panel rounded-2xl p-6 sm:p-7">
            <div className="flex animate-pulse flex-col gap-5 sm:flex-row sm:items-center">
              <div className="h-28 w-28 rounded-3xl bg-white/8" />
              <div className="min-w-0 flex-1">
                <div className="h-3 w-28 rounded-full bg-cyan-300/15" />
                <div className="mt-4 h-8 w-3/4 rounded-full bg-white/12" />
                <div className="mt-3 h-4 w-64 max-w-full rounded-full bg-white/8" />
                <div className="mt-5 h-8 w-32 rounded-full bg-emerald-300/12" />
              </div>
            </div>
          </div>

          <div className="form-panel self-start animate-pulse p-5 sm:p-6">
            <div className="h-3 w-32 rounded-full bg-cyan-300/15" />
            <div className="mt-3 h-7 w-40 rounded-full bg-white/12" />
            <div className="mt-5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_8rem]">
              <div className="h-11 rounded-xl bg-white/8" />
              <div className="h-11 rounded-xl bg-cyan-300/12" />
            </div>
          </div>
        </div>
      )}

      {profileState === 'error' && (
        <div className="premium-panel rounded-2xl border border-amber-300/20 p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200">
            Profile unavailable
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-50">
            Could not load profile
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
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
        <div className="grid items-start gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <section className="premium-panel rounded-2xl p-6 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="grid h-28 w-28 shrink-0 place-items-center overflow-hidden rounded-3xl border border-cyan-300/25 bg-white/[0.04] shadow-[0_0_40px_rgba(34,211,238,0.08)]">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-semibold text-cyan-50">
                    {initials}
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">
                  Signed-in reader
                </p>
                <h2 className="mt-3 break-words text-3xl font-semibold tracking-tight text-slate-50">
                  {profile.name}
                </h2>
                <p
                  className="mt-2 max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm text-slate-400 sm:max-w-[28rem]"
                  title={profile.email}
                >
                  {profile.email}
                </p>
                <span className="mt-4 inline-flex max-w-full rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-50">
                  {profile.authority}
                </span>
              </div>
            </div>

            <dl className="mt-7 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.06] p-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/70">
                  Owned books
                </dt>
                <dd className="mt-3 text-3xl font-semibold tracking-tight text-slate-50">
                  {formatStatValue(profileStats.ownedBooks)}
                </dd>
              </div>
              <div className="rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.06] p-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/70">
                  Held books
                </dt>
                <dd className="mt-3 text-3xl font-semibold tracking-tight text-slate-50">
                  {formatStatValue(profileStats.heldBooks)}
                </dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Role
                </dt>
                <dd className="mt-3 break-words text-sm font-semibold text-slate-100">
                  {profile.authority}
                </dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Account status
                </dt>
                <dd className="mt-3 text-sm font-semibold text-emerald-100">
                  {accountStatus}
                </dd>
              </div>
            </dl>

            <div className="mt-5 border-t border-white/10 pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200">
                Achievements
              </p>
              <ul className="mt-4 grid gap-2">
                {achievements.map((achievement) => (
                  <li
                    key={achievement}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3"
                  >
                    <span className="min-w-0 break-words text-sm font-semibold text-slate-100">
                      {achievement}
                    </span>
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(125,211,252,0.42)]" />
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <div className="grid content-start gap-4">
            <form className="form-panel p-5 sm:p-6" onSubmit={handleSubmit}>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
                Edit profile
              </p>
              <h2 className="mt-2 text-xl font-semibold text-slate-50">
                Profile name
              </h2>
              <p className="mt-1 text-sm leading-5 text-slate-400">
                Shown across your exchange activity.
              </p>

              <div className="mt-5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                <label
                  className="block text-sm font-semibold text-slate-200"
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
                <div className="mt-4 rounded-xl border border-emerald-300/20 bg-emerald-300/8 px-3 py-3 text-sm leading-5 text-emerald-50">
                  <p className="font-semibold">Profile saved</p>
                  <p className="mt-1 text-emerald-100/80">{statusMessage}</p>
                </div>
              )}

              {submitState === 'error' && statusMessage && (
                <div className="mt-4 rounded-xl border border-amber-300/20 bg-amber-300/8 px-3 py-3 text-sm leading-5 text-amber-50">
                  <p className="font-semibold">Could not save profile</p>
                  <p className="mt-1 text-amber-100/80">{statusMessage}</p>
                </div>
              )}
            </form>

            <section className="status-panel p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">
                Account status
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-50">
                Active account
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Your saved credentials are accepted by the protected profile
                endpoint, and the account role is available for navigation.
              </p>
            </section>

            <section className="status-panel p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200">
                Avatar
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-50">
                Avatar upload coming soon
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                The profile screen is ready for avatar display, but upload
                controls are intentionally left out of this release.
              </p>
            </section>
          </div>
        </div>
      )}
    </section>
  )
}
