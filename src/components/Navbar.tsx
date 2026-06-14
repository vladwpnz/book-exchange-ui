import { Link, NavLink, useNavigate } from 'react-router-dom'

import { useAuth } from '../auth/useAuth'
import { useTheme } from '../theme/useTheme'
import { BrandMark } from './BrandMark'

type NavbarProps = {
  appMode?: boolean
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-md border px-3 py-2 text-sm font-bold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]',
    isActive
      ? 'border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)]'
      : 'border-transparent text-[var(--color-muted)] hover:border-[var(--color-border)] hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]',
  ].join(' ')

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const nextThemeName = isDark ? 'Light theme' : 'Nocturne Archive'

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextThemeName}`}
      aria-pressed={isDark}
      title={`Switch to ${nextThemeName}`}
    >
      <span className="theme-toggle__icon" aria-hidden="true" />
      <span className="hidden sm:inline">
        {isDark ? 'Nocturne Archive' : 'Light theme'}
      </span>
    </button>
  )
}

export function Navbar({ appMode = false }: NavbarProps) {
  const navigate = useNavigate()
  const { currentUserEmail, isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-[var(--color-nav)] backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
          aria-label="Book Exchange home"
        >
          <BrandMark label={appMode ? 'Exchange workspace' : 'Reader network'} />
        </Link>

        <div className="flex min-w-0 items-center justify-end gap-2">
          {appMode ? (
            <>
              <NavLink to="/app/admin" className={navLinkClass}>
                Admin
              </NavLink>

              {isAuthenticated ? (
                <>
                  <NavLink
                    to="/app/profile"
                    className={({ isActive }) =>
                      [
                        'hidden max-w-48 rounded-md border px-3 py-2 text-left text-sm font-bold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)] sm:block',
                        isActive
                          ? 'border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)]'
                          : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)] hover:border-[var(--color-border-strong)]',
                      ].join(' ')
                    }
                  >
                    <span className="block leading-4">Account</span>
                    <span className="block truncate text-xs font-semibold text-[var(--color-muted)]">
                      {currentUserEmail}
                    </span>
                  </NavLink>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="secondary-action min-h-0 px-3 py-2 text-sm"
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
                    Open app
                  </NavLink>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="secondary-action min-h-0 px-3 py-2 text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className={navLinkClass}>
                    Login
                  </NavLink>
                  <NavLink to="/register" className="primary-action min-h-0 px-3 py-2 text-sm">
                    Register
                  </NavLink>
                </>
              )}
            </>
          )}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
