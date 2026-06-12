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
    'group relative flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5 transition duration-200',
    isActive
      ? 'active border-cyan-300/25 bg-cyan-300/[0.07] text-cyan-50'
      : 'border-transparent text-slate-300 hover:border-white/10 hover:bg-white/[0.045] hover:text-slate-100',
  ].join(' ')

export function AppLayout() {
  return (
    <div className="min-h-screen text-slate-100">
      <Navbar appMode />

      <div className="mx-auto grid max-w-7xl items-start gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[244px_1fr] lg:px-8">
        <aside className="reveal-blur rounded-2xl border border-white/10 bg-slate-950/25 p-3 backdrop-blur">
          <div className="border-b border-white/10 px-1 pb-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
              Workspace
            </p>
            <h2 className="mt-1.5 text-base font-semibold text-slate-50">
              Library dashboard
            </h2>
            <p className="mt-1 text-xs leading-5 text-slate-400">
              Catalog, exchange, and return flows
            </p>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-1">
            {sideLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={sideLinkClass}>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">
                    {link.label}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-slate-500 group-hover:text-slate-400">
                    {link.hint}
                  </span>
                </span>
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-200/0 transition duration-200 group-[.active]:bg-cyan-200/80"
                  aria-hidden="true"
                />
              </NavLink>
            ))}
          </div>
        </aside>

        <main className="min-w-0 reveal-blur">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
