import { useEffect, useLayoutEffect, useMemo, useRef, type RefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei/core/ContactShadows'
import { PerspectiveCamera } from '@react-three/drei/core/PerspectiveCamera'
import gsap from 'gsap'
import { easing } from 'maath'
import * as THREE from 'three'

import {
  landingStoryDesktopFraming,
  landingStoryProgressMap,
  landingStoryScene,
  type LandingStoryStageId,
} from './stageConfig'
import type { LandingStoryQuality } from './useAdaptiveQuality'

type LandingStoryCanvasProps = {
  activeStageId: LandingStoryStageId
  isActive: boolean
  isFastScrolling: boolean
  progress: number
  quality: LandingStoryQuality
}

type SceneValues = {
  bookmarkLift: number
  bookRotX: number
  bookRotY: number
  bookRotZ: number
  bookScale: number
  bookX: number
  bookY: number
  bookZ: number
  cameraX: number
  cameraY: number
  cameraZ: number
  copyOpacity: number
  copyScale: number
  copyX: number
  copyY: number
  copyZ: number
  coverOpen: number
  dustOpacity: number
  giveSealOpacity: number
  memoryOpacity: number
  originSealOpacity: number
  pageFan: number
  pageGlow: number
  pageOneTurn: number
  pageTwoTurn: number
  pathDraw: number
  pathOpacity: number
  returnSealOpacity: number
  shareSealOpacity: number
  lookX: number
  lookY: number
  lookZ: number
}

const palette = {
  anchorBlue: '#9db0a8',
  brass: '#c49351',
  brassDark: '#8b623a',
  copper: '#d7835c',
  copperStrong: '#f0a172',
  cover: '#4b2f25',
  coverDeep: '#241612',
  coverEdge: '#1b100d',
  coverHighlight: '#6b4432',
  coverWorn: '#845842',
  endpaper: '#9d6f55',
  endpaperDeep: '#5b3528',
  endpaperLine: '#c49a78',
  forest: '#9fbea5',
  gold: '#d6aa63',
  leatherGrain: '#76513e',
  paper: '#ead9bd',
  paperBright: '#f3e5c8',
  paperEdge: '#cdb790',
  paperEdgeDark: '#8f7754',
  paperShadow: '#aa8f68',
  paperWarm: '#efddbd',
  shelf: '#302820',
  shelfDeep: '#1a1613',
  shelfEdge: '#201813',
  spine: '#2b1915',
  thread: '#b88b61',
} as const

const stageAccentColors = {
  add: palette.copper,
  share: palette.forest,
  give: palette.gold,
  return: palette.anchorBlue,
} as const satisfies Record<LandingStoryStageId, string>

function createRoundedRectShape(width: number, height: number, radius: number) {
  const shape = new THREE.Shape()
  const halfWidth = width / 2
  const halfHeight = height / 2
  const safeRadius = Math.min(radius, halfWidth * 0.8, halfHeight * 0.8)

  shape.moveTo(-halfWidth + safeRadius, -halfHeight)
  shape.lineTo(halfWidth - safeRadius, -halfHeight)
  shape.quadraticCurveTo(halfWidth, -halfHeight, halfWidth, -halfHeight + safeRadius)
  shape.lineTo(halfWidth, halfHeight - safeRadius)
  shape.quadraticCurveTo(halfWidth, halfHeight, halfWidth - safeRadius, halfHeight)
  shape.lineTo(-halfWidth + safeRadius, halfHeight)
  shape.quadraticCurveTo(-halfWidth, halfHeight, -halfWidth, halfHeight - safeRadius)
  shape.lineTo(-halfWidth, -halfHeight + safeRadius)
  shape.quadraticCurveTo(-halfWidth, -halfHeight, -halfWidth + safeRadius, -halfHeight)

  return shape
}

function createRoundedSlabGeometry(
  width: number,
  height: number,
  depth: number,
  radius: number,
  qualityLevel: LandingStoryQuality['level'],
) {
  const bevelSegments = qualityLevel === 'high' ? 5 : qualityLevel === 'medium' ? 3 : 2
  const bevelSize = Math.min(depth * 0.22, radius * 0.48)
  const geometry = new THREE.ExtrudeGeometry(createRoundedRectShape(width, height, radius), {
    bevelEnabled: true,
    bevelSegments,
    bevelSize,
    bevelThickness: Math.min(depth * 0.18, radius * 0.36),
    curveSegments: qualityLevel === 'high' ? 10 : 6,
    depth,
    steps: 1,
  })

  geometry.center()
  geometry.computeVertexNormals()

  return geometry
}

function createCurledPageGeometry(width: number, height: number, curl: number) {
  const geometry = new THREE.PlaneGeometry(width, height, 12, 7)
  const position = geometry.attributes.position

  for (let index = 0; index < position.count; index += 1) {
    const x = position.getX(index)
    const y = position.getY(index)
    const normalizedX = x / width + 0.5
    const normalizedY = Math.abs(y / height)
    const edgeLift = Math.pow(Math.max(normalizedX, 0), 1.72) * curl
    const softWarp = Math.sin(normalizedX * Math.PI) * (1 - normalizedY * 0.48) * curl * 0.14
    const spineTuck = Math.pow(Math.max(1 - normalizedX, 0), 1.8) * curl * 0.045
    const pageMemory = Math.sin((normalizedX + normalizedY) * Math.PI * 1.45) * curl * 0.014
    const sideSet = Math.sin(normalizedX * Math.PI) * Math.sign(y) * curl * 0.012

    position.setY(index, y + sideSet)
    position.setZ(index, edgeLift + softWarp + pageMemory - spineTuck)
  }

  position.needsUpdate = true
  geometry.computeVertexNormals()

  return geometry
}

function createBookmarkGeometry(width: number, height: number, notchDepth: number, depth: number) {
  const shape = new THREE.Shape()
  const halfWidth = width / 2
  const halfHeight = height / 2

  shape.moveTo(-halfWidth, halfHeight)
  shape.lineTo(halfWidth, halfHeight)
  shape.lineTo(halfWidth, -halfHeight + notchDepth)
  shape.lineTo(0, -halfHeight)
  shape.lineTo(-halfWidth, -halfHeight + notchDepth)
  shape.lineTo(-halfWidth, halfHeight)

  const geometry = new THREE.ExtrudeGeometry(shape, {
    bevelEnabled: true,
    bevelSegments: 2,
    bevelSize: depth * 0.18,
    bevelThickness: depth * 0.2,
    depth,
    steps: 1,
  })

  geometry.center()
  geometry.computeVertexNormals()

  return geometry
}

const ownerA = landingStoryScene.anchors.ownerA
const ownerB = landingStoryScene.anchors.ownerB
const desktopCamera = landingStoryScene.camera.desktop
const mobileCamera = landingStoryScene.camera.mobile
const desktopFrames = landingStoryDesktopFraming

function createInitialSceneValues(): SceneValues {
  const addFrame = desktopFrames.add
  const shareFrame = desktopFrames.share

  return {
    bookmarkLift: 0,
    bookRotX: -0.14,
    bookRotY: -0.46,
    bookRotZ: -0.04,
    bookScale: 0.88,
    bookX: addFrame.bookPosition[0],
    bookY: 0.02,
    bookZ: addFrame.bookPosition[2],
    cameraX: addFrame.camera[0],
    cameraY: addFrame.camera[1],
    cameraZ: addFrame.camera[2],
    copyOpacity: 0,
    copyScale: shareFrame.copyScale,
    copyX: shareFrame.copyPosition[0],
    copyY: shareFrame.copyPosition[1],
    copyZ: shareFrame.copyPosition[2],
    coverOpen: 0.04,
    dustOpacity: 0.1,
    giveSealOpacity: 0,
    memoryOpacity: 0,
    originSealOpacity: 0,
    pageFan: 0.04,
    pageGlow: 0.08,
    pageOneTurn: 0.02,
    pageTwoTurn: 0,
    pathDraw: 0,
    pathOpacity: 0,
    returnSealOpacity: 0,
    shareSealOpacity: 0,
    lookX: addFrame.lookAt[0],
    lookY: addFrame.lookAt[1],
    lookZ: addFrame.lookAt[2],
  }
}

function configureStoryTimeline(values: SceneValues) {
  const { add, share, give, return: returnStage } = landingStoryProgressMap
  const addFrame = desktopFrames.add
  const shareFrame = desktopFrames.share
  const giveFrame = desktopFrames.give
  const returnFrame = desktopFrames.return
  const timeline = gsap.timeline({
    defaults: {
      ease: 'power2.inOut',
    },
    paused: true,
  })

  timeline.to(
    values,
    {
      bookmarkLift: 0.28,
      bookRotX: -0.04,
      bookRotY: -0.72,
      bookRotZ: 0.02,
      bookScale: addFrame.bookScale,
      bookX: addFrame.bookPosition[0],
      bookY: addFrame.bookPosition[1],
      bookZ: addFrame.bookPosition[2],
      cameraX: addFrame.camera[0],
      cameraY: addFrame.camera[1],
      cameraZ: addFrame.camera[2],
      coverOpen: 1.18,
      dustOpacity: 0.24,
      duration: add.end - add.start,
      ease: 'power3.out',
      giveSealOpacity: 0,
      lookX: addFrame.lookAt[0],
      lookY: addFrame.lookAt[1],
      lookZ: addFrame.lookAt[2],
      memoryOpacity: 0.09,
      originSealOpacity: 0.92,
      pageFan: 0.52,
      pageGlow: 0.36,
      pageOneTurn: 0.56,
      pageTwoTurn: 0.22,
      returnSealOpacity: 0,
      shareSealOpacity: 0,
    },
    add.start,
  )

  timeline.to(
    values,
    {
      bookmarkLift: 0.34,
      bookScale: shareFrame.bookScale,
      bookX: shareFrame.bookPosition[0],
      bookY: shareFrame.bookPosition[1],
      bookZ: shareFrame.bookPosition[2],
      cameraX: shareFrame.camera[0],
      cameraY: shareFrame.camera[1],
      cameraZ: shareFrame.camera[2],
      copyOpacity: 0.38,
      copyScale: shareFrame.copyScale,
      copyX: shareFrame.copyPosition[0],
      copyY: shareFrame.copyPosition[1],
      copyZ: shareFrame.copyPosition[2],
      duration: share.end - share.start,
      lookX: shareFrame.lookAt[0],
      lookY: shareFrame.lookAt[1],
      lookZ: shareFrame.lookAt[2],
      memoryOpacity: 0.18,
      originSealOpacity: 0.76,
      pageFan: 0.56,
      pageGlow: 0.3,
      pathDraw: 1,
      pathOpacity: 0.52,
      returnSealOpacity: 0,
      shareSealOpacity: 0.78,
    },
    share.start,
  )

  timeline.to(
    values,
    {
      copyOpacity: 0,
      copyScale: giveFrame.copyScale,
      copyX: giveFrame.copyPosition[0],
      copyY: giveFrame.copyPosition[1],
      copyZ: giveFrame.copyPosition[2],
      duration: 0.16,
      ease: 'power1.inOut',
      shareSealOpacity: 0.24,
    },
    give.start,
  )

  timeline.to(
    values,
    {
      bookRotX: -0.02,
      bookRotY: 0.5,
      bookRotZ: 0.04,
      bookScale: giveFrame.bookScale,
      bookX: giveFrame.bookPosition[0],
      bookY: giveFrame.bookPosition[1],
      bookZ: giveFrame.bookPosition[2],
      cameraX: giveFrame.camera[0],
      cameraY: giveFrame.camera[1],
      cameraZ: giveFrame.camera[2],
      coverOpen: 0.86,
      duration: give.end - give.start,
      giveSealOpacity: 0.84,
      lookX: giveFrame.lookAt[0],
      lookY: giveFrame.lookAt[1],
      lookZ: giveFrame.lookAt[2],
      memoryOpacity: 0.13,
      originSealOpacity: 0.18,
      pageFan: 0.42,
      pageGlow: 0.28,
      pageOneTurn: 0.32,
      pageTwoTurn: 0.22,
      pathOpacity: 0.42,
      returnSealOpacity: 0,
      shareSealOpacity: 0.08,
    },
    give.start,
  )

  timeline.to(
    values,
    {
      bookmarkLift: 0,
      bookRotX: -0.16,
      bookRotY: -0.46,
      bookRotZ: -0.03,
      bookScale: returnFrame.bookScale,
      bookX: returnFrame.bookPosition[0],
      bookY: returnFrame.bookPosition[1],
      bookZ: returnFrame.bookPosition[2],
      cameraX: returnFrame.camera[0],
      cameraY: returnFrame.camera[1],
      cameraZ: returnFrame.camera[2],
      copyOpacity: 0,
      copyScale: returnFrame.copyScale,
      copyX: returnFrame.copyPosition[0],
      copyY: returnFrame.copyPosition[1],
      copyZ: returnFrame.copyPosition[2],
      coverOpen: 0.16,
      dustOpacity: 0.16,
      duration: returnStage.end - returnStage.start,
      ease: 'sine.inOut',
      giveSealOpacity: 0.08,
      lookX: returnFrame.lookAt[0],
      lookY: returnFrame.lookAt[1],
      lookZ: returnFrame.lookAt[2],
      memoryOpacity: 0.08,
      originSealOpacity: 0.36,
      pageFan: 0.12,
      pageGlow: 0.14,
      pageOneTurn: 0.08,
      pageTwoTurn: 0.04,
      pathDraw: 0.28,
      pathOpacity: 0.18,
      returnSealOpacity: 0.7,
      shareSealOpacity: 0,
    },
    returnStage.start,
  )

  return timeline
}

export default function LandingStoryCanvasEntry({
  activeStageId,
  isActive,
  isFastScrolling,
  progress,
  quality,
}: LandingStoryCanvasProps) {
  return (
    <Canvas
      aria-hidden="true"
      className="landing-story__canvas"
      dpr={quality.dpr}
      frameloop={isActive ? 'always' : 'demand'}
      gl={{
        alpha: true,
        antialias: quality.antialias,
        powerPreference: quality.level === 'high' ? 'high-performance' : 'default',
      }}
      shadows={quality.shadow ? 'percentage' : false}
    >
      <LandingStoryScene
        activeStageId={activeStageId}
        isActive={isActive}
        isFastScrolling={isFastScrolling}
        progress={progress}
        quality={quality}
      />
    </Canvas>
  )
}

function LandingStoryScene({
  activeStageId,
  isActive,
  isFastScrolling,
  progress,
  quality,
}: LandingStoryCanvasProps) {
  const camera = useThree((state) => state.camera)
  const pointer = useThree((state) => state.pointer)
  const size = useThree((state) => state.size)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const valuesRef = useRef<SceneValues>(createInitialSceneValues())
  const bookRef = useRef<THREE.Group | null>(null)
  const copyRef = useRef<THREE.Group | null>(null)
  const frontCoverRef = useRef<THREE.Group | null>(null)
  const giveSealRef = useRef<THREE.Group | null>(null)
  const memoryRef = useRef<THREE.Group | null>(null)
  const originSealRef = useRef<THREE.Group | null>(null)
  const pageOneRef = useRef<THREE.Group | null>(null)
  const pageSheetRefs = useRef<Array<THREE.Group | null>>([])
  const pageTwoRef = useRef<THREE.Group | null>(null)
  const bookmarkRef = useRef<THREE.Group | null>(null)
  const pageGlowMaterialRef = useRef<THREE.MeshBasicMaterial | null>(null)
  const pageLightRef = useRef<THREE.PointLight | null>(null)
  const pathRef = useRef<THREE.Mesh | null>(null)
  const pathMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null)
  const returnSealRef = useRef<THREE.Group | null>(null)
  const shareSealRef = useRef<THREE.Group | null>(null)
  const dustRef = useRef<THREE.Points | null>(null)
  const dustMaterialRef = useRef<THREE.PointsMaterial | null>(null)
  const pointerTiltRef = useRef({ x: 0, y: 0 })
  const accentColor = stageAccentColors[activeStageId]
  const cameraTarget = size.width < 720 ? mobileCamera : desktopCamera
  const sceneScale = size.width < 720 ? 0.72 : size.width < 960 ? 0.86 : 1

  useLayoutEffect(() => {
    const timeline = configureStoryTimeline(valuesRef.current)

    timelineRef.current = timeline

    return () => {
      timeline.kill()
      timelineRef.current = null
    }
  }, [])

  useEffect(() => {
    timelineRef.current?.progress(progress)
  }, [progress])

  useFrame(({ clock }, delta) => {
    const values = valuesRef.current
    const clampedDelta = Math.min(delta, 0.05)
    const tiltEnabled =
      quality.enablePointerTilt && isActive && !isFastScrolling
    const tiltX = tiltEnabled ? pointer.x * 0.055 : 0
    const tiltY = tiltEnabled ? pointer.y * 0.034 : 0
    const idleWeight = isActive && !isFastScrolling ? 1 : 0.28
    const idleLift = Math.sin(clock.elapsedTime * 0.58) * 0.009 * idleWeight
    const idleRoll = Math.sin(clock.elapsedTime * 0.44 + 0.4) * 0.006 * idleWeight

    easing.damp(pointerTiltRef.current, 'x', tiltX, 0.22, clampedDelta)
    easing.damp(pointerTiltRef.current, 'y', tiltY, 0.22, clampedDelta)

    if (bookRef.current) {
      easing.damp3(
        bookRef.current.position,
        [values.bookX, values.bookY + idleLift, values.bookZ],
        0.18,
        clampedDelta,
      )
      easing.damp3(
        bookRef.current.scale,
        [
          values.bookScale * sceneScale,
          values.bookScale * sceneScale,
          values.bookScale * sceneScale,
        ],
        0.2,
        clampedDelta,
      )
      easing.dampE(
        bookRef.current.rotation,
        [
          values.bookRotX + pointerTiltRef.current.y,
          values.bookRotY + pointerTiltRef.current.x,
          values.bookRotZ + idleRoll,
        ],
        0.2,
        clampedDelta,
      )
    }

    if (copyRef.current) {
      easing.damp3(
        copyRef.current.position,
        [values.copyX, values.copyY, values.copyZ],
        0.22,
        clampedDelta,
      )
      easing.damp3(
        copyRef.current.scale,
        [
          values.copyScale * sceneScale,
          values.copyScale * sceneScale,
          values.copyScale * sceneScale,
        ],
        0.22,
        clampedDelta,
      )
      easing.dampE(copyRef.current.rotation, [-0.04, 0.2, 0.02], 0.24, clampedDelta)
      setObjectOpacity(copyRef.current, values.copyOpacity)
    }

    if (frontCoverRef.current) {
      easing.dampE(
        frontCoverRef.current.rotation,
        [0, -values.coverOpen, 0],
        0.16,
        clampedDelta,
      )
    }

    if (pageOneRef.current) {
      easing.dampE(
        pageOneRef.current.rotation,
        [0, -values.pageOneTurn, 0],
        0.15,
        clampedDelta,
      )
    }

    if (pageTwoRef.current) {
      easing.dampE(
        pageTwoRef.current.rotation,
        [0, -values.pageTwoTurn, 0],
        0.18,
        clampedDelta,
      )
    }

    pageSheetRefs.current.forEach((pageSheet, index) => {
      if (!pageSheet) {
        return
      }

      const sheetTurn = values.pageFan * (0.15 + index * 0.075)
      const flutter =
        Math.sin(clock.elapsedTime * (0.58 + index * 0.07) + index * 0.9) *
        values.pageFan *
        0.012 *
        idleWeight

      easing.dampE(
        pageSheet.rotation,
        [0, -(sheetTurn + flutter), (index - 2) * 0.003 + flutter * 0.16],
        0.18 + index * 0.012,
        clampedDelta,
      )
    })

    if (bookmarkRef.current) {
      easing.damp3(
        bookmarkRef.current.position,
        [0.34, -0.18 + values.bookmarkLift, 0.43],
        0.16,
        clampedDelta,
      )
      easing.dampE(
        bookmarkRef.current.rotation,
        [0, 0.08, values.bookmarkLift * 0.36],
        0.18,
        clampedDelta,
      )
    }

    if (originSealRef.current) {
      setObjectOpacity(originSealRef.current, values.originSealOpacity)
    }

    if (shareSealRef.current) {
      setObjectOpacity(shareSealRef.current, values.shareSealOpacity)
    }

    if (giveSealRef.current) {
      setObjectOpacity(giveSealRef.current, values.giveSealOpacity)
    }

    if (returnSealRef.current) {
      setObjectOpacity(returnSealRef.current, values.returnSealOpacity)
    }

    if (memoryRef.current) {
      memoryRef.current.rotation.y += clampedDelta * 0.045
      memoryRef.current.position.y =
        0.2 + Math.sin(clock.elapsedTime * 0.42) * 0.026 * idleWeight
      setObjectOpacity(memoryRef.current, values.memoryOpacity * 0.68)
    }

    if (pageGlowMaterialRef.current) {
      easing.damp(
        pageGlowMaterialRef.current,
        'opacity',
        values.pageGlow * 0.1,
        0.28,
        clampedDelta,
      )
    }

    if (pageLightRef.current) {
      easing.damp(
        pageLightRef.current,
        'intensity',
        0.18 + values.pageGlow * 0.6,
        0.32,
        clampedDelta,
      )
    }

    if (pathRef.current) {
      easing.damp3(
        pathRef.current.scale,
        [Math.max(values.pathDraw, 0.001), 1, 1],
        0.18,
        clampedDelta,
      )
    }

    if (pathMaterialRef.current) {
      easing.damp(pathMaterialRef.current, 'opacity', values.pathOpacity, 0.18, clampedDelta)
      easing.dampC(pathMaterialRef.current.color, accentColor, 0.28, clampedDelta)
      easing.dampC(pathMaterialRef.current.emissive, accentColor, 0.28, clampedDelta)
      easing.damp(
        pathMaterialRef.current,
        'emissiveIntensity',
        values.pathOpacity * 0.04,
        0.24,
        clampedDelta,
      )
    }

    if (dustRef.current) {
      dustRef.current.rotation.y += clampedDelta * 0.014
      dustRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.22) * 0.012 * idleWeight
    }

    if (dustMaterialRef.current) {
      easing.damp(
        dustMaterialRef.current,
        'opacity',
        quality.dustCount > 0 ? values.dustOpacity * 0.48 : 0,
        0.3,
        clampedDelta,
      )
    }

    easing.damp3(
      camera.position,
      [
        values.cameraX + (cameraTarget[0] - desktopCamera[0]),
        values.cameraY + (cameraTarget[1] - desktopCamera[1]),
        values.cameraZ + (cameraTarget[2] - desktopCamera[2]),
      ],
      0.26,
      clampedDelta,
    )
    easing.dampLookAt(
      camera,
      [values.lookX, values.lookY, values.lookZ],
      0.24,
      clampedDelta,
    )
  })

  return (
    <>
      <PerspectiveCamera
        makeDefault
        fov={size.width < 720 ? 42 : 36}
        near={0.1}
        far={80}
        position={cameraTarget}
      />
      <fog attach="fog" args={[palette.shelfDeep, 14.5, 24]} />
      <ambientLight intensity={0.34} />
      <hemisphereLight
        args={[palette.paperBright, palette.shelfDeep, 0.52]}
      />
      <directionalLight
        castShadow={quality.shadow}
        color={palette.paperBright}
        intensity={quality.shadow ? 2.55 : 1.45}
        position={[-3.7, 5.4, 2.5]}
        shadow-bias={-0.00018}
        shadow-mapSize-height={quality.level === 'high' ? 1024 : 512}
        shadow-mapSize-width={quality.level === 'high' ? 1024 : 512}
      />
      <pointLight color={palette.copperStrong} intensity={0.72} position={[2.8, 2.35, 1.6]} />
      <pointLight color={palette.paper} intensity={0.68} position={[-2.7, 1.9, 1.25]} />
      <pointLight color={palette.anchorBlue} intensity={0.22} position={[-2.5, 2.25, -2.25]} />
      <pointLight ref={pageLightRef} color={palette.paperBright} intensity={0.24} position={[-0.4, 0.75, 0.6]} />

      <group position={[0, 0, 0]}>
        <CatalogBase />
        <OwnerAnchor accent={palette.copper} position={ownerA} variant="origin" />
        <OwnerAnchor accent={palette.anchorBlue} position={ownerB} variant="reader" />
        <MemoryFragments groupRef={memoryRef} qualityLevel={quality.level} />
        <mesh
          ref={pathRef}
          position={[0, ownerA[1] + 0.1, ownerA[2] + 0.03]}
          scale={[0.001, 1, 1]}
        >
          <boxGeometry args={[Math.abs(ownerB[0] - ownerA[0]), 0.045, 0.035]} />
          <meshStandardMaterial
            ref={pathMaterialRef}
            color={palette.copper}
            emissive={palette.copper}
            emissiveIntensity={0.04}
            opacity={0}
            roughness={0.84}
            transparent
          />
        </mesh>

        <group
          ref={copyRef}
          position={desktopFrames.share.copyPosition}
          scale={desktopFrames.share.copyScale}
        >
          <BookModel opacity={0} qualityLevel={quality.level} transparent />
        </group>

        <group
          ref={bookRef}
          position={[desktopFrames.add.bookPosition[0], 0.02, desktopFrames.add.bookPosition[2]]}
          scale={0.88}
        >
          <BookModel
            bookmarkRef={bookmarkRef}
            frontCoverRef={frontCoverRef}
            giveSealRef={giveSealRef}
            originSealRef={originSealRef}
            pageGlowMaterialRef={pageGlowMaterialRef}
            pageOneRef={pageOneRef}
            pageSheetRefs={pageSheetRefs}
            pageTwoRef={pageTwoRef}
            qualityLevel={quality.level}
            returnSealRef={returnSealRef}
            shareSealRef={shareSealRef}
          />
        </group>

        <DustField
          count={quality.dustCount}
          materialRef={dustMaterialRef}
          pointsRef={dustRef}
        />
      </group>

      {quality.shadow ? (
        <ContactShadows
          blur={3.2}
          far={5}
          frames={isActive ? Infinity : 1}
          height={8}
          opacity={0.3}
          position={[0, -2.18, -0.58]}
          resolution={quality.level === 'high' ? 512 : 256}
          scale={[7.2, 5.2]}
          width={8}
        />
      ) : null}
    </>
  )
}

type BookModelProps = {
  bookmarkRef?: RefObject<THREE.Group | null>
  frontCoverRef?: RefObject<THREE.Group | null>
  giveSealRef?: RefObject<THREE.Group | null>
  opacity?: number
  originSealRef?: RefObject<THREE.Group | null>
  pageGlowMaterialRef?: RefObject<THREE.MeshBasicMaterial | null>
  pageOneRef?: RefObject<THREE.Group | null>
  pageSheetRefs?: RefObject<Array<THREE.Group | null>>
  pageTwoRef?: RefObject<THREE.Group | null>
  qualityLevel: LandingStoryQuality['level']
  returnSealRef?: RefObject<THREE.Group | null>
  shareSealRef?: RefObject<THREE.Group | null>
  transparent?: boolean
}

function BookModel({
  bookmarkRef,
  frontCoverRef,
  giveSealRef,
  opacity = 1,
  originSealRef,
  pageGlowMaterialRef,
  pageOneRef,
  pageSheetRefs,
  pageTwoRef,
  qualityLevel,
  returnSealRef,
  shareSealRef,
  transparent = false,
}: BookModelProps) {
  const book = landingStoryScene.book
  const spineWidth = 0.38
  const coverOverhang = 0.16
  const coverZ = book.paperThickness / 2 + book.coverThickness / 2
  const boardHeight = book.height + coverOverhang
  const frontBoardWidth = book.width + coverOverhang * 0.36
  const pageHeight = book.height * 0.88
  const pageWidth = book.width * 0.9
  const transparentMaterial = transparent || opacity < 1
  const edgeLineCount = qualityLevel === 'high' ? 20 : qualityLevel === 'medium' ? 14 : 8
  const grainCount = qualityLevel === 'high' ? 22 : qualityLevel === 'medium' ? 14 : 8
  const sheetCount = qualityLevel === 'high' ? 7 : qualityLevel === 'medium' ? 5 : 3
  const coverInlays = useMemo(
    () => [
      { height: 0.018, width: book.width * 0.72, x: book.width * 0.5, y: book.height * 0.31 },
      { height: 0.014, width: book.width * 0.54, x: book.width * 0.5, y: -book.height * 0.31 },
      { height: book.height * 0.54, width: 0.014, x: book.width * 0.2, y: 0 },
      { height: book.height * 0.48, width: 0.012, x: book.width * 0.81, y: -0.02 },
    ],
    [book.height, book.width],
  )
  const endpaperLines = useMemo(
    () =>
      Array.from({ length: 6 }, (_, index) => ({
        length: book.width * (0.28 + index * 0.045),
        x: book.width * (-0.16 + index * 0.035),
        y: book.height * (-0.22 + index * 0.088),
      })),
    [book.height, book.width],
  )
  const edgeLines = useMemo(
    () => Array.from({ length: edgeLineCount }, (_, index) => index),
    [edgeLineCount],
  )
  const pageEdgeMarks = useMemo(
    () =>
      Array.from({ length: edgeLineCount }, (_, index) => {
        const seed = index + 1

        return {
          opacity: 0.18 + Math.abs(Math.sin(seed * 1.31)) * 0.18,
          y: book.height * (-0.36 + (index / Math.max(edgeLineCount - 1, 1)) * 0.72),
          z: Math.sin(seed * 1.93) * book.paperThickness * 0.26,
        }
      }),
    [book.height, book.paperThickness, edgeLineCount],
  )
  const grainLines = useMemo(
    () =>
      Array.from({ length: grainCount }, (_, index) => {
        const seed = index + 1

        return {
          length: book.width * (0.28 + Math.abs(Math.sin(seed * 2.17)) * 0.44),
          opacity: 0.06 + Math.abs(Math.cos(seed * 1.7)) * 0.1,
          x: book.width * (-0.12 + Math.sin(seed * 4.13) * 0.28),
          y: book.height * (-0.36 + (index / Math.max(grainCount - 1, 1)) * 0.72),
        }
      }),
    [book.height, book.width, grainCount],
  )
  const pageSheets = useMemo(
    () =>
      Array.from({ length: sheetCount }, (_, index) => ({
        offsetY: (index - (sheetCount - 1) / 2) * 0.022,
        roll: (index - (sheetCount - 1) / 2) * 0.005,
        z: coverZ + 0.018 + index * 0.01,
      })),
    [coverZ, sheetCount],
  )
  const backCoverGeometry = useMemo(
    () =>
      createRoundedSlabGeometry(
        book.width + spineWidth + coverOverhang,
        book.height + coverOverhang,
        book.coverThickness,
        0.095,
        qualityLevel,
      ),
    [book.coverThickness, book.height, book.width, qualityLevel],
  )
  const frontCoverGeometry = useMemo(
    () =>
      createRoundedSlabGeometry(
        frontBoardWidth,
        boardHeight,
        book.coverThickness,
        0.095,
        qualityLevel,
      ),
    [boardHeight, book.coverThickness, frontBoardWidth, qualityLevel],
  )
  const spineGeometry = useMemo(
    () =>
      createRoundedSlabGeometry(
        spineWidth,
        book.height + coverOverhang * 1.62,
        book.paperThickness + book.coverThickness * 2.35,
        0.065,
        qualityLevel,
      ),
    [book.coverThickness, book.height, book.paperThickness, qualityLevel],
  )
  const pageBlockGeometry = useMemo(
    () =>
      createRoundedSlabGeometry(
        pageWidth,
        pageHeight,
        book.paperThickness,
        0.045,
        qualityLevel,
      ),
    [book.paperThickness, pageHeight, pageWidth, qualityLevel],
  )
  const endpaperGeometry = useMemo(
    () =>
      createRoundedSlabGeometry(
        book.width * 0.78,
        book.height * 0.74,
        0.018,
        0.045,
        qualityLevel,
      ),
    [book.height, book.width, qualityLevel],
  )
  const primaryPageGeometry = useMemo(
    () => createCurledPageGeometry(book.width * 0.86, book.height * 0.82, 0.05),
    [book.height, book.width],
  )
  const secondaryPageGeometry = useMemo(
    () => createCurledPageGeometry(book.width * 0.82, book.height * 0.78, 0.036),
    [book.height, book.width],
  )
  const pageSheetGeometry = useMemo(
    () => createCurledPageGeometry(book.width * 0.78, book.height * 0.74, 0.032),
    [book.height, book.width],
  )
  const bookmarkGeometry = useMemo(
    () => createBookmarkGeometry(0.18, book.height * 0.82, 0.18, 0.018),
    [book.height],
  )

  return (
    <group>
      <mesh castShadow receiveShadow position={[0.03, 0, -coverZ]}>
        <primitive attach="geometry" object={backCoverGeometry} />
        <meshStandardMaterial
          color={palette.coverEdge}
          metalness={0.01}
          opacity={opacity}
          roughness={0.98}
          transparent={transparentMaterial}
        />
      </mesh>

      <mesh receiveShadow position={[0.18, 0, -coverZ + book.coverThickness * 0.62]}>
        <primitive attach="geometry" object={endpaperGeometry} />
        <meshStandardMaterial
          color={palette.endpaperDeep}
          opacity={opacity * 0.46}
          roughness={0.96}
          transparent
        />
      </mesh>
      {endpaperLines.map((line, index) => (
        <mesh
          key={`back-endpaper-${index}`}
          position={[0.18 + line.x, line.y, -coverZ + book.coverThickness * 0.75]}
        >
          <boxGeometry args={[line.length, 0.006, 0.008]} />
          <meshStandardMaterial
            color={palette.endpaperLine}
            opacity={opacity * 0.16}
            roughness={0.98}
            transparent
          />
        </mesh>
      ))}

      <mesh castShadow receiveShadow position={[0.16, 0, 0]}>
        <primitive attach="geometry" object={pageBlockGeometry} />
        <meshStandardMaterial
          color={palette.paperWarm}
          opacity={opacity}
          roughness={0.94}
          transparent={transparentMaterial}
        />
      </mesh>

      <mesh castShadow receiveShadow position={[book.width * 0.62, 0, 0.035]}>
        <boxGeometry args={[0.1, book.height * 0.84, book.paperThickness * 0.9]} />
        <meshStandardMaterial
          color={palette.paperEdgeDark}
          opacity={opacity * 0.78}
          roughness={0.96}
          transparent
        />
      </mesh>

      <mesh castShadow receiveShadow position={[0.16, book.height * 0.435, 0.02]}>
        <boxGeometry args={[book.width * 0.84, 0.055, book.paperThickness * 0.82]} />
        <meshStandardMaterial
          color={palette.paperEdge}
          opacity={opacity * 0.62}
          roughness={0.94}
          transparent
        />
      </mesh>

      <mesh castShadow receiveShadow position={[0.16, -book.height * 0.435, 0.02]}>
        <boxGeometry args={[book.width * 0.84, 0.05, book.paperThickness * 0.78]} />
        <meshStandardMaterial
          color={palette.paperEdgeDark}
          opacity={opacity * 0.46}
          roughness={0.96}
          transparent
        />
      </mesh>

      <group position={[book.width * 0.665, 0, 0.05]}>
        {edgeLines.map((stripe) => (
          <mesh
            key={stripe}
            position={[
              0,
              -book.height * 0.38 + stripe * ((book.height * 0.76) / edgeLineCount),
              0,
            ]}
          >
            <boxGeometry args={[0.018, 0.006, book.paperThickness * 0.78]} />
            <meshStandardMaterial
              color={stripe % 4 === 0 ? palette.paperEdgeDark : palette.paperEdge}
              opacity={opacity * (0.34 + (stripe % 2) * 0.12)}
              roughness={0.96}
              transparent
            />
          </mesh>
        ))}
      </group>

      <group position={[book.width * 0.708, 0, 0.02]}>
        {pageEdgeMarks.map((mark, index) => (
          <mesh key={index} position={[0, mark.y, mark.z]}>
            <boxGeometry args={[0.012, 0.005, book.paperThickness * 0.18]} />
            <meshStandardMaterial
              color={palette.paperShadow}
              opacity={opacity * mark.opacity}
              roughness={0.98}
              transparent
            />
          </mesh>
        ))}
      </group>

      <mesh castShadow receiveShadow position={[-book.width * 0.53, 0, 0]}>
        <primitive attach="geometry" object={spineGeometry} />
        <meshStandardMaterial
          color={palette.spine}
          metalness={0.01}
          opacity={opacity}
          roughness={0.98}
          transparent={transparentMaterial}
        />
      </mesh>
      {[-0.34, -0.2, 0.22, 0.36].map((bandY) => (
        <mesh
          key={bandY}
          castShadow
          position={[
            -book.width * 0.53,
            bandY * book.height,
            book.paperThickness / 2 + book.coverThickness * 0.78,
          ]}
        >
          <boxGeometry args={[spineWidth * 0.82, 0.055, 0.04]} />
          <meshStandardMaterial
            color={bandY < 0 ? palette.brassDark : palette.copper}
            metalness={0.08}
            opacity={opacity * 0.5}
            roughness={0.88}
            transparent
          />
        </mesh>
      ))}
      <mesh castShadow position={[-book.width * 0.53, 0, book.paperThickness / 2 + book.coverThickness * 0.98]}>
        <boxGeometry args={[spineWidth * 0.52, book.height * 0.46, 0.018]} />
        <meshStandardMaterial
          color={palette.thread}
          metalness={0.04}
          opacity={opacity * 0.28}
          roughness={0.94}
          transparent
        />
      </mesh>

      <group ref={frontCoverRef} position={[-book.width * 0.54, 0, coverZ]}>
        <mesh castShadow receiveShadow position={[book.width * 0.5, 0, 0]}>
          <primitive attach="geometry" object={frontCoverGeometry} />
          <meshStandardMaterial
            color={palette.cover}
            metalness={0.01}
            opacity={opacity}
            roughness={0.98}
            transparent={transparentMaterial}
          />
        </mesh>
        <mesh receiveShadow position={[book.width * 0.5, 0, -book.coverThickness * 0.62]}>
          <primitive attach="geometry" object={endpaperGeometry} />
          <meshStandardMaterial
            color={palette.endpaper}
            opacity={opacity * 0.5}
            roughness={0.96}
            transparent
          />
        </mesh>
        {endpaperLines.map((line, index) => (
          <mesh
            key={`front-endpaper-${index}`}
            position={[book.width * 0.5 + line.x, line.y, -book.coverThickness * 0.48]}
          >
            <boxGeometry args={[line.length, 0.006, 0.008]} />
            <meshStandardMaterial
              color={palette.endpaperLine}
              opacity={opacity * 0.16}
              roughness={0.98}
              transparent
            />
          </mesh>
        ))}
        <mesh position={[book.width * 0.5, 0, book.coverThickness * 0.63]}>
          <boxGeometry args={[book.width * 0.78, book.height * 0.68, 0.014]} />
          <meshStandardMaterial
            color={palette.coverWorn}
            opacity={opacity * 0.16}
            roughness={0.98}
            transparent
          />
        </mesh>
        <mesh position={[book.width * 0.22, 0, book.coverThickness * 0.66]}>
          <boxGeometry args={[0.05, book.height * 0.84, 0.018]} />
          <meshStandardMaterial
            color={palette.coverDeep}
            opacity={opacity * 0.28}
            roughness={0.96}
            transparent
          />
        </mesh>
        {coverInlays.map((inlay, index) => (
          <mesh
            key={`cover-inlay-${index}`}
            position={[inlay.x, inlay.y, book.coverThickness * 0.705]}
          >
            <boxGeometry args={[inlay.width, inlay.height, 0.009]} />
            <meshStandardMaterial
              color={index < 2 ? palette.brass : palette.brassDark}
              metalness={0.06}
              opacity={opacity * (index < 2 ? 0.22 : 0.16)}
              roughness={0.9}
              transparent
            />
          </mesh>
        ))}
        <mesh position={[book.width * 0.52, 0.54, book.coverThickness * 0.69]}>
          <boxGeometry args={[0.74, 0.38, 0.016]} />
          <meshStandardMaterial
            color={palette.brassDark}
            metalness={0.08}
            opacity={opacity * 0.2}
            roughness={0.9}
            transparent
          />
        </mesh>
        <mesh position={[book.width * 0.52, 0.54, book.coverThickness * 0.71]}>
          <boxGeometry args={[0.56, 0.035, 0.01]} />
          <meshStandardMaterial
            color={palette.coverDeep}
            opacity={opacity * 0.34}
            roughness={0.9}
            transparent
          />
        </mesh>
        <mesh position={[book.width * 0.52, 0.43, book.coverThickness * 0.71]}>
          <boxGeometry args={[0.34, 0.022, 0.01]} />
          <meshStandardMaterial
            color={palette.coverDeep}
            opacity={opacity * 0.26}
            roughness={0.9}
            transparent
          />
        </mesh>
        {grainLines.map((line, index) => (
          <mesh
            key={index}
            position={[book.width * 0.5 + line.x, line.y, book.coverThickness * 0.72]}
          >
            <boxGeometry args={[line.length, 0.008, 0.008]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? palette.leatherGrain : palette.coverHighlight}
              opacity={opacity * line.opacity}
              roughness={0.98}
              transparent
            />
          </mesh>
        ))}
      </group>

      <mesh position={[-book.width * 0.36, 0, coverZ + 0.045]}>
        <boxGeometry args={[0.055, book.height * 0.86, 0.036]} />
        <meshStandardMaterial
          color={palette.coverDeep}
          opacity={opacity * 0.54}
          roughness={0.98}
          transparent
        />
      </mesh>

      <mesh receiveShadow position={[0.12, 0, coverZ + 0.018]}>
        <primitive attach="geometry" object={endpaperGeometry} />
        <meshStandardMaterial
          color={palette.endpaper}
          opacity={opacity * 0.28}
          roughness={0.98}
          transparent
        />
      </mesh>

      <group>
        {pageSheets.map((sheet, index) => (
          <group
            key={index}
            ref={(node) => {
              if (pageSheetRefs) {
                pageSheetRefs.current[index] = node
              }
            }}
            position={[-book.width * 0.455, sheet.offsetY, sheet.z]}
          >
            <mesh
              castShadow
              position={[book.width * 0.39, 0, 0]}
              rotation={[0, 0, sheet.roll]}
            >
              <primitive attach="geometry" object={pageSheetGeometry} />
              <meshStandardMaterial
                color={index % 2 === 0 ? palette.paperWarm : palette.paper}
                depthWrite={false}
                opacity={opacity * (0.34 - index * 0.018)}
                roughness={0.96}
                side={THREE.DoubleSide}
                transparent
                userData={{ opacityScale: 0.78 - index * 0.04 }}
              />
            </mesh>
          </group>
        ))}
      </group>

      <group ref={pageOneRef} position={[-book.width * 0.46, 0, coverZ + 0.045]}>
        <mesh castShadow position={[book.width * 0.45, 0, 0]}>
          <primitive attach="geometry" object={primaryPageGeometry} />
          <meshStandardMaterial
            color={palette.paperBright}
            opacity={opacity}
            roughness={0.96}
            side={THREE.DoubleSide}
            transparent={transparentMaterial}
          />
        </mesh>
        <mesh position={[book.width * 0.86, 0, -0.006]}>
          <boxGeometry args={[0.018, book.height * 0.76, 0.018]} />
          <meshStandardMaterial
            color={palette.paperEdgeDark}
            opacity={opacity * 0.48}
            roughness={0.94}
            transparent
          />
        </mesh>
        <mesh position={[book.width * 0.08, 0, -0.012]}>
          <boxGeometry args={[0.025, book.height * 0.72, 0.012]} />
          <meshStandardMaterial
            color={palette.paperShadow}
            opacity={opacity * 0.18}
            roughness={0.98}
            transparent
          />
        </mesh>
      </group>

      <group ref={pageTwoRef} position={[-book.width * 0.45, 0, coverZ + 0.064]}>
        <mesh castShadow position={[book.width * 0.43, 0.02, 0]}>
          <primitive attach="geometry" object={secondaryPageGeometry} />
          <meshStandardMaterial
            color={palette.paper}
            depthWrite={false}
            opacity={opacity * 0.58}
            roughness={0.96}
            side={THREE.DoubleSide}
            transparent
            userData={{ opacityScale: 0.72 }}
          />
        </mesh>
      </group>

      <mesh position={[0.18, 0.03, coverZ + 0.086]}>
        <planeGeometry args={[book.width * 0.72, book.height * 0.58]} />
        <meshBasicMaterial
          ref={pageGlowMaterialRef}
          blending={THREE.AdditiveBlending}
          color={palette.paper}
          depthWrite={false}
          opacity={0}
          transparent
        />
      </mesh>

      {originSealRef ? (
        <StorySeal
          accent={palette.copper}
          groupRef={originSealRef}
          position={[0.78, 0.98, coverZ + 0.125]}
          variant="origin"
        />
      ) : null}
      {shareSealRef ? (
        <TemporaryRibbon
          accent={palette.forest}
          groupRef={shareSealRef}
          position={[0.42, -0.76, coverZ + 0.135]}
        />
      ) : null}
      {giveSealRef ? (
        <StorySeal
          accent={palette.gold}
          groupRef={giveSealRef}
          position={[1.0, 0.25, coverZ + 0.145]}
          variant="give"
        />
      ) : null}
      {returnSealRef ? (
        <StorySeal
          accent={palette.anchorBlue}
          groupRef={returnSealRef}
          position={[-0.16, -1.06, coverZ + 0.13]}
          variant="return"
        />
      ) : null}

      <group ref={bookmarkRef} position={[0.34, -0.18, 0.42]}>
        <mesh castShadow>
          <primitive attach="geometry" object={bookmarkGeometry} />
          <meshStandardMaterial
            color={palette.copper}
            metalness={0.04}
            opacity={opacity}
            roughness={0.9}
            transparent={transparentMaterial}
          />
        </mesh>
        <mesh castShadow position={[0, book.height * 0.43, 0.018]}>
          <boxGeometry args={[0.26, 0.055, 0.035]} />
          <meshStandardMaterial
            color={palette.brassDark}
            metalness={0.08}
            opacity={opacity * 0.64}
            roughness={0.88}
            transparent
          />
        </mesh>
        <mesh position={[0, book.height * 0.47, 0.022]}>
          <boxGeometry args={[0.035, 0.18, 0.018]} />
          <meshStandardMaterial
            color={palette.thread}
            opacity={opacity * 0.6}
            roughness={0.9}
            transparent
          />
        </mesh>
      </group>
    </group>
  )
}

type StorySealProps = {
  accent: string
  groupRef: RefObject<THREE.Group | null>
  position: readonly [number, number, number]
  variant: 'give' | 'origin' | 'return'
}

function StorySeal({ accent, groupRef, position, variant }: StorySealProps) {
  const isGive = variant === 'give'
  const isOrigin = variant === 'origin'
  const isReturn = variant === 'return'

  return (
    <group ref={groupRef} position={position} scale={isGive ? 1.08 : isReturn ? 0.96 : 1}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[isGive ? 0.19 : 0.18, isGive ? 0.19 : 0.18, 0.018, 40]} />
        <meshStandardMaterial
          color={accent}
          depthWrite={false}
          emissive={accent}
          emissiveIntensity={isGive ? 0.025 : 0.012}
          metalness={isGive ? 0.1 : 0.04}
          opacity={0}
          roughness={0.9}
          transparent
          userData={{ opacityScale: isGive ? 0.92 : 0.84 }}
        />
      </mesh>
      <mesh position={[0, 0, 0.019]}>
        <boxGeometry args={[isReturn ? 0.18 : 0.24, 0.018, 0.012]} />
        <meshStandardMaterial
          color={palette.paperBright}
          depthWrite={false}
          opacity={0}
          roughness={0.94}
          transparent
          userData={{ opacityScale: 0.42 }}
        />
      </mesh>
      <mesh position={[0, isReturn ? -0.06 : 0.055, 0.02]}>
        <boxGeometry args={[isGive ? 0.12 : 0.08, 0.018, 0.012]} />
        <meshStandardMaterial
          color={palette.paperBright}
          depthWrite={false}
          opacity={0}
          roughness={0.94}
          transparent
          userData={{ opacityScale: 0.36 }}
        />
      </mesh>
      {isOrigin ? (
        <mesh position={[0, 0, 0.021]}>
          <boxGeometry args={[0.018, 0.2, 0.012]} />
          <meshStandardMaterial
            color={palette.paperBright}
            depthWrite={false}
            opacity={0}
            roughness={0.94}
            transparent
            userData={{ opacityScale: 0.3 }}
          />
        </mesh>
      ) : null}
      {isReturn ? (
        <>
          <mesh position={[-0.035, 0.045, 0.022]} rotation={[0, 0, -0.55]}>
            <boxGeometry args={[0.078, 0.014, 0.012]} />
            <meshStandardMaterial
              color={palette.paperBright}
              depthWrite={false}
              opacity={0}
              roughness={0.94}
              transparent
              userData={{ opacityScale: 0.34 }}
            />
          </mesh>
          <mesh position={[0.035, 0.03, 0.022]} rotation={[0, 0, 0.44]}>
            <boxGeometry args={[0.11, 0.014, 0.012]} />
            <meshStandardMaterial
              color={palette.paperBright}
              depthWrite={false}
              opacity={0}
              roughness={0.94}
              transparent
              userData={{ opacityScale: 0.34 }}
            />
          </mesh>
        </>
      ) : null}
    </group>
  )
}

type TemporaryRibbonProps = {
  accent: string
  groupRef: RefObject<THREE.Group | null>
  position: readonly [number, number, number]
}

function TemporaryRibbon({ accent, groupRef, position }: TemporaryRibbonProps) {
  return (
    <group ref={groupRef} position={position} rotation={[0, 0, -0.08]}>
      <mesh>
        <boxGeometry args={[1.44, 0.075, 0.018]} />
        <meshStandardMaterial
          color={accent}
          depthWrite={false}
          emissive={accent}
          emissiveIntensity={0.01}
          metalness={0.02}
          opacity={0}
          roughness={0.92}
          transparent
          userData={{ opacityScale: 0.84 }}
        />
      </mesh>
      <mesh position={[0, 0, 0.013]}>
        <boxGeometry args={[1.28, 0.012, 0.01]} />
        <meshStandardMaterial
          color={palette.paperBright}
          depthWrite={false}
          opacity={0}
          roughness={0.94}
          transparent
          userData={{ opacityScale: 0.24 }}
        />
      </mesh>
      <mesh position={[0.58, 0.07, 0.012]}>
        <boxGeometry args={[0.22, 0.035, 0.012]} />
        <meshStandardMaterial
          color={palette.paperBright}
          depthWrite={false}
          opacity={0}
          roughness={0.94}
          transparent
          userData={{ opacityScale: 0.32 }}
        />
      </mesh>
      <mesh position={[-0.58, -0.065, 0.012]}>
        <boxGeometry args={[0.18, 0.026, 0.012]} />
        <meshStandardMaterial
          color={palette.paperBright}
          depthWrite={false}
          opacity={0}
          roughness={0.94}
          transparent
          userData={{ opacityScale: 0.3 }}
        />
      </mesh>
    </group>
  )
}

type MemoryFragmentsProps = {
  groupRef: RefObject<THREE.Group | null>
  qualityLevel: LandingStoryQuality['level']
}

function MemoryFragments({ groupRef, qualityLevel }: MemoryFragmentsProps) {
  const fragmentCount = qualityLevel === 'high' ? 12 : qualityLevel === 'medium' ? 8 : 4
  const fragments = useMemo(
    () =>
      Array.from({ length: fragmentCount }, (_, index) => {
        const seed = index + 1

        return {
          color: index % 3 === 0 ? palette.paper : index % 3 === 1 ? palette.copper : palette.gold,
          kind: index % 4,
          rotation: [
            Math.sin(seed * 1.7) * 0.14,
            Math.cos(seed * 0.9) * 0.26,
            Math.sin(seed * 2.3) * 0.46,
          ] as const,
          scale: 0.58 + Math.abs(Math.sin(seed * 1.31)) * 0.32,
          x: Math.sin(seed * 2.71) * 1.9,
          y: 0.58 + Math.abs(Math.cos(seed * 1.83)) * 1.18,
          z: -1.55 + Math.sin(seed * 1.19) * 0.78,
        }
      }),
    [fragmentCount],
  )

  return (
    <group ref={groupRef}>
      {fragments.map((fragment, index) => (
        <group
          key={index}
          position={[fragment.x, fragment.y, fragment.z]}
          rotation={fragment.rotation}
          scale={fragment.scale}
        >
          <mesh>
            <boxGeometry args={[fragment.kind === 0 ? 0.16 : 0.1, 0.012, 0.008]} />
            <meshBasicMaterial
              color={fragment.color}
              depthWrite={false}
              opacity={0}
              transparent
              userData={{ opacityScale: 0.58 }}
            />
          </mesh>
          {fragment.kind === 0 || fragment.kind === 2 ? (
            <mesh position={[0.038, 0.042, 0]}>
              <boxGeometry args={[0.012, 0.082, 0.008]} />
              <meshBasicMaterial
                color={fragment.color}
                depthWrite={false}
                opacity={0}
                transparent
                userData={{ opacityScale: 0.42 }}
              />
            </mesh>
          ) : null}
          {fragment.kind === 3 ? (
            <mesh position={[-0.038, -0.036, 0]}>
              <boxGeometry args={[0.012, 0.072, 0.008]} />
              <meshBasicMaterial
                color={fragment.color}
                depthWrite={false}
                opacity={0}
                transparent
                userData={{ opacityScale: 0.42 }}
              />
            </mesh>
          ) : null}
        </group>
      ))}
    </group>
  )
}

function CatalogBase() {
  const topGeometry = useMemo(
    () => createRoundedSlabGeometry(6.12, 1.48, 0.24, 0.16, 'medium'),
    [],
  )
  const plinthGeometry = useMemo(
    () => createRoundedSlabGeometry(6.62, 1.76, 0.1, 0.18, 'medium'),
    [],
  )
  const grainLines = useMemo(
    () =>
      Array.from({ length: 16 }, (_, index) => {
        const seed = index + 1

        return {
          length: 1.1 + Math.abs(Math.sin(seed * 1.7)) * 2.2,
          x: -2.76 + index * 0.36,
          z: -0.52 + Math.abs(Math.cos(seed * 2.11)) * 1.08,
        }
      }),
    [],
  )

  return (
    <group position={[0, -2.02, -0.72]}>
      <mesh receiveShadow position={[0, -0.18, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <primitive attach="geometry" object={topGeometry} />
        <meshStandardMaterial color={palette.shelf} roughness={0.98} />
      </mesh>
      <mesh receiveShadow position={[0, -0.04, -0.04]}>
        <boxGeometry args={[5.55, 0.045, 1.18]} />
        <meshStandardMaterial color={palette.shelfEdge} opacity={0.7} roughness={0.98} transparent />
      </mesh>
      <mesh receiveShadow position={[0, -0.075, -0.68]}>
        <boxGeometry args={[5.72, 0.04, 0.075]} />
        <meshStandardMaterial color={palette.coverEdge} opacity={0.36} roughness={0.98} transparent />
      </mesh>
      <mesh receiveShadow position={[0, -0.072, 0.58]}>
        <boxGeometry args={[5.44, 0.035, 0.06]} />
        <meshStandardMaterial color={palette.brassDark} metalness={0.04} opacity={0.24} roughness={0.9} transparent />
      </mesh>
      {grainLines.map((line, index) => (
        <mesh key={index} receiveShadow position={[line.x, -0.025, line.z]}>
          <boxGeometry args={[line.length, 0.012, 0.012]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? palette.coverHighlight : palette.coverEdge}
            opacity={0.14}
            roughness={0.98}
            transparent
          />
        </mesh>
      ))}
      <mesh receiveShadow position={[-1.26, -0.02, -0.48]}>
        <boxGeometry args={[1.32, 0.055, 0.12]} />
        <meshStandardMaterial color={palette.brassDark} metalness={0.06} opacity={0.28} roughness={0.9} transparent />
      </mesh>
      <mesh receiveShadow position={[0.52, -0.018, 0.42]}>
        <boxGeometry args={[1.8, 0.05, 0.1]} />
        <meshStandardMaterial color={palette.endpaperDeep} opacity={0.36} roughness={0.96} transparent />
      </mesh>
      <mesh receiveShadow position={[2.1, -0.016, -0.4]}>
        <boxGeometry args={[0.98, 0.05, 0.1]} />
        <meshStandardMaterial color={palette.copper} opacity={0.22} roughness={0.94} transparent />
      </mesh>
      <mesh receiveShadow position={[0, -0.33, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
        <primitive attach="geometry" object={plinthGeometry} />
        <meshStandardMaterial color={palette.shelfEdge} roughness={0.98} />
      </mesh>
    </group>
  )
}

type OwnerAnchorProps = {
  accent: string
  position: readonly [number, number, number]
  variant: 'origin' | 'reader'
}

function OwnerAnchor({ accent, position, variant }: OwnerAnchorProps) {
  const isOrigin = variant === 'origin'

  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.032, 42]} />
        <meshStandardMaterial color={accent} opacity={0.22} roughness={0.9} transparent />
      </mesh>
      <mesh position={[0, 0.075, 0]}>
        <sphereGeometry args={[isOrigin ? 0.075 : 0.058, 22, 14]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={0.025}
          roughness={0.84}
        />
      </mesh>
      {isOrigin ? (
        <group position={[0, 0.07, 0.2]} rotation={[0, 0.16, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.28, 0.08, 0.16]} />
            <meshStandardMaterial color={palette.cover} roughness={0.82} />
          </mesh>
          <mesh castShadow position={[0.02, 0.075, 0]}>
            <boxGeometry args={[0.24, 0.06, 0.14]} />
            <meshStandardMaterial color={palette.paperEdge} roughness={0.9} />
          </mesh>
        </group>
      ) : (
        <group position={[0, 0.065, 0.2]} rotation={[0, -0.2, 0]}>
          <mesh castShadow position={[-0.08, 0.035, 0]}>
            <boxGeometry args={[0.12, 0.14, 0.18]} />
            <meshStandardMaterial color={palette.anchorBlue} roughness={0.84} />
          </mesh>
          <mesh castShadow position={[0.08, 0.025, 0]}>
            <boxGeometry args={[0.12, 0.1, 0.18]} />
            <meshStandardMaterial color={palette.paperEdge} roughness={0.9} />
          </mesh>
        </group>
      )}
    </group>
  )
}

type DustFieldProps = {
  count: number
  materialRef: RefObject<THREE.PointsMaterial | null>
  pointsRef: RefObject<THREE.Points | null>
}

function DustField({ count, materialRef, pointsRef }: DustFieldProps) {
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3)

    for (let index = 0; index < count; index += 1) {
      const seed = index + 1
      values[index * 3] = Math.sin(seed * 12.989) * 2.6
      values[index * 3 + 1] = 0.35 + Math.abs(Math.cos(seed * 4.233)) * 2.25
      values[index * 3 + 2] = -1.9 + Math.sin(seed * 7.41) * 1.2
    }

    return values
  }, [count])

  if (count <= 0) {
    return null
  }

  return (
    <points ref={pointsRef} position={[0, 0.2, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        color={palette.paperBright}
        depthWrite={false}
        opacity={0}
        size={0.012}
        sizeAttenuation
        transparent
      />
    </points>
  )
}

function setObjectOpacity(object: THREE.Object3D, opacity: number) {
  object.traverse((child) => {
    const mesh = child as THREE.Mesh<
      THREE.BufferGeometry,
      THREE.Material | THREE.Material[]
    >
    const material = mesh.material

    if (!material) {
      return
    }

    const materials = Array.isArray(material) ? material : [material]

    materials.forEach((currentMaterial) => {
      const opacityScale =
        typeof currentMaterial.userData.opacityScale === 'number'
          ? currentMaterial.userData.opacityScale
          : 1

      currentMaterial.transparent = true
      currentMaterial.opacity = opacity * opacityScale
    })
  })
}
