import { Link, NavLink, useNavigate } from 'react-router-dom'

import { repositoryLinks } from '../api/links'
import { useAuth } from '../auth/useAuth'

type NavbarProps = {
  appMode?: boolean
}

const appLinks = [
  { to: '/app/my-books', label: 'My books' },
  { to: '/app/held-books', label: 'Held books' },
  { to: '/app/add-book', label: 'Add' },
  { to: '/app/share-book', label: 'Share' },
  { to: '/app/give-book', label: 'Give' },
  { to: '/app/return-book', label: 'Return' },
  { to: '/app/admin', label: 'Admin' },
]

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-md px-3 py-2 text-sm font-medium transition hover:bg-white/8 hover:text-amber-100',
    isActive ? 'bg-emerald-400/12 text-emerald-100' : 'text-stone-300',
  ].join(' ')

export function Navbar({ appMode = false }: NavbarProps) {
  const navigate = useNavigate()
  const { currentUserEmail, isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#07130f]/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group flex items-center gap-3 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
          aria-label="Book Exchange home"
        >
          <span className="grid h-10 w-10 place-items-center rounded-md border border-emerald-300/40 bg-emerald-300/10">
            <span className="h-5 w-4 rounded-sm border-l-4 border-amber-200 bg-[#f6eddc]" />
          </span>
          <span>
            <span className="block text-base font-semibold text-stone-50">
              Book Exchange
            </span>
            <span className="block text-xs text-stone-400">Dark Library UI</span>
          </span>
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-2">
          {appMode ? (
            <>
              {appLinks.map((link) => (
                <NavLink key={link.to} to={link.to} className={navLinkClass}>
                  {link.label}
                </NavLink>
              ))}
              {isAuthenticated ? (
                <>
                  <span className="rounded-md border border-white/10 px-3 py-2 text-sm font-medium text-amber-100">
                    {currentUserEmail}
                  </span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-md border border-amber-200/40 px-3 py-2 text-sm font-semibold text-amber-100 transition hover:bg-amber-200/10"
                  >
                    Logout
                  </button>
                </>
              ) : null}
            </>
          ) : (
            <>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
              {isAuthenticated ? (
                <>
                  <NavLink to="/app/my-books" className={navLinkClass}>
                    My books
                  </NavLink>
                  <span className="rounded-md border border-white/10 px-3 py-2 text-sm font-medium text-amber-100">
                    {currentUserEmail}
                  </span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-md border border-amber-200/40 px-3 py-2 text-sm font-semibold text-amber-100 transition hover:bg-amber-200/10"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className={navLinkClass}>
                    Login
                  </NavLink>
                  <NavLink to="/register" className={navLinkClass}>
                    Register
                  </NavLink>
                </>
              )}
              <a
                href={repositoryLinks.backend}
                target="_blank"
                rel="noreferrer"
                className="rounded-md px-3 py-2 text-sm font-medium text-stone-300 transition hover:bg-white/8 hover:text-amber-100"
              >
                Backend
              </a>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
