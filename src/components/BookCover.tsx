import type { AccentTone } from '../types/book'

type BookCoverSize = 'sm' | 'md' | 'lg' | 'hero'

type BookCoverProps = {
  title: string
  author: string
  genre?: string
  tone?: AccentTone
  size?: BookCoverSize
  className?: string
}

const toneClasses = {
  emerald:
    'border-[var(--cover-emerald-border)] from-[var(--cover-emerald-from)] via-[var(--cover-emerald-via)] to-[var(--cover-emerald-to)] text-[var(--cover-emerald-text)]',
  amber:
    'border-[var(--cover-amber-border)] from-[var(--cover-amber-from)] via-[var(--cover-amber-via)] to-[var(--cover-amber-to)] text-[var(--cover-amber-text)]',
  paper:
    'border-[var(--cover-paper-border)] from-[var(--cover-paper-from)] via-[var(--cover-paper-via)] to-[var(--cover-paper-to)] text-[var(--cover-paper-text)]',
} satisfies Record<AccentTone, string>

const spineClasses = {
  emerald: 'bg-[var(--color-forest)]',
  amber: 'bg-[var(--color-gold)]',
  paper: 'bg-[var(--color-accent)]',
} satisfies Record<AccentTone, string>

const sizeClasses = {
  sm: 'h-20 w-14 rounded-md p-2',
  md: 'h-28 w-20 rounded-lg p-2.5',
  lg: 'h-40 w-28 rounded-[0.7rem] p-3',
  hero: 'h-48 w-32 rounded-[0.7rem] p-3 sm:h-56 sm:w-36 sm:p-4',
} satisfies Record<BookCoverSize, string>

const initialsClasses = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-3xl',
  hero: 'text-4xl sm:text-5xl',
} satisfies Record<BookCoverSize, string>

function getCoverInitials(title: string, author: string) {
  const titleInitial = title.trim().charAt(0)
  const authorInitial = author.trim().charAt(0)
  const initials = `${titleInitial}${authorInitial}`.trim()

  return (initials || 'BE').slice(0, 2).toUpperCase()
}

export function BookCover({
  title,
  author,
  genre = '',
  tone = 'paper',
  size = 'md',
  className = '',
}: BookCoverProps) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden border bg-linear-to-br shadow-[var(--cover-shadow)] ${toneClasses[tone]} ${sizeClasses[size]} ${className}`}
      aria-hidden="true"
    >
      <span
        className={`absolute inset-y-0 left-0 w-2.5 ${spineClasses[tone]}`}
      />
      <span className="absolute left-4 right-3 top-4 h-px bg-current/28" />
      <span className="absolute left-4 right-6 top-7 h-px bg-current/18" />
      <span className="absolute bottom-3 left-4 right-3 h-1 rounded-full bg-current/20" />

      <div className="relative z-10 flex h-full flex-col justify-between pl-2">
        <span className="max-w-full truncate text-[0.58rem] font-bold tracking-[0.16em] text-current/70">
          {genre}
        </span>
        <span
          className={`font-[var(--font-display)] font-semibold leading-none ${initialsClasses[size]}`}
        >
          {getCoverInitials(title, author)}
        </span>
        <span className="line-clamp-2 text-[0.58rem] font-semibold leading-tight text-current/78">
          {title}
        </span>
      </div>
    </div>
  )
}
