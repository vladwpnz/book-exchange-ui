import type { Book } from '../types/book'

type BookCardProps = {
  book: Book
}

const coverClasses = {
  emerald: 'from-emerald-500 to-emerald-900',
  amber: 'from-amber-400 to-stone-900',
  paper: 'from-stone-300 to-stone-700',
} satisfies Record<Book['tone'], string>

const statusLabels = {
  available: 'Available',
  held: 'Held',
  shared: 'Shared',
  pending: 'Pending',
} satisfies Record<Book['status'], string>

export function BookCard({ book }: BookCardProps) {
  return (
    <article className="group flex min-h-40 gap-4 rounded-lg border border-stone-200/70 bg-[#f7efdf] p-4 text-left text-[#15211b] shadow-[0_18px_40px_rgba(0,0,0,0.16)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(0,0,0,0.24)]">
      <div
        className={`relative h-32 w-20 shrink-0 overflow-hidden rounded-md bg-linear-to-br ${coverClasses[book.tone]} shadow-inner`}
      >
        <div className="absolute inset-y-0 left-3 w-px bg-white/30" />
        <div className="absolute bottom-3 left-3 right-3 h-2 rounded-full bg-white/35" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase text-emerald-700">
              {book.genre}
            </p>
            <h3 className="mt-1 text-lg font-semibold leading-6 text-[#111c17]">
              {book.title}
            </h3>
          </div>
          <span className="shrink-0 rounded-md border border-amber-400/50 bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-900">
            {statusLabels[book.status]}
          </span>
        </div>
        <p className="mt-2 text-sm text-[#576256]">{book.author}</p>
        <p className="mt-auto pt-4 text-sm text-[#6d766b]">
          Owner: {book.owner}
        </p>
        <p className="mt-1 text-sm font-medium text-[#26362e]">{book.note}</p>
      </div>
    </article>
  )
}
