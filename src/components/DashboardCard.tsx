import { Link } from 'react-router-dom'

import type { AccentTone } from '../types/book'

type DashboardCardProps = {
  title: string
  description: string
  href: string
  accent?: AccentTone
}

const accentClasses: Record<AccentTone, string> = {
  emerald: 'border-green-200 bg-green-700',
  amber: 'border-amber-200 bg-amber-600',
  paper: 'border-zinc-200 bg-zinc-700',
}

const labelClasses: Record<AccentTone, string> = {
  emerald: 'text-green-700',
  amber: 'text-amber-700',
  paper: 'text-zinc-700',
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
      className="group flex h-full min-h-[10rem] gap-3 rounded-xl border border-zinc-200 bg-white p-4 text-left shadow-[0_1px_2px_rgba(17,17,17,0.04)] transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-[#fffefa] hover:shadow-[0_14px_28px_rgba(17,17,17,0.07)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
    >
      <span
        className={`mt-1.5 h-3 w-3 shrink-0 rounded-full border ${accentClasses[accent]}`}
        aria-hidden="true"
      />

      <div className="min-w-0">
        <span
          className={`text-[0.65rem] font-bold uppercase tracking-[0.18em] ${labelClasses[accent]}`}
        >
          Desk action
        </span>

        <h3 className="mt-2 font-[var(--font-display)] text-2xl font-semibold leading-7 text-zinc-950">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-zinc-600">
          {description}
        </p>

        <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-700 transition duration-200 group-hover:gap-3">
          Open section
          <span aria-hidden="true">-&gt;</span>
        </span>
      </div>
    </Link>
  )
}
