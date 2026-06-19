import { useEffect, useState } from 'react'

export type LandingStoryQualityLevel = 'high' | 'medium' | 'low' | 'fallback'

export type LandingStoryQuality = {
  antialias: boolean
  dustCount: number
  dpr: [number, number]
  enablePointerTilt: boolean
  fallbackReason: 'reduced-motion' | 'webgl' | 'weak-device' | null
  level: LandingStoryQualityLevel
  lineWidth: number
  shadow: boolean
  shouldUseCanvas: boolean
}

type ConnectionLike = {
  saveData?: boolean
}

function getConnection() {
  if (typeof navigator === 'undefined') {
    return undefined
  }

  return (navigator as Navigator & { connection?: ConnectionLike }).connection
}

function canUseWebGL() {
  if (typeof document === 'undefined') {
    return false
  }

  try {
    const canvas = document.createElement('canvas')

    return Boolean(
      canvas.getContext('webgl2') || canvas.getContext('webgl'),
    )
  } catch {
    return false
  }
}

function getAdaptiveQuality(prefersReducedMotion: boolean): LandingStoryQuality {
  const nav =
    typeof navigator !== 'undefined'
      ? (navigator as Navigator & { deviceMemory?: number })
      : undefined
  const hasWebGL = canUseWebGL()
  const deviceMemory =
    nav && typeof nav.deviceMemory === 'number'
      ? nav.deviceMemory
      : undefined
  const hardwareConcurrency =
    nav ? nav.hardwareConcurrency : undefined
  const connection = getConnection()
  const viewportWidth =
    typeof window !== 'undefined' ? window.innerWidth : undefined
  const devicePixelRatio =
    typeof window !== 'undefined' ? window.devicePixelRatio : 1
  const coarsePointer =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(pointer: coarse)').matches
  const finePointer =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const narrowPointerViewport =
    viewportWidth !== undefined && viewportWidth < 900

  if (prefersReducedMotion) {
    return {
      antialias: false,
      dustCount: 0,
      dpr: [1, 1],
      enablePointerTilt: false,
      fallbackReason: 'reduced-motion',
      level: 'fallback',
      lineWidth: 1,
      shadow: false,
      shouldUseCanvas: false,
    }
  }

  if (!hasWebGL) {
    return {
      antialias: false,
      dustCount: 0,
      dpr: [1, 1],
      enablePointerTilt: false,
      fallbackReason: 'webgl',
      level: 'fallback',
      lineWidth: 1,
      shadow: false,
      shouldUseCanvas: false,
    }
  }

  const weakSignals = [
    deviceMemory !== undefined && deviceMemory <= 2,
    hardwareConcurrency !== undefined && hardwareConcurrency <= 4,
    Boolean(connection?.saveData),
    viewportWidth !== undefined && viewportWidth < 390,
    coarsePointer,
    devicePixelRatio >= 2.75,
  ].filter(Boolean).length
  const veryWeakDevice =
    Boolean(connection?.saveData) ||
    (deviceMemory !== undefined &&
      deviceMemory <= 2 &&
      hardwareConcurrency !== undefined &&
      hardwareConcurrency <= 4)

  if (veryWeakDevice) {
    return {
      antialias: false,
      dustCount: 0,
      dpr: [1, 1],
      enablePointerTilt: false,
      fallbackReason: 'weak-device',
      level: 'fallback',
      lineWidth: 1,
      shadow: false,
      shouldUseCanvas: false,
    }
  }

  if (weakSignals >= 3) {
    return {
      antialias: false,
      dustCount: 18,
      dpr: [1, 1.15],
      enablePointerTilt: false,
      fallbackReason: null,
      level: 'low',
      lineWidth: 1,
      shadow: false,
      shouldUseCanvas: true,
    }
  }

  if (weakSignals >= 1) {
    return {
      antialias: true,
      dustCount: 36,
      dpr: [1, 1.35],
      enablePointerTilt: finePointer && !narrowPointerViewport,
      fallbackReason: null,
      level: 'medium',
      lineWidth: 1.4,
      shadow: true,
      shouldUseCanvas: true,
    }
  }

  return {
    antialias: true,
    dustCount: 68,
    dpr: [1, 1.6],
    enablePointerTilt: finePointer && !narrowPointerViewport,
    fallbackReason: null,
    level: 'high',
    lineWidth: 1.8,
    shadow: true,
    shouldUseCanvas: true,
  }
}

export function useAdaptiveQuality(prefersReducedMotion: boolean) {
  const [quality, setQuality] = useState(() =>
    getAdaptiveQuality(prefersReducedMotion),
  )

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const updateQuality = () => {
      setQuality(getAdaptiveQuality(prefersReducedMotion))
    }

    updateQuality()
    window.addEventListener('resize', updateQuality)

    return () => {
      window.removeEventListener('resize', updateQuality)
    }
  }, [prefersReducedMotion])

  return quality
}
