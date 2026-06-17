import type { ReactNode } from 'react'

import type { LandingStoryStage } from './stageConfig'

type LandingStoryFallbackProps = {
  children?: ReactNode
  compact?: boolean
  label: string
  reason?: string
  stages: readonly LandingStoryStage[]
  translate: (key: string) => string
}

export function LandingStoryFallback({
  children,
  compact = false,
  label,
  reason,
  stages,
  translate,
}: LandingStoryFallbackProps) {
  return (
    <div
      className={[
        'landing-story-fallback',
        compact ? 'landing-story-fallback--compact' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={label}
    >
      <div className="landing-story-fallback__visual" aria-hidden="true">
        <div className="landing-story-fallback__catalog" />
        <div className="landing-story-fallback__anchor landing-story-fallback__anchor--a" />
        <div className="landing-story-fallback__anchor landing-story-fallback__anchor--b" />
        <div className="landing-story-fallback__path" />
        <div className="landing-story-fallback__book">
          <div className="landing-story-fallback__spine" />
          <div className="landing-story-fallback__pages" />
          <div className="landing-story-fallback__cover" />
          <div className="landing-story-fallback__bookmark" />
        </div>
      </div>

      <div className="landing-story-fallback__content">
        {reason ? (
          <p className="landing-story-fallback__reason">{reason}</p>
        ) : null}
        {children}
        <ol className="landing-story-fallback__list">
          {stages.map((stage) => (
            <li key={stage.id} data-accent={stage.accent}>
              <span>{translate(stage.titleKey)}</span>
              <p>{translate(stage.descriptionKey)}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
