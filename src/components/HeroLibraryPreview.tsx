import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { featuredBooks } from '../api/mockLibrary'
import { BookCover } from './BookCover'
import './HeroLibraryPreview.css'

type PreviewStateKey = 'add' | 'share' | 'give' | 'return'

type PreviewState = {
  key: PreviewStateKey
  activeBook: number
  href: string
  title: string
  description: string
}

function getBookPosition(index: number, activeBook: number, total: number) {
  const offset = (index - activeBook + total) % total

  if (offset === 0) {
    return 'active'
  }

  return offset === 1 ? 'next' : 'previous'
}

export function HeroLibraryPreview() {
  const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(0)
  const [manualPause, setManualPause] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const resumeTimerRef = useRef<number | undefined>(undefined)
  const stageRef = useRef<HTMLDivElement | null>(null)
  const wheelAccumulatorRef = useRef(0)
  const wheelLockRef = useRef(false)

  const books = useMemo(
    () =>
      featuredBooks.slice(0, 3).map((book) => ({
        ...book,
        genre: t(`landing.featuredBooks.${book.id}.genre`),
      })),
    [t],
  )

  const states = useMemo<PreviewState[]>(
    () => [
      {
        key: 'add',
        activeBook: 0,
        href: '/app/add-book',
        title: t('landing.workflow.items.add.title'),
        description: t('landing.workflow.items.add.description'),
      },
      {
        key: 'share',
        activeBook: 1,
        href: '/app/share-book',
        title: t('landing.workflow.items.share.title'),
        description: t('landing.workflow.items.share.description'),
      },
      {
        key: 'give',
        activeBook: 2,
        href: '/app/give-book',
        title: t('landing.workflow.items.give.title'),
        description: t('landing.workflow.items.give.description'),
      },
      {
        key: 'return',
        activeBook: 0,
        href: '/app/return-book',
        title: t('landing.workflow.items.return.title'),
        description: t('landing.workflow.items.return.description'),
      },
    ],
    [t],
  )

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined
    }

    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setPrefersReducedMotion(media.matches)

    updatePreference()
    media.addEventListener('change', updatePreference)

    return () => media.removeEventListener('change', updatePreference)
  }, [])

  const pauseAutoplayTemporarily = useCallback(() => {
    setManualPause(true)

    if (resumeTimerRef.current !== undefined) {
      window.clearTimeout(resumeTimerRef.current)
    }

    resumeTimerRef.current = window.setTimeout(() => {
      setManualPause(false)
      resumeTimerRef.current = undefined
    }, 4800)
  }, [])

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current !== undefined) {
        window.clearTimeout(resumeTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (manualPause || prefersReducedMotion) {
      return undefined
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % states.length)
    }, 4200)

    return () => window.clearInterval(interval)
  }, [manualPause, prefersReducedMotion, states.length])

  const selectState = useCallback(
    (index: number) => {
      setActiveIndex((index + states.length) % states.length)
      pauseAutoplayTemporarily()
    },
    [pauseAutoplayTemporarily, states.length],
  )

  const selectBook = useCallback(
    (bookIndex: number) => {
      const matchingState = states.findIndex(
        (state) => state.activeBook === bookIndex,
      )

      if (matchingState >= 0) {
        selectState(matchingState)
      }
    },
    [selectState, states],
  )

  useEffect(() => {
    const stage = stageRef.current

    if (!stage || prefersReducedMotion) {
      return undefined
    }

    const handleNativeWheel = (event: globalThis.WheelEvent) => {
      event.preventDefault()

      if (wheelLockRef.current) {
        return
      }

      wheelAccumulatorRef.current += event.deltaY

      if (Math.abs(wheelAccumulatorRef.current) < 58) {
        return
      }

      const direction = wheelAccumulatorRef.current > 0 ? 1 : -1

      wheelAccumulatorRef.current = 0
      wheelLockRef.current = true
      selectState(activeIndex + direction)

      window.setTimeout(() => {
        wheelLockRef.current = false
      }, 950)
    }

    stage.addEventListener('wheel', handleNativeWheel, { passive: false })

    return () => {
      stage.removeEventListener('wheel', handleNativeWheel)
      wheelAccumulatorRef.current = 0
    }
  }, [activeIndex, prefersReducedMotion, selectState])

  const activeState = states[activeIndex]

  return (
    <aside
      className="hero-library-preview"
      aria-label={t('landing.preview.ariaLabel')}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') {
          event.preventDefault()
          selectState(activeIndex + 1)
        }

        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          selectState(activeIndex - 1)
        }
      }}
    >
      <div className="hero-library-preview__ribbon" aria-hidden="true" />

      <div className="hero-library-preview__header">
        <div>
          <p className="hero-library-preview__eyebrow">
            {t('landing.preview.eyebrow')}
          </p>
          <h2 className="hero-library-preview__title">
            {t('landing.preview.title')}
          </h2>
        </div>

        <span className="hero-library-preview__badge">
          {t('landing.preview.badge')}
        </span>
      </div>

      <div
        ref={stageRef}
        className="hero-library-preview__stage"
        aria-label={t('landing.preview.ariaLabel')}
      >
        <div className="hero-library-preview__halo" />
        <div className="hero-library-preview__orbit hero-library-preview__orbit--one" />
        <div className="hero-library-preview__orbit hero-library-preview__orbit--two" />

        {books.map((book, index) => (
          <button
            key={book.id}
            type="button"
            className="hero-library-preview__book"
            aria-label={`${book.title} — ${book.author}`}
            aria-pressed={index === activeState.activeBook}
            data-position={getBookPosition(
              index,
              activeState.activeBook,
              books.length,
            )}
            onClick={() => selectBook(index)}
          >
            <BookCover
              title={book.title}
              author={book.author}
              genre={book.genre}
              tone={book.tone}
              size={index === activeState.activeBook ? 'hero' : 'lg'}
            />
          </button>
        ))}

        <div className="hero-library-preview__shelf">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="hero-library-preview__status" key={activeState.key}>
        <div>
          <p className="hero-library-preview__status-kicker">
            {activeIndex + 1}/{states.length}
          </p>
          <h3 className="hero-library-preview__status-title">
            {activeState.title}
          </h3>
          <p className="hero-library-preview__status-description">
            {activeState.description}
          </p>
        </div>

        <Link
          to={activeState.href}
          className="secondary-action hero-library-preview__status-action"
        >
          {t('common.actions.openWorkflow')}
        </Link>
      </div>

      <div
        className="hero-library-preview__controls"
        aria-label={t('landing.preview.ariaLabel')}
      >
        {states.map((state, index) => (
          <button
            key={state.key}
            type="button"
            className="hero-library-preview__control"
            aria-label={state.title}
            aria-pressed={index === activeIndex}
            data-active={index === activeIndex ? 'true' : 'false'}
            onClick={() => selectState(index)}
          >
            <span />
          </button>
        ))}
      </div>
    </aside>
  )
}
