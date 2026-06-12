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
    <article className="group rounded-xl border border-white/10 bg-white/[0.035] p-3 text-left shadow-[0_14px_38px_rgba(0,0,0,0.16)] transition duration-200 hover:border-cyan-200/25 hover:bg-white/[0.055] hover:shadow-[0_18px_46px_rgba(0,0,0,0.22)] sm:p-4">
      <div className="grid grid-cols-[3.75rem_1fr] gap-3 sm:grid-cols-[4.5rem_1fr] sm:gap-4">
        <div
          className={`relative h-24 w-15 shrink-0 overflow-hidden rounded-lg bg-linear-to-br sm:h-28 sm:w-18 ${coverClasses[book.tone]} shadow-[0_12px_28px_rgba(0,0,0,0.24)]`}
        >
          <div className="absolute inset-y-0 left-3 w-px bg-white/35" />
          <div className="absolute inset-x-3 top-4 h-px bg-white/18" />
          <div className="absolute inset-x-3 top-7 h-px bg-white/12" />
          <div className="absolute bottom-3 left-3 right-3 h-1.5 rounded-full bg-white/30" />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
                {book.genre}
              </p>
              <h3 className="mt-1 text-base font-semibold leading-6 text-slate-50 sm:text-lg">
                {book.title}
              </h3>
            </div>

            <span
              className={`shrink-0 rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] ${statusClasses[book.status]}`}
            >
              {statusLabels[book.status]}
            </span>
          </div>

          <p className="mt-1 text-sm text-slate-400">{book.author}</p>

          <p className="mt-3 text-sm text-slate-500">
            Owner:{' '}
            <span className="font-medium text-slate-300">{book.owner}</span>
          </p>

          <p className="mt-1 text-sm font-medium leading-5 text-slate-300">
            {book.note}
          </p>
        </div>
      </div>
    </article>
  )
}
