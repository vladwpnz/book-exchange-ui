import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'

const APP_ROUTE_TRANSITION_MS = 900
const routeMotionQuery =
  '(min-width: 1024px) and (prefers-reduced-motion: no-preference)'

function getRouteMotionEnabled() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia(routeMotionQuery).matches
  )
}

function useRouteMotionEnabled() {
  const [isEnabled, setIsEnabled] = useState(getRouteMotionEnabled)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined
    }

    const mediaQuery = window.matchMedia(routeMotionQuery)
    const updateMotionPreference = () => {
      setIsEnabled(mediaQuery.matches)
    }

    updateMotionPreference()
    mediaQuery.addEventListener('change', updateMotionPreference)

    return () => {
      mediaQuery.removeEventListener('change', updateMotionPreference)
    }
  }, [])

  return isEnabled
}

export function AppRouteTransition() {
  const location = useLocation()
  const outlet = useOutlet()
  const routeKey = `${location.pathname}${location.search}`
  const isMotionEnabled = useRouteMotionEnabled()
  const completionTimerRef = useRef<number | undefined>(undefined)
  const transitionIdRef = useRef(0)
  const lastRouteKeyRef = useRef(routeKey)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    return () => {
      if (completionTimerRef.current !== undefined) {
        window.clearTimeout(completionTimerRef.current)
      }
    }
  }, [])

  useLayoutEffect(() => {
    const hasRouteChanged = lastRouteKeyRef.current !== routeKey
    lastRouteKeyRef.current = routeKey

    if (completionTimerRef.current !== undefined) {
      window.clearTimeout(completionTimerRef.current)
      completionTimerRef.current = undefined
    }

    if (!hasRouteChanged || !isMotionEnabled) {
      setIsAnimating(false)
      return
    }

    const transitionId = transitionIdRef.current + 1
    transitionIdRef.current = transitionId

    setIsAnimating(true)

    completionTimerRef.current = window.setTimeout(() => {
      if (transitionIdRef.current !== transitionId) {
        return
      }

      setIsAnimating(false)
      completionTimerRef.current = undefined
    }, APP_ROUTE_TRANSITION_MS)
  }, [isMotionEnabled, routeKey])

  return (
    <div
      className={[
        'app-route-transition',
        isAnimating ? 'app-route-transition--animating' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        key={routeKey}
        className={[
          'app-route-transition__page',
          isAnimating ? 'app-route-transition__page--entering' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {outlet}
      </div>
    </div>
  )
}
