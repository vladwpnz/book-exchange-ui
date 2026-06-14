import { NavLink, Outlet } from 'react-router-dom'

import { Navbar } from '../components/Navbar'

const appLinks = [
  { to: '/app/my-books', label: 'My books', hint: 'Owned shelf', mark: '01' },
  { to: '/app/held-books', label: 'Held', hint: 'Borrowed shelf', mark: '02' },
  { to: '/app/add-book', label: 'Add', hint: 'Catalog first', mark: '03' },
  { to: '/app/share-book', label: 'Share', hint: 'Collaborate', mark: '04' },
  { to: '/app/give-book', label: 'Give', hint: 'Final transfer', mark: '05' },
  { to: '/app/return-book', label: 'Return', hint: 'Close hold', mark: '06' },
  { to: '/app/profile', label: 'Profile', hint: 'Account', mark: '07' },
  { to: '/app/admin', label: 'Admin', hint: 'Operations', mark: '08' },
]

const appNavClass = ({ isActive }: { isActive: boolean }) =>
  [
    'group flex shrink-0 items-center gap-3 rounded-[0.65rem] border px-3 py-2.5 text-left transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--color-accent)] lg:w-full',
    isActive
      ? 'border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)] shadow-[var(--shadow-restraint)]'
      : 'border-transparent text-[var(--color-muted)] hover:border-[var(--color-border)] hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]',
  ].join(' ')

export function AppLayout() {
  return (
    <div className="min-h-screen text-[var(--color-ink)]">
      <Navbar appMode />

      <div className="mx-auto grid max-w-7xl items-start gap-5 px-4 py-4 sm:px-6 lg:grid-cols-[248px_minmax(0,1fr)] lg:px-8 lg:py-6">
        <aside className="reveal-blur lg:sticky lg:top-24">
          <div className="hidden rounded-[0.75rem] border border-[var(--color-border)] bg-[#f4eadc]/78 p-3 shadow-[var(--shadow-restraint)] lg:block">
            <div className="border-b border-[var(--color-border)] px-2 pb-4">
              <p className="text-xs font-bold tracking-[0.18em] text-[var(--color-accent)]">
                Workspace
              </p>
              <h2 className="mt-1.5 font-[var(--font-display)] text-2xl font-semibold leading-7 text-[var(--color-ink)]">
                Exchange shelf
              </h2>
              <p className="mt-2 text-sm leading-5 text-[var(--color-muted)]">
                Catalog, holds, transfers, returns, and operations.
              </p>
            </div>

            <nav className="mt-3 grid gap-1" aria-label="Application sections">
              {appLinks.map((link) => (
                <NavLink key={link.to} to={link.to} className={appNavClass}>
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-current/20 bg-white/55 text-xs font-bold">
                    {link.mark}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold">
                      {link.label}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-current/68">
                      {link.hint}
                    </span>
                  </span>
                </NavLink>
              ))}
            </nav>
          </div>

          <nav
            className="scrollbar-thin -mx-4 flex gap-2 overflow-x-auto border-y border-[var(--color-border)] bg-[#fffaf2]/78 px-4 py-2 sm:-mx-6 sm:px-6 lg:hidden"
            aria-label="Application sections"
          >
            {appLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={appNavClass}>
                <span className="text-xs font-bold">{link.mark}</span>
                <span className="whitespace-nowrap text-sm font-bold">
                  {link.label}
                </span>
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 reveal-blur">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
