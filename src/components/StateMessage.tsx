import type { ReactNode } from 'react'

type StateTone = 'success' | 'warning' | 'error' | 'info'

type StateMessageProps = {
  children: ReactNode
  title?: string
  tone?: StateTone
  className?: string
  role?: 'status' | 'alert'
  live?: 'polite' | 'assertive'
  action?: ReactNode
}

const toneClasses = {
  success: 'border-[#bfd8c7] bg-[#eef7ed] text-[#173d2d]',
  warning: 'border-[#e5c47f] bg-[#fff3cf] text-[#513615]',
  error: 'border-[#e4b0a9] bg-[#fff1ed] text-[#74271f]',
  info: 'border-[#bfd1dc] bg-[#edf5f8] text-[#21455f]',
} satisfies Record<StateTone, string>

const markerClasses = {
  success: 'bg-[var(--color-forest)]',
  warning: 'bg-[var(--color-gold)]',
  error: 'bg-[var(--color-danger)]',
  info: 'bg-[var(--color-blue)]',
} satisfies Record<StateTone, string>

const toneLabels = {
  success: 'Success',
  warning: 'Warning',
  error: 'Error',
  info: 'Notice',
} satisfies Record<StateTone, string>

export function StateMessage({
  children,
  title,
  tone = 'info',
  className = '',
  role,
  live,
  action,
}: StateMessageProps) {
  const resolvedRole = role ?? (tone === 'error' ? 'alert' : 'status')
  const resolvedLive =
    live ?? (resolvedRole === 'alert' ? 'assertive' : 'polite')

  return (
    <div
      className={`rounded-[0.7rem] border px-4 py-3 text-sm leading-6 shadow-[var(--shadow-restraint)] ${toneClasses[tone]} ${className}`}
      role={resolvedRole}
      aria-live={resolvedLive}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 gap-3">
          <span
            className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${markerClasses[tone]}`}
            aria-hidden="true"
          />
          <div className="min-w-0">
            <p className="text-xs font-bold tracking-[0.14em] opacity-80">
              {toneLabels[tone]}
            </p>
            {title ? <p className="mt-0.5 font-bold">{title}</p> : null}
            <div className={title ? 'mt-1 opacity-[0.88]' : 'mt-1 opacity-[0.88]'}>
              {children}
            </div>
          </div>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </div>
  )
}
