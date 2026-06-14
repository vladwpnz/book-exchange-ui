type BrandMarkProps = {
  size?: 'sm' | 'md' | 'lg'
  label?: string
}

const sizeClasses = {
  sm: 'h-10 w-10 rounded-lg',
  md: 'h-12 w-12 rounded-[0.7rem]',
  lg: 'h-14 w-14 rounded-[0.7rem]',
} as const

export function BrandMark({ size = 'md', label }: BrandMarkProps) {
  const mark = (
    <span
      className={`relative grid shrink-0 place-items-center overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-restraint)] ${sizeClasses[size]}`}
      aria-hidden={label ? undefined : true}
    >
      <span className="absolute inset-y-2 left-3 w-[3px] rounded-full bg-[var(--color-accent)]" />
      <span className="absolute left-4 top-2.5 h-7 w-5 -rotate-6 rounded-[3px] border border-[var(--brand-page-border)] bg-[var(--brand-page-bg)]" />
      <span className="absolute left-5 top-3.5 h-7 w-5 rotate-6 rounded-[3px] border border-[var(--brand-page-border)] bg-[var(--brand-page-bg-strong)]" />
      <span className="absolute bottom-2.5 h-px w-7 bg-[var(--brand-page-border)]" />
    </span>
  )

  if (!label) {
    return mark
  }

  return (
    <span className="inline-flex items-center gap-3">
      {mark}
      <span className="min-w-0">
        <span className="block text-base font-bold text-[var(--color-ink)]">
          Book Exchange
        </span>
        <span className="hidden text-xs font-semibold text-[var(--color-muted)] sm:block">
          {label}
        </span>
      </span>
    </span>
  )
}
