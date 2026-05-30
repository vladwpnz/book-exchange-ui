import { NavLink, Outlet } from 'react-router-dom'

import { authPlaceholder } from '../auth/session'
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
    'block rounded-lg border p-4 transition duration-200',
    isActive
      ? 'border-emerald-300/50 bg-emerald-300/12 text-emerald-50'
      : 'border-white/10 bg-white/5 text-stone-300 hover:border-amber-200/40 hover:bg-white/8',
  ].join(' ')

export function AppLayout() {
  return (
    <div className="min-h-screen bg-[#07130f] text-stone-100">
      <Navbar appMode />
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-6 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
        <aside className="rounded-lg border border-white/10 bg-[#0d1b16] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
          <div className="border-b border-white/10 pb-4">
            <p className="text-xs font-semibold uppercase text-amber-200">
              Signed in as
            </p>
            <h2 className="mt-2 text-xl font-semibold text-stone-50">
              {authPlaceholder.currentUser}
            </h2>
            <p className="mt-1 text-sm text-stone-400">
              {authPlaceholder.authMode}
            </p>
          </div>
          <div className="mt-4 grid gap-2">
            {sideLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={sideLinkClass}>
                <span className="block text-sm font-semibold">{link.label}</span>
                <span className="mt-1 block text-xs text-stone-400">
                  {link.hint}
                </span>
              </NavLink>
            ))}
          </div>
        </aside>
        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
