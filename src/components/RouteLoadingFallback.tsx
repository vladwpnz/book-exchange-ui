type RouteLoadingFallbackProps = {
  fullPage?: boolean
  label?: string
}

export function RouteLoadingFallback({
  fullPage = false,
  label = 'Loading Book Exchange',
}: RouteLoadingFallbackProps) {
  return (
    <div
      className={[
        'grid w-full place-items-center px-4 py-8 text-[var(--color-ink)] sm:px-6',
        fullPage ? 'min-h-screen' : 'min-h-[18rem]',
      ].join(' ')}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">{label}</span>

      <div
        className="w-full max-w-3xl rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-panel-bg)] p-5 shadow-[var(--shadow-restraint)] sm:p-6"
        aria-hidden="true"
      >
        <div className="h-2 w-28 rounded-full bg-[var(--color-skeleton-warm)]" />
        <div className="mt-5 h-8 w-3/4 max-w-lg rounded-full bg-[var(--color-skeleton-strong)]" />
        <div className="mt-4 grid gap-2">
          <div className="h-3 rounded-full bg-[var(--color-skeleton)]" />
          <div className="h-3 w-11/12 rounded-full bg-[var(--color-skeleton)]" />
          <div className="h-3 w-2/3 rounded-full bg-[var(--color-skeleton-cool)]" />
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="h-20 rounded-[var(--radius-md)] bg-[var(--color-skeleton-soft)]" />
          <div className="h-20 rounded-[var(--radius-md)] bg-[var(--color-skeleton-soft)]" />
          <div className="h-20 rounded-[var(--radius-md)] bg-[var(--color-skeleton-soft)]" />
        </div>
      </div>
    </div>
  )
}
