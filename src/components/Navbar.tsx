import { Link, NavLink, useNavigate } from 'react-router-dom'

import { repositoryLinks } from '../api/links'
import { useAuth } from '../auth/useAuth'

type NavbarProps = {
  appMode?: boolean
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-md border px-3 py-2 text-sm font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600',
    isActive
      ? 'border-blue-200 bg-blue-50 text-blue-700'
      : 'border-transparent text-zinc-700 hover:border-zinc-200 hover:bg-white hover:text-zinc-950',
  ].join(' ')

const accountPillClass = ({ isActive }: { isActive: boolean }) =>
  [
    'block max-w-52 truncate rounded-md border px-3 py-2 text-sm font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600',
    isActive
      ? 'border-blue-200 bg-blue-50 text-blue-700'
      : 'border-zinc-200 bg-white text-zinc-700 hover:border-blue-200 hover:text-zinc-950',
  ].join(' ')

export function Navbar({ appMode = false }: NavbarProps) {
  const navigate = useNavigate()
  const { currentUserEmail, isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200/80 bg-[#FAFAF7]/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-3.5 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group flex items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
          aria-label="Book Exchange home"
        >
          <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-[0_1px_2px_rgba(17,17,17,0.06)]">
            <span className="absolute inset-y-2 left-3 w-[3px] rounded-full bg-blue-600" />
            <span className="absolute left-4 top-2.5 h-6 w-5 -rotate-6 rounded-[3px] border border-zinc-300 bg-[#F1EEE8]" />
            <span className="absolute left-5 top-3 h-6 w-5 rotate-6 rounded-[3px] border border-zinc-300 bg-white" />
            <span className="absolute bottom-2 h-px w-7 bg-zinc-300" />
          </span>
          <span>
            <span className="block text-base font-bold text-zinc-950">
              Book Exchange
            </span>
            <span className="block text-xs font-medium text-zinc-500">
              Editorial exchange desk
            </span>
          </span>
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-2">
          {appMode ? (
            <>
              <NavLink to="/app/admin" className={navLinkClass}>
                Admin
              </NavLink>

              {isAuthenticated ? (
                <>
                  <NavLink to="/app/profile" className={accountPillClass}>
                    {currentUserEmail}
                  </NavLink>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-md border border-zinc-200 bg-zinc-950 px-3 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
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
                  <NavLink to="/app/profile" className={accountPillClass}>
                    {currentUserEmail}
                  </NavLink>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-md border border-zinc-200 bg-zinc-950 px-3 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
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
                className="rounded-md border border-transparent px-3 py-2 text-sm font-semibold text-zinc-700 transition duration-200 hover:border-zinc-200 hover:bg-white hover:text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
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
