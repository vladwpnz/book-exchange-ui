import { NavLink, Outlet } from 'react-router-dom'

import { Navbar } from '../components/Navbar'

const sideLinks = [
  { to: '/app/my-books', label: 'My books', hint: 'Owned catalog' },
  { to: '/app/profile', label: 'Profile', hint: 'Account settings' },
  { to: '/app/held-books', label: 'Held books', hint: 'Borrowed items' },
  { to: '/app/add-book', label: 'Add book', hint: 'Create listing' },
  { to: '/app/share-book', label: 'Share book', hint: 'Offer exchange' },
  { to: '/app/give-book', label: 'Give book', hint: 'Transfer flow' },
  { to: '/app/return-book', label: 'Return book', hint: 'Close hold' },
]

const sideLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'group relative flex min-h-[2.75rem] items-center justify-center gap-2 rounded-lg border px-2.5 py-2 text-center transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-blue-600 lg:justify-between lg:gap-3 lg:px-3 lg:py-2.5 lg:text-left',
    isActive
      ? 'active border-blue-200 bg-blue-50 text-blue-700'
      : 'border-transparent text-zinc-700 hover:border-zinc-200 hover:bg-white hover:text-zinc-950',
  ].join(' ')

export function AppLayout() {
  return (
    <div className="min-h-screen text-zinc-950">
      <Navbar appMode />

      <div className="mx-auto grid max-w-7xl items-start gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
        <aside className="reveal-blur rounded-xl border border-zinc-200 bg-[#F1EEE8] p-2 shadow-[0_1px_2px_rgba(17,17,17,0.04)] sm:p-3 lg:sticky lg:top-24">
          <div className="border-b border-zinc-200 px-1 pb-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
              Workspace
            </p>
            <h2 className="mt-1.5 font-[var(--font-display)] text-xl font-semibold leading-6 text-zinc-950">
              Exchange desk
            </h2>
            <p className="mt-1 hidden text-xs leading-5 text-zinc-600 lg:block">
              Catalog, exchange, transfer, and return flows
            </p>
          </div>

          <nav
            className="mt-3 grid grid-cols-2 gap-1 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-1"
            aria-label="Application sections"
          >
            {sideLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={sideLinkClass}>
                <span className="min-w-0">
                  <span className="block truncate text-[0.82rem] font-bold sm:text-sm">
                    {link.label}
                  </span>
                  <span className="mt-0.5 hidden truncate text-xs text-zinc-500 group-hover:text-zinc-600 lg:block">
                    {link.hint}
                  </span>
                </span>
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-transparent transition duration-200 group-[.active]:bg-blue-600"
                  aria-hidden="true"
                />
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
