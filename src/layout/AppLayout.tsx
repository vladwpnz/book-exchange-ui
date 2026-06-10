import { NavLink, Outlet } from 'react-router-dom'

import { useAuth } from '../auth/useAuth'
import { Navbar } from '../components/Navbar'

const sideLinks = [
  { to: '/app/my-books', label: 'My books', hint: 'Owned catalog' },
  { to: '/app/held-books', label: 'Held books', hint: 'Borrowed items' },
  { to: '/app/add-book', label: 'Add book', hint: 'Create listing' },
  { to: '/app/share-book', label: 'Share book', hint: 'Offer exchange' },
  { to: '/app/give-book', label: 'Give book', hint: 'Transfer flow' },
  { to: '/app/return-book', label: 'Return book', hint: 'Close hold' },
  { to: '/app/admin', label: 'Admin panel', hint: 'Portfolio view' },
]

const sideLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'group relative block overflow-hidden rounded-xl border p-4 transition duration-200',
    isActive
      ? 'border-cyan-300/35 bg-cyan-300/10 text-cyan-50 shadow-[0_0_36px_rgba(34,211,238,0.08)]'
      : 'border-white/10 bg-white/[0.035] text-slate-300 hover:border-cyan-200/25 hover:bg-white/[0.06]',
  ].join(' ')

export function AppLayout() {
  const { currentUserEmail } = useAuth()

  return (
    <div className="min-h-screen text-slate-100">
      <Navbar appMode />

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-6 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
        <aside className="premium-panel reveal-blur rounded-2xl p-4">
          <div className="border-b border-white/10 pb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
              Signed in as
            </p>
            <h2 className="mt-2 truncate text-xl font-semibold text-slate-50">
              {currentUserEmail}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Basic Auth session
            </p>
          </div>

          <div className="mt-4 grid gap-2">
            {sideLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={sideLinkClass}>
                <span className="relative z-10 block text-sm font-semibold">
                  {link.label}
                </span>
                <span className="relative z-10 mt-1 block text-xs text-slate-400">
                  {link.hint}
                </span>
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