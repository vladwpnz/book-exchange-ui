import { createContext, useContext, type ReactNode } from 'react'

export type ToastTone = 'success' | 'error' | 'warning' | 'info'

export type ToastInput = {
  tone: ToastTone
  title: string
  message?: ReactNode
  durationMs?: number
}

export type ToastContextValue = {
  showToast: (toast: ToastInput) => string
  closeToast: (id: string) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within ToastProvider.')
  }

  return context
}
