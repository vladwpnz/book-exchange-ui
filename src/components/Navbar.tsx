import { Link, NavLink, useNavigate } from 'react-router-dom'

import { repositoryLinks } from '../api/links'
import { useAuth } from '../auth/useAuth'

type NavbarProps = {
  appMode?: boolean
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-lg px-3 py-2 text-sm font-medium transition duration-200',
    isActive
      ? 'border border-cyan-300/25 bg-cyan-300/10 text-cyan-50 shadow-[0_0_28px_rgba(34,211,238,0.08)]'
      : 'border border-transparent text-slate-300 hover:border-white/10 hover:bg-white/[0.05] hover:text-slate-50',
  ].join(' ')

const accountPillClass = ({ isActive }: { isActive: boolean }) =>
  [
    'block max-w-52 truncate rounded-lg border px-3 py-2 text-sm font-medium transition duration-200',
    isActive
      ? 'border-cyan-300/25 bg-cyan-300/10 text-cyan-50 shadow-[0_0_28px_rgba(34,211,238,0.08)]'
      : 'border-white/10 bg-white/[0.035] text-slate-200 hover:border-cyan-200/25 hover:bg-white/[0.06] hover:text-slate-50',
  ].join(' ')

export function Navbar({ appMode = false }: NavbarProps) {
  const navigate = useNavigate()
  const { currentUserEmail, isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/72 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group flex items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
          aria-label="Book Exchange home"
        >
          <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-cyan-300/25 bg-white/[0.04] shadow-[0_0_34px_rgba(34,211,238,0.08)]">
            <span className="absolute inset-0 bg-linear-to-br from-cyan-300/14 via-transparent to-emerald-300/12" />
            <span className="relative h-5 w-4 rounded-sm border-l-4 border-cyan-200 bg-slate-100 shadow-[0_0_18px_rgba(125,211,252,0.3)]" />
          </span>
          <span>
            <span className="block text-base font-semibold text-slate-50">
              Book Exchange
            </span>
            <span className="block text-xs text-slate-400">
              Exchange Network
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
                    className="rounded-lg border border-cyan-300/25 bg-cyan-300/8 px-3 py-2 text-sm font-semibold text-cyan-50 transition duration-200 hover:bg-cyan-300/14"
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
                    className="rounded-lg border border-cyan-300/25 bg-cyan-300/8 px-3 py-2 text-sm font-semibold text-cyan-50 transition duration-200 hover:bg-cyan-300/14"
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
                className="rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-slate-300 transition duration-200 hover:border-white/10 hover:bg-white/[0.05] hover:text-slate-50"
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
