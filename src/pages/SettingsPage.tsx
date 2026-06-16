import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import { getProfile, type UserProfile } from '../api/profileApi'
import { useAuth } from '../auth/useAuth'
import { LanguageSelector } from '../components/LanguageSelector'
import { PageHeader } from '../components/PageHeader'
import { StateMessage } from '../components/StateMessage'
import { useToast } from '../components/toastContext'

type ProfileState = 'loading' | 'success' | 'error'

function hasAdminAccess(profile: UserProfile | null) {
  return profile?.authority.toLowerCase().includes('admin') ?? false
}

export function SettingsPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { currentUserEmail, logout } = useAuth()
  const { showToast } = useToast()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [profileState, setProfileState] = useState<ProfileState>('loading')
  const [profileError, setProfileError] = useState<string | null>(null)

  useEffect(() => {
    let isActive = true

    async function loadProfile() {
      setProfileState('loading')
      setProfileError(null)

      try {
        const loadedProfile = await getProfile()

        if (!isActive) {
          return
        }

        setProfile(loadedProfile)
        setProfileState('success')
      } catch (error) {
        if (!isActive) {
          return
        }

        const message =
          error instanceof Error
            ? error.message
            : t('settings.errors.loadProfile')

        setProfile(null)
        setProfileError(message)
        setProfileState('error')
        showToast({
          tone: 'error',
          title: t('settings.toasts.profileLoadError.title'),
          message,
        })
      }
    }

    void loadProfile()

    return () => {
      isActive = false
    }
  }, [showToast, t])

  const handleLogout = () => {
    logout()
    navigate('/')
  }
  const canOpenAdmin = hasAdminAccess(profile)

  return (
    <section className="space-y-5">
      <PageHeader
        eyebrow={t('settings.header.eyebrow')}
        title={t('settings.header.title')}
        description={t('settings.header.description')}
      />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <section className="premium-panel p-5 sm:p-6">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-accent)]">
                  {t('settings.signedInAs.label')}
                </p>
                <p
                  className="mt-2 truncate text-base font-semibold text-[var(--color-ink)]"
                  title={currentUserEmail ?? undefined}
                >
                  {currentUserEmail}
                </p>
              </div>

              {profileState === 'loading' ? (
                <div
                  className="min-w-36"
                  role="status"
                  aria-live="polite"
                >
                  <span className="sr-only">{t('settings.loadingProfile')}</span>
                  <div className="h-2.5 w-32 rounded-full bg-[var(--color-skeleton-warm)]" />
                  <div className="mt-2 h-2.5 w-24 rounded-full bg-[var(--color-skeleton)]" />
                </div>
              ) : null}
            </div>

            {profileState === 'error' && profileError ? (
              <StateMessage
                tone="warning"
                title={t('settings.errors.profileStatusTitle')}
              >
                {profileError}
              </StateMessage>
            ) : null}

            {canOpenAdmin ? (
              <div className="border-t border-[var(--color-border)] pt-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-accent)]">
                      {t('settings.admin.title')}
                    </p>
                    <h2 className="mt-1 font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
                      {t('settings.admin.subtitle')}
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
                      {t('settings.admin.description')}
                    </p>
                  </div>
                  <Link className="secondary-action shrink-0" to="/app/admin">
                    {t('settings.admin.open')}
                  </Link>
                </div>
              </div>
            ) : null}

            <div className="border-t border-[var(--color-border)] pt-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-accent)]">
                    {t('settings.language.title')}
                  </p>
                  <h2 className="mt-1 font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
                    {t('appSidebar.settings.hint')}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
                    {t('settings.language.description')}
                  </p>
                </div>
                <div className="shrink-0">
                  <LanguageSelector />
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside className="form-panel self-start p-5 sm:p-6">
          <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-danger)]">
            {t('settings.logout.title')}
          </p>
          <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
            {t('settings.logout.description')}
          </p>
          <button
            type="button"
            className="danger-action mt-5"
            onClick={handleLogout}
          >
            {t('settings.logout.action')}
          </button>
        </aside>
      </div>
    </section>
  )
}
