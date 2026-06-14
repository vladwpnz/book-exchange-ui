import type { ReactNode } from 'react'

import type { Book } from '../types/book'
import { BookCover } from './BookCover'

type BookCardProps = {
  book: Book
  actions?: ReactNode
  contextLabel?: string
}

const statusLabels = {
  available: 'Available',
  held: 'Held',
  shared: 'Shared',
  pending: 'Pending',
} satisfies Record<Book['status'], string>

const statusClasses = {
  available: 'border-[#bfd8c7] bg-[#eef7ed] text-[#194934]',
  held: 'border-[#bfd1dc] bg-[#edf5f8] text-[#21455f]',
  shared: 'border-[#e7c1b5] bg-[#f5ddd3] text-[#6f2f22]',
  pending: 'border-[#e5c47f] bg-[#fff3cf] text-[#704712]',
} satisfies Record<Book['status'], string>

export function BookCard({ book, actions, contextLabel }: BookCardProps) {
  return (
    <article className="group overflow-hidden rounded-[0.7rem] border border-[var(--color-border)] bg-[var(--color-surface)] text-left shadow-[var(--shadow-restraint)] transition duration-200 ease-out hover:-translate-y-0.5 hover:border-[var(--color-border-strong)] hover:bg-white hover:shadow-[var(--shadow-lift)]">
      <div className="grid gap-4 p-3 sm:grid-cols-[5rem_1fr] sm:p-4">
        <BookCover
          title={book.title}
          author={book.author}
          genre={book.genre}
          tone={book.tone}
          size="md"
          className="mx-auto sm:mx-0"
        />

        <div className="min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
            <div className="min-w-0">
              {contextLabel ? (
                <p className="text-xs font-bold tracking-[0.16em] text-[var(--color-accent)]">
                  {contextLabel}
                </p>
              ) : null}
              <h3 className="font-[var(--font-display)] text-2xl font-semibold leading-7 text-[var(--color-ink)] sm:text-3xl sm:leading-8">
                {book.title}
              </h3>
              <p className="mt-1 text-sm font-semibold text-[var(--color-blue)]">
                {book.author}
              </p>
            </div>

            <span
              className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-bold ${statusClasses[book.status]}`}
            >
              {statusLabels[book.status]}
            </span>
          </div>

          <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
            {book.note}
          </p>

          <dl className="mt-4 grid gap-2 text-sm text-[var(--color-muted)] sm:grid-cols-3">
            <div className="min-w-0">
              <dt className="font-bold text-[var(--color-ink-soft)]">Owner</dt>
              <dd className="truncate" title={book.owner}>
                {book.owner}
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="font-bold text-[var(--color-ink-soft)]">Genre</dt>
              <dd className="truncate" title={book.genre}>
                {book.genre}
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="font-bold text-[var(--color-ink-soft)]">Book ID</dt>
              <dd className="truncate" title={book.id}>
                {book.id}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {actions ? (
        <div className="flex flex-wrap gap-2 border-t border-[var(--color-border)] bg-[#fbf4ea] px-3 py-3 sm:px-4">
          {actions}
        </div>
      ) : null}
    </article>
  )
}
