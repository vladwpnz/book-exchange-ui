import { Link } from 'react-router-dom'

import type { AccentTone } from '../types/book'

type DashboardCardProps = {
  title: string
  description: string
  href: string
  accent?: AccentTone
  index?: number
}

const accentClasses: Record<AccentTone, string> = {
  emerald: 'border-[#b9d7c5] bg-[#eef7ed] text-[#194934]',
  amber: 'border-[#e3bf9a] bg-[#fff3cf] text-[#704712]',
  paper: 'border-[#d5c4b1] bg-[#fffaf2] text-[#6f2f22]',
}

export function DashboardCard({
  title,
  description,
  href,
  accent = 'emerald',
  index = 1,
}: DashboardCardProps) {
  return (
    <Link
      to={href}
      className="group flex h-full min-h-[9.5rem] flex-col justify-between rounded-[0.7rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-left shadow-[var(--shadow-restraint)] transition duration-200 ease-out hover:-translate-y-0.5 hover:border-[var(--color-border-strong)] hover:bg-white hover:shadow-[var(--shadow-lift)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
    >
      <span
        className={`inline-flex h-9 w-9 items-center justify-center rounded-md border text-sm font-bold ${accentClasses[accent]}`}
        aria-hidden="true"
      >
        {String(index).padStart(2, '0')}
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
