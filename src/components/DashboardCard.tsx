import { Link } from 'react-router-dom'

import type { AccentTone } from '../types/book'

type DashboardCardProps = {
  title: string
  description: string
  href: string
  accent?: AccentTone
}

const accentClasses: Record<AccentTone, string> = {
  emerald: 'border-emerald-300/30 bg-emerald-300/70',
  amber: 'border-amber-300/30 bg-amber-300/70',
  paper: 'border-slate-300/25 bg-slate-300/70',
}

const labelClasses: Record<AccentTone, string> = {
  emerald: 'text-emerald-100',
  amber: 'text-amber-100',
  paper: 'text-slate-200',
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
      className="group flex h-full gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-4 text-left shadow-[0_12px_34px_rgba(0,0,0,0.16)] transition duration-200 hover:border-cyan-200/25 hover:bg-white/[0.055] hover:shadow-[0_16px_42px_rgba(0,0,0,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
    >
      <span
        className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full border ${accentClasses[accent]}`}
        aria-hidden="true"
      />

      <div className="min-w-0">
        <span
          className={`text-[0.65rem] font-semibold uppercase tracking-[0.18em] ${labelClasses[accent]}`}
        >
          Explore
        </span>

        <h3 className="mt-1 text-base font-semibold text-slate-50">{title}</h3>

        <p className="mt-1.5 text-sm leading-5 text-slate-400">
          {description}
        </p>

        <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-cyan-100 transition duration-200 group-hover:gap-3">
          Open section
          <span aria-hidden="true">-&gt;</span>
        </span>
      </div>
    </Link>
  )
}
