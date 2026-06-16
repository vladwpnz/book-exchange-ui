import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import { Navbar } from '../components/Navbar'
import { AppRouteTransition } from './AppRouteTransition'

const appLinks = [
  {
    to: '/app/my-books',
    labelKey: 'appSidebar.navigation.myBooks.label',
    hintKey: 'appSidebar.navigation.myBooks.hint',
  },
  {
    to: '/app/held-books',
    labelKey: 'appSidebar.navigation.held.label',
    hintKey: 'appSidebar.navigation.held.hint',
  },
  {
    to: '/app/add-book',
    labelKey: 'appSidebar.navigation.add.label',
    hintKey: 'appSidebar.navigation.add.hint',
  },
  {
    to: '/app/share-book',
    labelKey: 'appSidebar.navigation.share.label',
    hintKey: 'appSidebar.navigation.share.hint',
  },
  {
    to: '/app/give-book',
    labelKey: 'appSidebar.navigation.give.label',
    hintKey: 'appSidebar.navigation.give.hint',
  },
  {
    to: '/app/return-book',
    labelKey: 'appSidebar.navigation.return.label',
    hintKey: 'appSidebar.navigation.return.hint',
  },
  {
    to: '/app/profile',
    labelKey: 'appSidebar.settings.account.label',
    hintKey: 'appSidebar.settings.account.hint',
  },
  {
    to: '/app/settings',
    labelKey: 'appSidebar.settings.label',
    hintKey: 'appSidebar.settings.hint',
  },
] as const

const appNavClass = ({ isActive }: { isActive: boolean }) =>
  [
    'group flex shrink-0 items-center gap-3 rounded-[0.65rem] border px-3 py-2.5 text-left transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--color-accent)] lg:w-full',
    isActive
      ? 'border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)] shadow-[var(--shadow-restraint)]'
      : 'border-transparent text-[var(--color-muted)] hover:border-[var(--color-border)] hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]',
  ].join(' ')

export function AppLayout() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen text-[var(--color-ink)]">
      <Navbar appMode />

      <div className="mx-auto grid max-w-7xl items-start gap-5 px-4 py-4 sm:px-6 lg:grid-cols-[248px_minmax(0,1fr)] lg:px-8 lg:py-6">
        <aside className="reveal-blur lg:sticky lg:top-24">
          <div className="hidden rounded-[0.75rem] border border-[var(--color-border)] bg-[var(--color-sidebar)] p-3 shadow-[var(--shadow-restraint)] lg:block">
            <div className="border-b border-[var(--color-border)] px-2 pb-4">
              <p className="text-xs font-bold tracking-[0.18em] text-[var(--color-accent)]">
                {t('appSidebar.eyebrow')}
              </p>
              <h2 className="mt-1.5 font-[var(--font-display)] text-2xl font-semibold leading-7 text-[var(--color-ink)]">
                {t('appSidebar.heading')}
              </h2>
              <p className="mt-2 text-sm leading-5 text-[var(--color-muted)]">
                {t('appSidebar.description')}
              </p>
            </div>

            <nav
              className="mt-3 grid gap-1"
              aria-label={t('appSidebar.navigationLabel')}
            >
              {appLinks.map((link) => (
                <NavLink key={link.to} to={link.to} className={appNavClass}>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold">
                      {t(link.labelKey)}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-current/68">
                      {t(link.hintKey)}
                    </span>
                  </span>
                </NavLink>
              ))}
            </nav>
          </div>

          <nav
            className="scrollbar-thin -mx-4 flex gap-2 overflow-x-auto border-y border-[var(--color-border)] bg-[var(--color-mobile-nav)] px-4 py-2 sm:-mx-6 sm:px-6 lg:hidden"
            aria-label={t('appSidebar.navigationLabel')}
          >
            {appLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={appNavClass}>
                <span className="whitespace-nowrap text-sm font-bold">
                  {t(link.labelKey)}
                </span>
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="min-w-0">
          <AppRouteTransition />
        </main>
      </div>
    </div>
  )
}
