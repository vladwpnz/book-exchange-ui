import { useEffect, useState, type RefObject } from 'react'

type ViewportLifecycleState = {
  isVisible: boolean
  shouldMount: boolean
}

export function useViewportLifecycle(
  targetRef: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  const [state, setState] = useState<ViewportLifecycleState>(() => ({
    isVisible: false,
    shouldMount: false,
  }))

  useEffect(() => {
    if (!enabled) {
      if (typeof window === 'undefined') {
        return undefined
      }

      const resetFrame = window.requestAnimationFrame(() => {
        setState({
          isVisible: false,
          shouldMount: false,
        })
      })

      return () => {
        window.cancelAnimationFrame(resetFrame)
      }
    }

    if (typeof window === 'undefined') {
      return undefined
    }

    if (typeof globalThis.IntersectionObserver === 'undefined') {
      const fallbackFrame = window.requestAnimationFrame(() => {
        setState({
          isVisible: true,
          shouldMount: true,
        })
      })

      return () => {
        window.cancelAnimationFrame(fallbackFrame)
      }
    }

    const Observer = globalThis.IntersectionObserver
    const target = targetRef.current

    if (!target) {
      return undefined
    }

    const mountObserver = new Observer(
      ([entry]) => {
        setState((currentState) => ({
          ...currentState,
          shouldMount: entry.isIntersecting,
        }))
      },
      {
        rootMargin: '900px 0px',
        threshold: 0,
      },
    )
    const visibilityObserver = new Observer(
      ([entry]) => {
        setState((currentState) => ({
          ...currentState,
          isVisible: entry.isIntersecting,
        }))
      },
      {
        rootMargin: '0px',
        threshold: 0.04,
      },
    )

    mountObserver.observe(target)
    visibilityObserver.observe(target)

    return () => {
      mountObserver.disconnect()
      visibilityObserver.disconnect()
    }
  }, [enabled, targetRef])

  return state
}
