import { useEffect, useLayoutEffect, useMemo, useRef, type RefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei/core/ContactShadows'
import { PerspectiveCamera } from '@react-three/drei/core/PerspectiveCamera'
import gsap from 'gsap'
import { easing } from 'maath'
import * as THREE from 'three'

import {
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
  pageOneTurn: number
  pageTwoTurn: number
  pathDraw: number
  pathOpacity: number
  lookX: number
  lookY: number
  lookZ: number
}

const palette = {
  anchorBlue: '#9db0a8',
  copper: '#d7835c',
  copperStrong: '#f0a172',
  cover: '#4b2f25',
  coverDeep: '#241612',
  forest: '#9fbea5',
  gold: '#d6aa63',
  paper: '#ead9bd',
  paperEdge: '#cdb790',
  shelf: '#302820',
  shelfDeep: '#1a1613',
  spine: '#2b1915',
} as const

const stageAccentColors = {
  add: palette.copper,
  share: palette.forest,
  give: palette.gold,
  return: palette.anchorBlue,
} as const satisfies Record<LandingStoryStageId, string>

const ownerA = landingStoryScene.anchors.ownerA
const ownerB = landingStoryScene.anchors.ownerB
const desktopCamera = landingStoryScene.camera.desktop
const mobileCamera = landingStoryScene.camera.mobile

function createInitialSceneValues(): SceneValues {
  return {
    bookmarkLift: 0,
    bookRotX: -0.18,
    bookRotY: -0.34,
    bookRotZ: -0.04,
    bookScale: 0.84,
    bookX: ownerA[0],
    bookY: 0.12,
    bookZ: -0.72,
    cameraX: desktopCamera[0],
    cameraY: desktopCamera[1],
    cameraZ: desktopCamera[2],
    copyOpacity: 0,
    copyScale: 0.76,
    copyX: ownerA[0],
    copyY: 0.64,
    copyZ: -0.72,
    coverOpen: 0.05,
    dustOpacity: 0.12,
    pageOneTurn: 0.02,
    pageTwoTurn: 0,
    pathDraw: 0,
    pathOpacity: 0,
    lookX: -0.2,
    lookY: 0.6,
    lookZ: -0.7,
  }
}

function configureStoryTimeline(values: SceneValues) {
  const { add, share, give, return: returnStage } = landingStoryProgressMap
  const timeline = gsap.timeline({
    defaults: {
      ease: 'power2.inOut',
    },
    paused: true,
  })

  timeline.to(
    values,
    {
      bookmarkLift: 0.18,
      bookRotX: -0.05,
      bookRotY: -0.58,
      bookRotZ: 0.02,
      bookScale: 1,
      bookY: 0.72,
      cameraX: -0.08,
      cameraY: 2.32,
      cameraZ: 5.34,
      coverOpen: 1.12,
      dustOpacity: 0.3,
      duration: add.end - add.start,
      ease: 'power3.out',
      pageOneTurn: 0.48,
      pageTwoTurn: 0.18,
    },
    add.start,
  )

  timeline.to(
    values,
    {
      bookmarkLift: 0.22,
      cameraX: 0.12,
      cameraY: 2.22,
      cameraZ: 5.5,
      copyOpacity: 0.34,
      copyScale: 0.82,
      copyX: ownerB[0],
      copyY: 0.72,
      copyZ: -0.78,
      duration: share.end - share.start,
      pathDraw: 1,
      pathOpacity: 0.68,
    },
    share.start,
  )

  timeline.to(
    values,
    {
      bookRotX: -0.02,
      bookRotY: 0.44,
      bookRotZ: 0.04,
      bookX: ownerB[0],
      bookY: 0.72,
      cameraX: 0.24,
      cameraY: 2.28,
      cameraZ: 5.42,
      copyOpacity: 0.04,
      coverOpen: 0.92,
      duration: give.end - give.start,
      pageOneTurn: 0.36,
      pageTwoTurn: 0.26,
      pathOpacity: 0.52,
    },
    give.start,
  )

  timeline.to(
    values,
    {
      bookmarkLift: 0,
      bookRotX: -0.16,
      bookRotY: -0.32,
      bookRotZ: -0.03,
      bookX: ownerA[0],
      bookY: 0.46,
      cameraX: 0.02,
      cameraY: 2.16,
      cameraZ: 5.92,
      copyOpacity: 0,
      coverOpen: 0.04,
      duration: returnStage.end - returnStage.start,
      ease: 'power2.inOut',
      pageOneTurn: 0.04,
      pageTwoTurn: 0.02,
      pathDraw: 0.18,
      pathOpacity: 0.22,
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
  const pageOneRef = useRef<THREE.Group | null>(null)
  const pageTwoRef = useRef<THREE.Group | null>(null)
  const bookmarkRef = useRef<THREE.Mesh | null>(null)
  const pathRef = useRef<THREE.Mesh | null>(null)
  const pathMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null)
  const dustRef = useRef<THREE.Points | null>(null)
  const dustMaterialRef = useRef<THREE.PointsMaterial | null>(null)
  const pointerTiltRef = useRef({ x: 0, y: 0 })
  const accentColor = stageAccentColors[activeStageId]
  const cameraTarget = size.width < 720 ? mobileCamera : desktopCamera

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

  useFrame((_, delta) => {
    const values = valuesRef.current
    const clampedDelta = Math.min(delta, 0.05)
    const tiltEnabled =
      quality.enablePointerTilt && isActive && !isFastScrolling
    const tiltX = tiltEnabled ? pointer.x * 0.18 : 0
    const tiltY = tiltEnabled ? pointer.y * 0.1 : 0

    easing.damp(pointerTiltRef.current, 'x', tiltX, 0.22, clampedDelta)
    easing.damp(pointerTiltRef.current, 'y', tiltY, 0.22, clampedDelta)

    if (bookRef.current) {
      easing.damp3(
        bookRef.current.position,
        [values.bookX, values.bookY, values.bookZ],
        0.18,
        clampedDelta,
      )
      easing.damp3(
        bookRef.current.scale,
        [values.bookScale, values.bookScale, values.bookScale],
        0.2,
        clampedDelta,
      )
      easing.dampE(
        bookRef.current.rotation,
        [
          values.bookRotX + pointerTiltRef.current.y,
          values.bookRotY + pointerTiltRef.current.x,
          values.bookRotZ,
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
        [values.copyScale, values.copyScale, values.copyScale],
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

    if (bookmarkRef.current) {
      easing.damp3(
        bookmarkRef.current.position,
        [0.24, -0.1 + values.bookmarkLift, 0.22],
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
    }

    if (dustRef.current) {
      dustRef.current.rotation.y += clampedDelta * 0.025
    }

    if (dustMaterialRef.current) {
      easing.damp(
        dustMaterialRef.current,
        'opacity',
        quality.dustCount > 0 ? values.dustOpacity : 0,
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
        fov={39}
        near={0.1}
        far={80}
        position={cameraTarget}
      />
      <fog attach="fog" args={[palette.shelfDeep, 6.8, 12]} />
      <ambientLight intensity={0.72} />
      <directionalLight
        castShadow={quality.shadow}
        intensity={quality.shadow ? 2.4 : 1.4}
        position={[-2.8, 5, 3.2]}
        shadow-mapSize-height={quality.level === 'high' ? 1024 : 512}
        shadow-mapSize-width={quality.level === 'high' ? 1024 : 512}
      />
      <pointLight color={palette.copperStrong} intensity={1.2} position={[2.4, 2.2, 2]} />

      <group position={[0, -0.56, 0]}>
        <CatalogBase />
        <OwnerAnchor accent={palette.copper} position={ownerA} />
        <OwnerAnchor accent={palette.anchorBlue} position={ownerB} />
        <mesh
          ref={pathRef}
          position={[0, 0.08, ownerA[2]]}
          scale={[0.001, 1, 1]}
        >
          <boxGeometry args={[Math.abs(ownerB[0] - ownerA[0]), 0.022, 0.022]} />
          <meshStandardMaterial
            ref={pathMaterialRef}
            color={palette.copper}
            emissive={palette.copper}
            emissiveIntensity={0.1}
            opacity={0}
            transparent
          />
        </mesh>

        <group ref={copyRef} position={[ownerA[0], 0.64, -0.72]} scale={0.76}>
          <BookModel opacity={0} qualityLevel={quality.level} transparent />
        </group>

        <group ref={bookRef} position={[ownerA[0], 0.12, -0.72]} scale={0.84}>
          <BookModel
            bookmarkRef={bookmarkRef}
            frontCoverRef={frontCoverRef}
            pageOneRef={pageOneRef}
            pageTwoRef={pageTwoRef}
            qualityLevel={quality.level}
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
          blur={2.8}
          far={4}
          frames={isActive ? Infinity : 1}
          height={8}
          opacity={0.28}
          position={[0, -0.58, -0.55]}
          resolution={quality.level === 'high' ? 512 : 256}
          scale={[6.4, 4.4]}
          width={8}
        />
      ) : null}
    </>
  )
}

type BookModelProps = {
  bookmarkRef?: RefObject<THREE.Mesh | null>
  frontCoverRef?: RefObject<THREE.Group | null>
  opacity?: number
  pageOneRef?: RefObject<THREE.Group | null>
  pageTwoRef?: RefObject<THREE.Group | null>
  qualityLevel: LandingStoryQuality['level']
  transparent?: boolean
}

function BookModel({
  bookmarkRef,
  frontCoverRef,
  opacity = 1,
  pageOneRef,
  pageTwoRef,
  qualityLevel,
  transparent = false,
}: BookModelProps) {
  const stripeCount = qualityLevel === 'high' ? 9 : qualityLevel === 'medium' ? 6 : 4
  const stripes = useMemo(
    () => Array.from({ length: stripeCount }, (_, index) => index),
    [stripeCount],
  )
  const book = landingStoryScene.book
  const spineWidth = 0.22
  const coverZ = book.paperThickness / 2 + book.coverThickness / 2

  return (
    <group>
      <mesh castShadow receiveShadow position={[0.04, 0, -coverZ]}>
        <boxGeometry
          args={[
            book.width + spineWidth,
            book.height + 0.08,
            book.coverThickness,
          ]}
        />
        <meshStandardMaterial
          color={palette.coverDeep}
          metalness={0.08}
          opacity={opacity}
          roughness={0.82}
          transparent={transparent}
        />
      </mesh>

      <mesh castShadow receiveShadow position={[0.13, 0, 0]}>
        <boxGeometry args={[book.width * 0.88, book.height * 0.92, book.paperThickness]} />
        <meshStandardMaterial
          color={palette.paper}
          opacity={opacity}
          roughness={0.64}
          transparent={transparent}
        />
      </mesh>

      <group position={[book.width * 0.58, 0, 0.02]}>
        {stripes.map((stripe) => (
          <mesh
            key={stripe}
            position={[
              0,
              -book.height * 0.38 + stripe * ((book.height * 0.76) / stripeCount),
              book.paperThickness / 2 + 0.012,
            ]}
          >
            <boxGeometry args={[0.035, 0.01, 0.012]} />
            <meshStandardMaterial
              color={palette.paperEdge}
              opacity={opacity * 0.82}
              roughness={0.9}
              transparent
            />
          </mesh>
        ))}
      </group>

      <mesh castShadow receiveShadow position={[-book.width * 0.53, 0, 0]}>
        <boxGeometry
          args={[spineWidth, book.height + 0.12, book.paperThickness + book.coverThickness * 2]}
        />
        <meshStandardMaterial
          color={palette.spine}
          metalness={0.04}
          opacity={opacity}
          roughness={0.9}
          transparent={transparent}
        />
      </mesh>

      <group ref={frontCoverRef} position={[-book.width * 0.54, 0, coverZ]}>
        <mesh castShadow receiveShadow position={[book.width * 0.5, 0, 0]}>
          <boxGeometry args={[book.width, book.height + 0.08, book.coverThickness]} />
          <meshStandardMaterial
            color={palette.cover}
            metalness={0.08}
            opacity={opacity}
            roughness={0.76}
            transparent={transparent}
          />
        </mesh>
        <mesh position={[book.width * 0.5, 0, book.coverThickness * 0.58]}>
          <boxGeometry args={[book.width * 0.78, book.height * 0.72, 0.01]} />
          <meshStandardMaterial
            color={palette.copper}
            opacity={opacity * 0.12}
            roughness={0.9}
            transparent
          />
        </mesh>
      </group>

      <group ref={pageOneRef} position={[-book.width * 0.46, 0, coverZ + 0.035]}>
        <mesh castShadow position={[book.width * 0.45, 0, 0]}>
          <boxGeometry args={[book.width * 0.86, book.height * 0.86, 0.008]} />
          <meshStandardMaterial
            color={palette.paper}
            opacity={opacity * 0.94}
            roughness={0.78}
            transparent
          />
        </mesh>
      </group>

      <group ref={pageTwoRef} position={[-book.width * 0.45, 0, coverZ + 0.055]}>
        <mesh castShadow position={[book.width * 0.43, 0.02, 0]}>
          <boxGeometry args={[book.width * 0.82, book.height * 0.82, 0.007]} />
          <meshStandardMaterial
            color="#f2e4c9"
            opacity={opacity * 0.72}
            roughness={0.84}
            transparent
          />
        </mesh>
      </group>

      <mesh ref={bookmarkRef} castShadow position={[0.24, -0.1, 0.22]}>
        <boxGeometry args={[0.095, book.height * 0.72, 0.018]} />
        <meshStandardMaterial
          color={palette.copperStrong}
          metalness={0.18}
          opacity={opacity}
          roughness={0.66}
          transparent={transparent}
        />
      </mesh>
    </group>
  )
}

function CatalogBase() {
  return (
    <group position={[0, -0.03, -0.72]}>
      <mesh receiveShadow position={[0, -0.18, 0]}>
        <boxGeometry args={[4.9, 0.22, 1.22]} />
        <meshStandardMaterial color={palette.shelf} roughness={0.92} />
      </mesh>
      <mesh receiveShadow position={[-0.82, -0.03, -0.02]}>
        <boxGeometry args={[1.12, 0.06, 1.08]} />
        <meshStandardMaterial color="#3a3027" roughness={0.86} />
      </mesh>
      <mesh receiveShadow position={[0.58, -0.02, 0.02]}>
        <boxGeometry args={[1.55, 0.06, 1.02]} />
        <meshStandardMaterial color="#2b231d" roughness={0.9} />
      </mesh>
      <mesh receiveShadow position={[1.82, -0.01, -0.04]}>
        <boxGeometry args={[0.82, 0.06, 0.96]} />
        <meshStandardMaterial color="#493226" roughness={0.88} />
      </mesh>
    </group>
  )
}

type OwnerAnchorProps = {
  accent: string
  position: readonly [number, number, number]
}

function OwnerAnchor({ accent, position }: OwnerAnchorProps) {
  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.17, 0.17, 0.025, 32]} />
        <meshStandardMaterial color={accent} opacity={0.42} roughness={0.8} transparent />
      </mesh>
      <mesh position={[0, 0.06, 0]}>
        <sphereGeometry args={[0.055, 18, 12]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={0.08}
          roughness={0.72}
        />
      </mesh>
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
        color={palette.copperStrong}
        depthWrite={false}
        opacity={0}
        size={0.018}
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
      currentMaterial.transparent = true
      currentMaterial.opacity = opacity
    })
  })
}
