import { useCallback, useEffect, useRef, useState } from 'react'

export const AUTH_EXIT_TRANSITION_MS = 500

const desktopAuthShellQuery = '(min-width: 1024px)'
const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

export function shouldSkipAuthLayoutTransition() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false
  }

  return (
    window.matchMedia(reducedMotionQuery).matches ||
    !window.matchMedia(desktopAuthShellQuery).matches
  )
}

export function useAuthExitTransition() {
  const [isExiting, setIsExiting] = useState(false)
  const exitTimerRef = useRef<number | undefined>(undefined)
  const hasNavigatedRef = useRef(false)
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false

      if (exitTimerRef.current !== undefined) {
        window.clearTimeout(exitTimerRef.current)
      }
    }
  }, [])

  const startExitTransition = useCallback((navigateAfterExit: () => void) => {
    if (hasNavigatedRef.current) {
      return
    }

    hasNavigatedRef.current = true

    if (shouldSkipAuthLayoutTransition()) {
      navigateAfterExit()
      return
    }

    setIsExiting(true)
    exitTimerRef.current = window.setTimeout(() => {
      if (isMountedRef.current) {
        navigateAfterExit()
      }
    }, AUTH_EXIT_TRANSITION_MS)
  }, [])

  return { isExiting, startExitTransition }
}
