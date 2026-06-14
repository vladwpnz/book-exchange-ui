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
          className="rounded-xl border border-zinc-200 bg-white p-3 shadow-[0_1px_2px_rgba(17,17,17,0.04)] sm:p-4"
          aria-hidden="true"
        >
          <div className="grid grid-cols-[3.75rem_1fr] gap-3 sm:grid-cols-[4.5rem_1fr] sm:gap-4">
            <div className="h-24 w-15 rounded-lg border border-zinc-200 bg-[#F1EEE8] sm:h-28 sm:w-18" />
            <div className="flex flex-1 flex-col">
              <div className="h-3 w-24 rounded-full bg-blue-100" />
              <div className="mt-3 h-5 w-3/4 rounded-full bg-zinc-200" />
              <div className="mt-2 h-4 w-40 rounded-full bg-zinc-100" />
              <div className="mt-4 h-4 w-32 rounded-full bg-zinc-100" />
              <div className="mt-2 h-4 w-52 max-w-full rounded-full bg-green-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
