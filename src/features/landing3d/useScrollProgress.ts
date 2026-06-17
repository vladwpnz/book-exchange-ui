import { useEffect, useRef, useState, type RefObject } from 'react'

import {
  getActiveLandingStoryStage,
  type LandingStoryStageId,
} from './stageConfig'

type ScrollProgressState = {
  activeStageId: LandingStoryStageId
  isFastScrolling: boolean
  progress: number
}

function clampProgress(value: number) {
  return Math.min(Math.max(value, 0), 1)
}

function getProgress(element: HTMLElement) {
  const rect = element.getBoundingClientRect()
  const scrollableDistance = Math.max(rect.height - window.innerHeight, 1)

  return clampProgress(-rect.top / scrollableDistance)
}

export function useScrollProgress(
  storyRef: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  const lastProgressRef = useRef(0)
  const lastTimeRef = useRef(0)
  const frameRef = useRef<number | undefined>(undefined)
  const [state, setState] = useState<ScrollProgressState>(() => ({
    activeStageId: 'add',
    isFastScrolling: false,
    progress: 0,
  }))

  useEffect(() => {
    if (!enabled) {
      if (typeof window === 'undefined') {
        return undefined
      }

      const resetFrame = window.requestAnimationFrame(() => {
        setState({
          activeStageId: 'add',
          isFastScrolling: false,
          progress: 0,
        })
      })

      return () => {
        window.cancelAnimationFrame(resetFrame)
      }
    }

    if (typeof window === 'undefined') {
      return undefined
    }

    const updateProgress = () => {
      frameRef.current = undefined

      if (!storyRef.current) {
        return
      }

      const now = window.performance.now()
      const progress = getProgress(storyRef.current)
      const timeDelta = Math.max(now - lastTimeRef.current, 16)
      const progressDelta = Math.abs(progress - lastProgressRef.current)
      const velocity = progressDelta / (timeDelta / 1000)
      const activeStage = getActiveLandingStoryStage(progress)
      const isFastScrolling = velocity > 0.82

      lastProgressRef.current = progress
      lastTimeRef.current = now

      setState((currentState) => {
        if (
          Math.abs(currentState.progress - progress) < 0.002 &&
          currentState.activeStageId === activeStage.id &&
          currentState.isFastScrolling === isFastScrolling
        ) {
          return currentState
        }

        return {
          activeStageId: activeStage.id,
          isFastScrolling,
          progress,
        }
      })
    }

    const requestProgressUpdate = () => {
      if (frameRef.current !== undefined) {
        return
      }

      frameRef.current = window.requestAnimationFrame(updateProgress)
    }

    lastTimeRef.current = window.performance.now()
    updateProgress()

    window.addEventListener('scroll', requestProgressUpdate, { passive: true })
    window.addEventListener('resize', requestProgressUpdate)

    return () => {
      if (frameRef.current !== undefined) {
        window.cancelAnimationFrame(frameRef.current)
      }

      window.removeEventListener('scroll', requestProgressUpdate)
      window.removeEventListener('resize', requestProgressUpdate)
    }
  }, [enabled, storyRef])

  return state
}
