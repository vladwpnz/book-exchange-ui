export type LandingStoryStageId = 'add' | 'share' | 'give' | 'return'

export type LandingStoryStage = {
  id: LandingStoryStageId
  progress: {
    start: number
    end: number
  }
  accent: 'copper' | 'forest' | 'gold' | 'blue'
  titleKey: string
  descriptionKey: string
}

export const landingStoryStages = [
  {
    id: 'add',
    progress: {
      start: 0,
      end: 0.24,
    },
    accent: 'copper',
    titleKey: 'landing.story.stages.add.title',
    descriptionKey: 'landing.story.stages.add.description',
  },
  {
    id: 'share',
    progress: {
      start: 0.24,
      end: 0.5,
    },
    accent: 'forest',
    titleKey: 'landing.story.stages.share.title',
    descriptionKey: 'landing.story.stages.share.description',
  },
  {
    id: 'give',
    progress: {
      start: 0.5,
      end: 0.74,
    },
    accent: 'gold',
    titleKey: 'landing.story.stages.give.title',
    descriptionKey: 'landing.story.stages.give.description',
  },
  {
    id: 'return',
    progress: {
      start: 0.74,
      end: 1,
    },
    accent: 'blue',
    titleKey: 'landing.story.stages.return.title',
    descriptionKey: 'landing.story.stages.return.description',
  },
] as const satisfies readonly LandingStoryStage[]

export const landingStoryProgressMap = Object.fromEntries(
  landingStoryStages.map((stage) => [stage.id, stage.progress]),
) as Record<LandingStoryStageId, LandingStoryStage['progress']>

export const landingStoryScene = {
  book: {
    width: 2.42,
    height: 3.34,
    paperThickness: 0.2,
    coverThickness: 0.075,
  },
  anchors: {
    ownerA: [-1.78, -0.1, -1.72],
    ownerB: [1.78, -0.1, -1.72],
  },
  camera: {
    desktop: [0.1, 2.15, 6],
    mobile: [0.05, 2.45, 6.7],
  },
} as const

export function getActiveLandingStoryStage(progress: number) {
  return (
    landingStoryStages.find(
      (stage) =>
        progress >= stage.progress.start && progress < stage.progress.end,
    ) ?? landingStoryStages[landingStoryStages.length - 1]
  )
}

export function getStageLocalProgress(
  progress: number,
  stage: LandingStoryStage,
) {
  const stageLength = stage.progress.end - stage.progress.start

  if (stageLength <= 0) {
    return 0
  }

  return Math.min(
    Math.max((progress - stage.progress.start) / stageLength, 0),
    1,
  )
}
