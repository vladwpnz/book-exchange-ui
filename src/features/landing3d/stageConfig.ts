export type LandingStoryStageId = 'add' | 'share' | 'give' | 'return'

export type LandingStoryDesktopFrame = {
  camera: readonly [number, number, number]
  lookAt: readonly [number, number, number]
  bookPosition: readonly [number, number, number]
  bookScale: number
  copyPosition: readonly [number, number, number]
  copyScale: number
}

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

export const landingStoryDesktopFraming = {
  add: {
    camera: [-0.72, 1.35, 11.4],
    lookAt: [-0.95, 0.12, -0.72],
    bookPosition: [-1.12, 0.18, -0.72],
    bookScale: 1.02,
    copyPosition: [1.18, 0.18, -0.72],
    copyScale: 0.92,
  },
  share: {
    camera: [0.25, 1.45, 14.2],
    lookAt: [0.25, 0.05, -0.82],
    bookPosition: [-1.45, 0.12, -0.72],
    bookScale: 0.9,
    copyPosition: [2.25, 0.18, -1],
    copyScale: 0.68,
  },
  give: {
    camera: [0.8, 1.34, 11.9],
    lookAt: [1.1, 0.12, -0.75],
    bookPosition: [1.55, 0.18, -0.72],
    bookScale: 0.98,
    copyPosition: [2.55, 0.2, -1.1],
    copyScale: 0.6,
  },
  return: {
    camera: [-0.5, 1.4, 12.2],
    lookAt: [-0.82, 0.08, -0.72],
    bookPosition: [-1.1, 0.12, -0.72],
    bookScale: 0.98,
    copyPosition: [1.18, 0.12, -0.72],
    copyScale: 0.84,
  },
} as const satisfies Record<LandingStoryStageId, LandingStoryDesktopFrame>

export const landingStoryScene = {
  book: {
    width: 3.05,
    height: 4.18,
    paperThickness: 0.42,
    coverThickness: 0.16,
  },
  anchors: {
    ownerA: [-2.15, -2.08, -1.35],
    ownerB: [2.15, -2.08, -1.35],
  },
  camera: {
    desktop: landingStoryDesktopFraming.add.camera,
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
