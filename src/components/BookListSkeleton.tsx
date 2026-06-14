type BookListSkeletonProps = {
  count?: number
  label: string
}

export function BookListSkeleton({ count = 2, label }: BookListSkeletonProps) {
  return (
    <div role="status" aria-live="polite" className="grid gap-3 xl:grid-cols-2">
      <span className="sr-only">{label}</span>
      {Array.from({ length: count }, (_, index) => (
        <div
          key={`${label}-${index}`}
          className="rounded-[0.7rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-[var(--shadow-restraint)] sm:p-4"
          aria-hidden="true"
        >
          <div className="grid gap-4 sm:grid-cols-[5rem_1fr]">
            <div className="mx-auto h-28 w-20 rounded-lg border border-[var(--color-border)] bg-[var(--color-skeleton)] sm:mx-0" />
            <div className="min-w-0">
              <div className="h-3 w-20 rounded-full bg-[var(--color-skeleton-warm)]" />
              <div className="mt-3 h-7 w-3/4 rounded-full bg-[var(--color-skeleton-strong)]" />
              <div className="mt-3 h-4 w-44 max-w-full rounded-full bg-[var(--color-skeleton-cool)]" />
              <div className="mt-5 h-4 w-full rounded-full bg-[var(--color-skeleton)]" />
              <div className="mt-2 h-4 w-4/5 rounded-full bg-[var(--color-skeleton)]" />
              <div className="mt-5 grid gap-2 sm:grid-cols-3">
                <div className="h-8 rounded-md bg-[var(--color-skeleton-soft)]" />
                <div className="h-8 rounded-md bg-[var(--color-skeleton-soft)]" />
                <div className="h-8 rounded-md bg-[var(--color-skeleton-soft)]" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
