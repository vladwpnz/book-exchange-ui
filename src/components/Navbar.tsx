import { useRef, type MouseEvent } from 'react'
import { flushSync } from 'react-dom'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import { useAuth } from '../auth/useAuth'
import { useTheme } from '../theme/useTheme'
import type { Theme } from '../theme/themeContextValue'
import { BrandMark } from './BrandMark'

type NavbarProps = {
  appMode?: boolean
}

type ViewTransitionHandle = {
  ready: Promise<void>
  finished: Promise<void>
}

type ViewTransitionDocument = Document & {
  startViewTransition?: (
    updateCallback: () => void | Promise<void>,
  ) => ViewTransitionHandle
}

const THEME_TRANSITION_DURATION_MS = 1600

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-md border px-3 py-2 text-sm font-bold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]',
    isActive
      ? 'border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)]'
      : 'border-transparent text-[var(--color-muted)] hover:border-[var(--color-border)] hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]',
  ].join(' ')

function prefersReducedMotion() {
  return (
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function getThemeRevealRadius(centerX: number, centerY: number) {
  const farthestX = Math.max(centerX, window.innerWidth - centerX)
  const farthestY = Math.max(centerY, window.innerHeight - centerY)

  return Math.ceil(Math.hypot(farthestX, farthestY))
}

function animateThemeReveal(centerX: number, centerY: number, radius: number) {
  if (typeof document.documentElement.animate !== 'function') {
    return
  }

  const animationOptions = {
    duration: THEME_TRANSITION_DURATION_MS,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    pseudoElement: '::view-transition-new(root)',
  } satisfies KeyframeAnimationOptions & { pseudoElement: string }

  document.documentElement.animate(
    {
      clipPath: [
        `circle(0px at ${centerX}px ${centerY}px)`,
        `circle(${radius}px at ${centerX}px ${centerY}px)`,
      ],
    },
    animationOptions,
  )
}

function SunIcon() {
  return (
    <svg
      className="theme-toggle__icon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg
      className="theme-toggle__icon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 7 7 0 1 0 20.5 14.5Z" />
    </svg>
  )
}

function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const isThemeTransitioningRef = useRef(false)
  const isDark = theme === 'dark'
  const nextTheme: Theme = isDark ? 'light' : 'dark'
  const themeSwitchLabel = `Switch to ${nextTheme} theme`

  const handleThemeToggle = (event: MouseEvent<HTMLButtonElement>) => {
    if (isThemeTransitioningRef.current) {
      return
    }

    const transitionDocument = document as ViewTransitionDocument

    if (!transitionDocument.startViewTransition || prefersReducedMotion()) {
      setTheme(nextTheme)
      return
    }

    const buttonRect = event.currentTarget.getBoundingClientRect()
    const centerX = buttonRect.left + buttonRect.width / 2
    const centerY = buttonRect.top + buttonRect.height / 2
    const revealRadius = getThemeRevealRadius(centerX, centerY)

    isThemeTransitioningRef.current = true

    const transition = transitionDocument.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme)
      })
    })

    transition.ready
      .then(() => {
        animateThemeReveal(centerX, centerY, revealRadius)
      })
      .catch(() => undefined)

    transition.finished
      .catch(() => undefined)
      .finally(() => {
        isThemeTransitioningRef.current = false
      })
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={handleThemeToggle}
      aria-label={themeSwitchLabel}
      aria-pressed={isDark}
      title={themeSwitchLabel}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
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
