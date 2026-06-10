import type { Book } from '../types/book'

type BookCardProps = {
  book: Book
}

const coverClasses = {
  emerald: 'from-emerald-300/80 via-emerald-500/55 to-cyan-950',
  amber: 'from-amber-200/80 via-amber-500/50 to-slate-950',
  paper: 'from-slate-200/70 via-slate-500/35 to-slate-950',
} satisfies Record<Book['tone'], string>

const statusLabels = {
  available: 'Available',
  held: 'Held',
  shared: 'Shared',
  pending: 'Pending',
} satisfies Record<Book['status'], string>

const statusClasses = {
  available: 'border-emerald-300/25 bg-emerald-300/[0.08] text-emerald-100',
  held: 'border-cyan-300/25 bg-cyan-300/[0.08] text-cyan-100',
  shared: 'border-violet-300/25 bg-violet-300/[0.08] text-violet-100',
  pending: 'border-amber-300/25 bg-amber-300/[0.08] text-amber-100',
} satisfies Record<Book['status'], string>

export function BookCard({ book }: BookCardProps) {
  return (
    <article className="premium-card group flex min-h-44 gap-4 rounded-2xl p-4 text-left">
      <div
        className={`relative z-10 h-34 w-22 shrink-0 overflow-hidden rounded-xl bg-linear-to-br ${coverClasses[book.tone]} shadow-[0_18px_45px_rgba(0,0,0,0.32)]`}
      >
        <div className="absolute inset-y-0 left-3 w-px bg-white/35" />
        <div className="absolute inset-x-3 top-4 h-px bg-white/18" />
        <div className="absolute inset-x-3 top-7 h-px bg-white/12" />
        <div className="absolute bottom-4 left-3 right-3 h-2 rounded-full bg-white/30" />
      </div>

      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
              {book.genre}
            </p>
            <h3 className="mt-2 text-lg font-semibold leading-6 text-slate-50">
              {book.title}
            </h3>
          </div>

          <span
            className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${statusClasses[book.status]}`}
          >
            {statusLabels[book.status]}
          </span>
        </div>

        <p className="mt-2 text-sm text-slate-400">{book.author}</p>

        <p className="mt-auto pt-4 text-sm text-slate-500">
          Owner:{' '}
          <span className="font-medium text-slate-300">{book.owner}</span>
        </p>

        <p className="mt-1 text-sm font-medium text-slate-300">{book.note}</p>
      </div>
    </article>
  )
}