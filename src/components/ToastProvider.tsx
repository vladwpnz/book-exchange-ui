import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import {
  ToastContext,
  type ToastInput,
  type ToastTone,
} from './toastContext'

type Toast = ToastInput & {
  id: string
}

type ToastProviderProps = {
  children: ReactNode
}

const AUTO_DISMISS_MS = 4000

const toneClasses = {
  success: 'border-[#bfd8c7] bg-[#eef7ed] text-[#173d2d]',
  warning: 'border-[#e5c47f] bg-[#fff3cf] text-[#513615]',
  error: 'border-[#e4b0a9] bg-[#fff1ed] text-[#74271f]',
  info: 'border-[#bfd1dc] bg-[#edf5f8] text-[#21455f]',
} satisfies Record<ToastTone, string>

const markerClasses = {
  success: 'bg-[var(--color-forest)]',
  warning: 'bg-[var(--color-gold)]',
  error: 'bg-[var(--color-danger)]',
  info: 'bg-[var(--color-blue)]',
} satisfies Record<ToastTone, string>

let toastSequence = 0

function ToastItem({
  toast,
  onClose,
}: {
  toast: Toast
  onClose: (id: string) => void
}) {
  useEffect(() => {
    const timeoutId = window.setTimeout(
      () => onClose(toast.id),
      toast.durationMs ?? AUTO_DISMISS_MS,
    )

    return () => window.clearTimeout(timeoutId)
  }, [onClose, toast.durationMs, toast.id])

  const role = toast.tone === 'error' ? 'alert' : 'status'
  const live = toast.tone === 'error' ? 'assertive' : 'polite'

  return (
    <div
      className={`pointer-events-auto rounded-[0.7rem] border px-4 py-3 text-sm leading-6 shadow-[var(--shadow-lift)] ${toneClasses[toast.tone]}`}
      role={role}
      aria-live={live}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${markerClasses[toast.tone]}`}
          aria-hidden="true"
        />

        <div className="min-w-0 flex-1">
          <p className="font-bold text-current">{toast.title}</p>
          {toast.message ? (
            <div className="mt-1 text-current opacity-[0.88]">
              {toast.message}
            </div>
          ) : null}
        </div>

        <button
          type="button"
          className="ml-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-current/20 bg-white/45 text-sm font-bold text-current transition duration-200 hover:bg-white/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
          onClick={() => onClose(toast.id)}
          aria-label="Close notification"
        >
          x
        </button>
      </div>
    </div>
  )
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const closeToast = useCallback((id: string) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id),
    )
  }, [])

  const showToast = useCallback((toast: ToastInput) => {
    toastSequence += 1
    const id = `toast-${Date.now()}-${toastSequence}`

    setToasts((currentToasts) => [...currentToasts, { id, ...toast }])

    return id
  }, [])

  const value = useMemo(
    () => ({
      closeToast,
      showToast,
    }),
    [closeToast, showToast],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed right-4 top-4 z-50 grid w-[min(24rem,calc(100vw-2rem))] gap-3"
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={closeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}
