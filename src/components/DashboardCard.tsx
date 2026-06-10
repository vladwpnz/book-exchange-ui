import { Link } from 'react-router-dom'

import type { AccentTone } from '../types/book'

type DashboardCardProps = {
  title: string
  description: string
  href: string
  accent?: AccentTone
}

const accentClasses: Record<AccentTone, string> = {
  emerald: 'border-emerald-300/25 bg-emerald-300/10 text-emerald-100',
  amber: 'border-amber-300/25 bg-amber-300/10 text-amber-100',
  paper: 'border-slate-300/20 bg-slate-300/10 text-slate-200',
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
      className="premium-card group block rounded-2xl p-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
    >
      <div className="relative z-10">
        <span
          className={`mb-5 inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${accentClasses[accent]}`}
        >
          Explore
        </span>

        <h3 className="text-xl font-semibold text-slate-50">{title}</h3>

        <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>

        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-100 transition duration-200 group-hover:gap-3">
          Open section
          <span aria-hidden="true">-&gt;</span>
        </span>
      </div>
    </Link>
  )
}