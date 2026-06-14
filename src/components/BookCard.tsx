import type { Book } from '../types/book'

type BookCardProps = {
  book: Book
}

const coverClasses = {
  emerald: 'border-green-200 from-[#F0FDF4] via-[#FFFFFF] to-[#D9F5E3]',
  amber: 'border-amber-200 from-[#FFFBEB] via-[#FFFFFF] to-[#F7E7C0]',
  paper: 'border-zinc-200 from-[#FAFAF7] via-[#FFFFFF] to-[#E7E5E4]',
} satisfies Record<Book['tone'], string>

const spineClasses = {
  emerald: 'bg-green-700',
  amber: 'bg-amber-700',
  paper: 'bg-zinc-700',
} satisfies Record<Book['tone'], string>

const statusLabels = {
  available: 'Available',
  held: 'Held',
  shared: 'Shared',
  pending: 'Pending',
} satisfies Record<Book['status'], string>

const statusClasses = {
  available: 'border-green-200 bg-green-50 text-green-800',
  held: 'border-blue-200 bg-blue-50 text-blue-800',
  shared: 'border-violet-200 bg-violet-50 text-violet-800',
  pending: 'border-amber-200 bg-amber-50 text-amber-800',
} satisfies Record<Book['status'], string>

export function BookCard({ book }: BookCardProps) {
  return (
    <article className="group rounded-xl border border-zinc-200 bg-white p-3 text-left shadow-[0_1px_2px_rgba(17,17,17,0.04)] transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_14px_28px_rgba(17,17,17,0.07)] sm:p-4">
      <div className="grid grid-cols-[3.75rem_1fr] gap-3 sm:grid-cols-[4.5rem_1fr] sm:gap-4">
        <div
          className={`relative h-24 w-15 shrink-0 overflow-hidden rounded-lg border bg-linear-to-br shadow-[inset_0_0_0_1px_rgba(255,255,255,0.78),0_8px_18px_rgba(17,17,17,0.08)] sm:h-28 sm:w-18 ${coverClasses[book.tone]}`}
          aria-hidden="true"
        >
          <div
            className={`absolute inset-y-0 left-0 w-2 ${spineClasses[book.tone]}`}
          />
          <div className="absolute left-4 right-3 top-4 h-px bg-zinc-300/80" />
          <div className="absolute left-4 right-5 top-7 h-px bg-zinc-200" />
          <div className="absolute bottom-3 left-4 right-3 h-1.5 rounded-full bg-zinc-300/80" />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
                {book.genre}
              </p>
              <h3 className="mt-1 font-[var(--font-display)] text-xl font-semibold leading-6 text-zinc-950 sm:text-2xl">
                {book.title}
              </h3>
            </div>

            <span
              className={`shrink-0 rounded-full border px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] ${statusClasses[book.status]}`}
            >
              {statusLabels[book.status]}
            </span>
          </div>

          <p className="mt-1 text-sm font-medium text-zinc-600">{book.author}</p>

          <p className="mt-3 text-sm text-zinc-500">
            Owner:{' '}
            <span className="font-semibold text-zinc-800">{book.owner}</span>
          </p>

          <p className="mt-1 text-sm font-medium leading-5 text-zinc-700">
            {book.note}
          </p>
        </div>
      </div>
    </article>
  )
}
