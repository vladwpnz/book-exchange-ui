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
  success: 'border-green-200 bg-green-50 text-green-900',
  warning: 'border-amber-200 bg-amber-50 text-amber-950',
  error: 'border-red-200 bg-red-50 text-red-950',
  info: 'border-blue-200 bg-blue-50 text-blue-950',
} satisfies Record<StateTone, string>

const markerClasses = {
  success: 'bg-green-700',
  warning: 'bg-amber-600',
  error: 'bg-red-700',
  info: 'bg-blue-700',
} satisfies Record<StateTone, string>

const titleClasses = {
  success: 'text-green-950',
  warning: 'text-amber-950',
  error: 'text-red-950',
  info: 'text-blue-950',
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
      className={`rounded-xl border px-4 py-3 text-sm leading-6 shadow-[0_1px_2px_rgba(17,17,17,0.04)] ${toneClasses[tone]} ${className}`}
      role={resolvedRole}
      aria-live={resolvedLive}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 gap-3">
          <span
            className={`mt-2 h-2 w-2 shrink-0 rounded-full ${markerClasses[tone]}`}
            aria-hidden="true"
          />
          <div className="min-w-0">
            {title ? (
              <p className={`font-bold ${titleClasses[tone]}`}>{title}</p>
            ) : null}
            <div className={title ? 'mt-1 opacity-[0.86]' : 'opacity-[0.86]'}>
              {children}
            </div>
          </div>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </div>
  )
}
