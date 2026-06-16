import type { ReactNode } from 'react'

type PageHeaderProps = {
  eyebrow: string
  title: string
  description: string
  action?: ReactNode
  meta?: ReactNode
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
  meta,
}: PageHeaderProps) {
  return (
    <header className="app-page-header page-hero motion-line p-5 sm:p-6">
      <div className="relative z-10 grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="app-page-header__copy min-w-0">
          <p className="app-page-header__eyebrow text-xs font-bold tracking-[0.18em] text-[var(--color-accent)]">
            {eyebrow}
          </p>
          <h1 className="app-page-header__title mt-2 max-w-3xl break-words font-[var(--font-display)] text-4xl font-semibold leading-[1.02] text-[var(--color-ink)] sm:text-5xl">
            {title}
          </h1>
          <p className="app-page-header__description mt-3 max-w-2xl text-sm leading-6 text-[var(--color-muted)] sm:text-base sm:leading-7">
            {description}
          </p>
        </div>

        {(action || meta) && (
          <div className="app-page-header__aside flex flex-col items-start gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-end">
            {meta}
            {action}
          </div>
        )}
      </div>
    </header>
  )
}
