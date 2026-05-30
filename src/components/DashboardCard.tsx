import { Link } from 'react-router-dom'

import type { AccentTone } from '../types/book'

type DashboardCardProps = {
  title: string
  description: string
  href: string
  accent?: AccentTone
}

const accentClasses: Record<AccentTone, string> = {
  emerald: 'border-emerald-300/40 bg-emerald-300/10 text-emerald-100',
  amber: 'border-amber-300/50 bg-amber-300/10 text-amber-100',
  paper: 'border-stone-300/60 bg-stone-100/10 text-stone-100',
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
      className="group block rounded-lg border border-stone-200/12 bg-[#f6eddc] p-5 text-left text-[#17221d] shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition duration-200 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_22px_60px_rgba(0,0,0,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
    >
      <span
        className={`mb-4 inline-flex rounded-md border px-3 py-1 text-sm ${accentClasses[accent]}`}
      >
        Explore
      </span>
      <h3 className="text-xl font-semibold text-[#10201a]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#586357]">{description}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 transition group-hover:gap-3">
        Open section
        <span aria-hidden="true">-&gt;</span>
      </span>
    </Link>
  )
}
