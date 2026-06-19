import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { CanvasErrorBoundary } from './CanvasErrorBoundary'
import { LandingStoryFallback } from './LandingStoryFallback'
import {
  getActiveLandingStoryStage,
  landingStoryStages,
  type LandingStoryStageId,
} from './stageConfig'
import { useAdaptiveQuality } from './useAdaptiveQuality'
import { useReducedMotion } from './useReducedMotion'
import { useScrollProgress } from './useScrollProgress'
import { useViewportLifecycle } from './useViewportLifecycle'
import './landingStory.css'

const LandingStoryCanvas = lazy(() => import('./LandingStoryCanvasEntry'))

type LandingStoryAction = {
  href: string
  label: string
}

type LandingStorySectionProps = {
  primaryAction: LandingStoryAction
  secondaryAction: LandingStoryAction
}

type LandingStoryActionsProps = LandingStorySectionProps & {
  className?: string
}

const fallbackReasonKeys = {
  'reduced-motion': 'landing.story.fallbackReasons.reducedMotion',
  webgl: 'landing.story.fallbackReasons.webgl',
  'weak-device': 'landing.story.fallbackReasons.weakDevice',
} as const

export function LandingStorySection({
  primaryAction,
  secondaryAction,
}: LandingStorySectionProps) {
  const { t } = useTranslation()
  const storyRef = useRef<HTMLElement | null>(null)
  const copyRef = useRef<HTMLDivElement | null>(null)
  const [introVisible, setIntroVisible] = useState(
    () => typeof IntersectionObserver === 'undefined',
  )
  const prefersReducedMotion = useReducedMotion()
  const quality = useAdaptiveQuality(prefersReducedMotion)
  const scrollState = useScrollProgress(storyRef, !prefersReducedMotion)
  const lifecycle = useViewportLifecycle(
    storyRef,
    quality.shouldUseCanvas && !prefersReducedMotion,
  )
  useEffect(() => {
    const copy = copyRef.current

    if (
      prefersReducedMotion ||
      !copy ||
      typeof IntersectionObserver !== 'function'
    ) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return
        }

        setIntroVisible(true)
        observer.disconnect()
      },
      {
        rootMargin: '0px 0px -18%',
        threshold: 0.24,
      },
    )

    observer.observe(copy)

    return () => observer.disconnect()
  }, [prefersReducedMotion])
  const activeStage = getActiveLandingStoryStage(scrollState.progress)
  const fallbackReason = quality.fallbackReason
    ? t(fallbackReasonKeys[quality.fallbackReason])
    : undefined
  const canvasActive = lifecycle.isVisible && quality.shouldUseCanvas
  const stageCopy = useMemo(
    () =>
      landingStoryStages.map((stage) => ({
        ...stage,
        description: t(stage.descriptionKey),
        title: t(stage.titleKey),
      })),
    [t],
  )
  const renderFallbackCopy = () => (
    <>
      <h3 className="landing-story-fallback__title">
        {t('landing.story.fallbackTitle')}
      </h3>
      <p className="landing-story-fallback__description">
        {t('landing.story.fallbackDescription')}
      </p>
    </>
  )

  if (!quality.shouldUseCanvas || prefersReducedMotion) {
    return (
      <section
        className="landing-story landing-story--static"
        aria-labelledby="landing-story-heading"
      >
        <div className="landing-story__inner landing-story__inner--static">
          <div className="landing-story__intro">
            <p className="landing-story__eyebrow">{t('landing.story.eyebrow')}</p>
            <h2 id="landing-story-heading" className="landing-story__title">
              {t('landing.story.title')}
            </h2>
            <p className="landing-story__description">
              {t('landing.story.description')}
            </p>
            <LandingStoryActions
              primaryAction={primaryAction}
              secondaryAction={secondaryAction}
            />
          </div>

          <LandingStoryFallback
            label={t('landing.story.visualLabel')}
            reason={fallbackReason}
            stages={landingStoryStages}
            translate={t}
          >
            {renderFallbackCopy()}
          </LandingStoryFallback>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={storyRef}
      className="landing-story"
      aria-labelledby="landing-story-heading"
    >
      <div className="landing-story__scroll-track">
        <div className="landing-story__sticky">
          <div
            ref={copyRef}
            className="landing-story__copy"
            data-intro-visible={
              prefersReducedMotion || introVisible ? 'true' : 'false'
            }
          >
            <p className="landing-story__eyebrow landing-story__reveal landing-story__reveal--eyebrow">
              {t('landing.story.eyebrow')}
            </p>
            <h2
              id="landing-story-heading"
              className="landing-story__title landing-story__reveal landing-story__reveal--title"
            >
              {t('landing.story.title')}
            </h2>
            <p className="landing-story__description landing-story__reveal landing-story__reveal--description">
              {t('landing.story.description')}
            </p>

            <ol
              className="landing-story__stage-list landing-story__reveal landing-story__reveal--stages"
              aria-label={t('landing.story.stagesLabel')}
            >
              {stageCopy.map((stage) => (
                <li
                  key={stage.id}
                  className="landing-story__stage-item"
                  aria-current={activeStage.id === stage.id ? 'step' : undefined}
                  data-accent={stage.accent}
                  data-active={activeStage.id === stage.id ? 'true' : 'false'}
                >
                  <span className="landing-story__stage-marker" aria-hidden="true" />
                  <span className="landing-story__stage-title">{stage.title}</span>
                  <p>{stage.description}</p>
                </li>
              ))}
            </ol>

            <LandingStoryActions
              primaryAction={primaryAction}
              secondaryAction={secondaryAction}
              className="landing-story__reveal landing-story__reveal--actions"
            />
          </div>

          <div className="landing-story__visual-shell">
            <div className="landing-story__visual">
              <CanvasErrorBoundary
                fallback={
                  <LandingStoryFallback
                    compact
                    label={t('landing.story.visualLabel')}
                    reason={t('landing.story.fallbackReasons.error')}
                    stages={landingStoryStages}
                    translate={t}
                  >
                    {renderFallbackCopy()}
                  </LandingStoryFallback>
                }
              >
                <Suspense
                  fallback={
                    <LandingStoryFallback
                      compact
                      label={t('landing.story.visualLabel')}
                      reason={t('landing.story.fallbackReasons.loading')}
                      stages={landingStoryStages}
                      translate={t}
                    >
                      {renderFallbackCopy()}
                    </LandingStoryFallback>
                  }
                >
                  {lifecycle.shouldMount ? (
                    <LandingStoryCanvas
                      activeStageId={activeStage.id as LandingStoryStageId}
                      isActive={canvasActive}
                      isFastScrolling={scrollState.isFastScrolling}
                      progress={scrollState.progress}
                      quality={quality}
                    />
                  ) : (
                    <LandingStoryFallback
                      compact
                      label={t('landing.story.visualLabel')}
                      reason={t('landing.story.fallbackReasons.notMounted')}
                      stages={landingStoryStages}
                      translate={t}
                    >
                      {renderFallbackCopy()}
                    </LandingStoryFallback>
                  )}
                </Suspense>
              </CanvasErrorBoundary>
            </div>

            <div className="landing-story__progress" aria-hidden="true">
              <span className="landing-story__progress-track">
                <span
                  className="landing-story__progress-fill"
                  style={{ transform: `scaleY(${scrollState.progress})` }}
                />
              </span>
              <span className="landing-story__progress-label">
                {t('landing.story.progressLabel')}: {t(`landing.story.stages.${activeStage.id}.title`)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <ol className="sr-only" aria-label={t('landing.story.assistiveListLabel')}>
        {stageCopy.map((stage) => (
          <li key={stage.id}>
            {stage.title}. {stage.description}
          </li>
        ))}
      </ol>
    </section>
  )
}

function LandingStoryActions({
  primaryAction,
  secondaryAction,
  className,
}: LandingStoryActionsProps) {
  return (
    <div className={['landing-story__actions', className].filter(Boolean).join(' ')}>
      <Link to={primaryAction.href} className="primary-action">
        {primaryAction.label}
      </Link>
      <Link to={secondaryAction.href} className="secondary-action">
        {secondaryAction.label}
      </Link>
    </div>
  )
}
