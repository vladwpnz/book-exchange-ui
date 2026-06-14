import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { BrandMark } from './BrandMark'
import { BookCover } from './BookCover'

type AuthShellProps = {
  children: ReactNode
  title: string
  description: string
}

export function AuthShell({ children, title, description }: AuthShellProps) {
  return (
    <div className="min-h-screen text-[var(--color-ink)]">
      <main className="grid min-h-screen lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.9fr)]">
        <section className="flex min-w-0 items-center justify-center px-4 py-8 sm:px-6">
          <div className="w-full max-w-md">
            <Link
              className="secondary-action mb-4 min-h-0 px-3 py-2 text-sm"
              to="/"
              aria-label="Back to Book Exchange home"
            >
              Back to home
            </Link>

            <div className="form-panel motion-line reveal-blur p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <BrandMark size="lg" />
                <div>
                  <p className="text-sm font-bold text-[var(--color-ink)]">
                    Book Exchange
                  </p>
                  <p className="text-xs font-bold tracking-[0.16em] text-[var(--color-accent)]">
                    Reader access
                  </p>
                </div>
              </div>

              <h1 className="mt-8 font-[var(--font-display)] text-4xl font-semibold leading-tight text-[var(--color-ink)]">
                {title}
              </h1>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                {description}
              </p>

              {children}
            </div>
          </div>
        </section>

        <aside className="relative hidden overflow-hidden border-l border-[var(--color-border)] bg-[#fffaf2] p-8 lg:block">
          <div className="brand-ribbon absolute inset-x-0 top-0 h-1" />
          <div className="flex h-full flex-col justify-between">
            <div>
              <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-accent)]">
                Exchange desk
              </p>
              <h2 className="mt-4 max-w-md font-[var(--font-display)] text-5xl font-semibold leading-tight text-[var(--color-ink)]">
                Sign in to manage books, holds, and handoffs.
              </h2>
            </div>

            <div className="mt-10 flex items-end justify-center gap-4">
              <BookCover
                title="Owned Shelf"
                author="Book Exchange"
                genre="Catalog"
                tone="emerald"
                size="hero"
                className="rotate-[-6deg]"
              />
              <BookCover
                title="Shared Copy"
                author="Reader"
                genre="Exchange"
                tone="amber"
                size="lg"
                className="translate-y-6 rotate-[5deg]"
              />
            </div>

            <p className="max-w-md text-sm leading-6 text-[var(--color-muted)]">
              Sign in once to keep your shelves, holds, and exchanges connected
              to your reader account.
            </p>
          </div>
        </aside>
      </main>
    </div>
  )
}
