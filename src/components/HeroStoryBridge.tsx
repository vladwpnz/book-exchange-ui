import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react'

import './HeroStoryBridge.css'

type BridgeParticle = {
  id: number
  kind: 'dust' | 'glyph'
  glyph?: string
  x: number
  y: number
  size: number
  delay: number
  duration: number
  driftX: number
  driftY: number
  rotation: number
  opacity: number
}

type BridgeParticleStyle = CSSProperties & {
  '--bridge-x': string
  '--bridge-y': string
  '--bridge-size': string
  '--bridge-delay': string
  '--bridge-duration': string
  '--bridge-drift-x': string
  '--bridge-drift-y': string
  '--bridge-rotation': string
  '--bridge-opacity': number
}

const glyphs = ['A', 'M', 'S', 'R', 'a', 'e', 'm', 'r', '·', ',', ';', '“', '”', '—', ':', '¶']

function createParticles(): BridgeParticle[] {
  return Array.from({ length: 54 }, (_, index) => {
    const kind = index % 5 < 2 ? 'glyph' : 'dust'
    const wave = Math.sin(index * 2.17)
    const sweep = Math.cos(index * 1.41)

    return {
      id: index,
      kind,
      glyph: kind === 'glyph' ? glyphs[index % glyphs.length] : undefined,
      x: 5 + ((index * 37) % 90),
      y: 7 + ((index * 29) % 86),
      size: kind === 'glyph' ? 15 + (index % 6) * 2 : 2 + (index % 4),
      delay: -((index * 0.31) % 8),
      duration: 7.2 + (index % 7) * 0.82,
      driftX: wave * (kind === 'glyph' ? 46 : 28),
      driftY: -14 - ((index * 9) % 28) + sweep * 12,
      rotation: wave * 34,
      opacity:
        kind === 'glyph'
          ? 0.24 + (index % 4) * 0.05
          : 0.28 + (index % 5) * 0.06,
    }
  })
}

export function HeroStoryBridge() {
  const bridgeRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(
    () => typeof IntersectionObserver === 'undefined',
  )
  const particles = useMemo(() => createParticles(), [])

  useEffect(() => {
    const bridge = bridgeRef.current

    if (!bridge || typeof window === 'undefined') {
      return undefined
    }

    if (typeof IntersectionObserver !== 'function') {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        rootMargin: '18% 0px 18%',
        threshold: 0.02,
      },
    )

    observer.observe(bridge)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const bridge = bridgeRef.current

    if (!bridge || typeof window === 'undefined') {
      return undefined
    }

    let frame = 0

    const updateProgress = () => {
      frame = 0

      const rect = bridge.getBoundingClientRect()
      const viewportHeight = Math.max(window.innerHeight, 1)
      const progress = Math.min(
        Math.max((viewportHeight - rect.top) / (viewportHeight + rect.height), 0),
        1,
      )

      bridge.style.setProperty(
        '--bridge-scroll-shift',
        `${(progress - 0.5) * 54}px`,
      )
      bridge.style.setProperty(
        '--bridge-wash-shift',
        `${(progress - 0.5) * 18}px`,
      )
      bridge.style.setProperty(
        '--bridge-glow-x',
        `${58 + progress * 10}%`,
      )
    }

    const requestUpdate = () => {
      if (frame !== 0) {
        return
      }

      frame = window.requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame)
      }

      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [])

  return (
    <div
      ref={bridgeRef}
      className="hero-story-bridge"
      data-visible={isVisible ? 'true' : 'false'}
      aria-hidden="true"
    >
      <div className="hero-story-bridge__wash" />
      <div className="hero-story-bridge__thread hero-story-bridge__thread--one" />
      <div className="hero-story-bridge__thread hero-story-bridge__thread--two" />

      <div className="hero-story-bridge__particles">
        {particles.map((particle) => {
          const style: BridgeParticleStyle = {
            '--bridge-x': `${particle.x}%`,
            '--bridge-y': `${particle.y}%`,
            '--bridge-size': `${particle.size}px`,
            '--bridge-delay': `${particle.delay}s`,
            '--bridge-duration': `${particle.duration}s`,
            '--bridge-drift-x': `${particle.driftX}px`,
            '--bridge-drift-y': `${particle.driftY}px`,
            '--bridge-rotation': `${particle.rotation}deg`,
            '--bridge-opacity': particle.opacity,
          }

          return (
            <span
              key={particle.id}
              className="hero-story-bridge__particle"
              data-kind={particle.kind}
              style={style}
            >
              <span>{particle.glyph}</span>
            </span>
          )
        })}
      </div>
    </div>
  )
}
