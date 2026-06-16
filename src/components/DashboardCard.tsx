import { Link } from 'react-router-dom'

import type { AccentTone } from '../types/book'

type DashboardCardProps = {
  title: string
  description: string
  href: string
  accent?: AccentTone
}

const accentClasses: Record<AccentTone, string> = {
  emerald:
    'border-[var(--color-status-success-border)] bg-[var(--color-status-success-bg)] text-[var(--color-status-success-text)]',
  amber:
    'border-[var(--color-status-warning-border)] bg-[var(--color-status-warning-bg)] text-[var(--color-status-warning-text)]',
  paper:
    'border-[var(--color-status-paper-border)] bg-[var(--color-status-paper-bg)] text-[var(--color-status-paper-text)]',
}

export function DashboardCard({
  title,
  description,
  href,
  accent = 'emerald',
}: DashboardCardProps) {
  return (
    <Link
      to={href}
      className="group flex h-full min-h-[9.5rem] flex-col justify-between rounded-[0.7rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-left shadow-[var(--shadow-restraint)] transition duration-200 ease-out hover:-translate-y-0.5 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-card-hover)] hover:shadow-[var(--shadow-lift)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
    >
      <span
        className={`inline-flex h-9 w-9 items-center justify-center rounded-md border text-sm font-bold ${accentClasses[accent]}`}
        aria-hidden="true"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-current" />
      </span>

      <span className="mt-4 block min-w-0">
        <span className="block font-[var(--font-display)] text-2xl font-semibold leading-7 text-[var(--color-ink)]">
          {title}
        </span>
        <span className="mt-2 block text-sm leading-6 text-[var(--color-muted)]">
          {description}
        </span>
      </span>

      <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-accent)] transition duration-200 group-hover:gap-3">
        Open workflow
        <span aria-hidden="true">-&gt;</span>
      </span>
    </Link>
  )
}
