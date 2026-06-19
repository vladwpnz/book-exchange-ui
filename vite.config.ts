import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import tailwindcss from '@tailwindcss/vite'

const routeChunks = {
  '/src/pages/LandingPage.tsx': 'route-landing',
  '/src/pages/LoginPage.tsx': 'route-login',
  '/src/pages/RegisterPage.tsx': 'route-register',
  '/src/pages/MyBooksPage.tsx': 'route-app-my-books',
  '/src/pages/ProfilePage.tsx': 'route-app-profile',
  '/src/pages/SettingsPage.tsx': 'route-app-settings',
  '/src/pages/HeldBooksPage.tsx': 'route-app-held-books',
  '/src/pages/AddBookPage.tsx': 'route-app-add-book',
  '/src/pages/ShareBookPage.tsx': 'route-app-share-book',
  '/src/pages/GiveBookPage.tsx': 'route-app-give-book',
  '/src/pages/ReturnBookPage.tsx': 'route-app-return-book',
  '/src/pages/AdminPanelPage.tsx': 'route-app-admin',
} as const

function getRouteChunk(normalizedId: string) {
  return Object.entries(routeChunks).find(([modulePath]) =>
    normalizedId.endsWith(modulePath),
  )?.[1]
}

function getDependencyChunk(normalizedId: string) {
  if (!normalizedId.includes('/node_modules/')) {
    return undefined
  }

  if (
    normalizedId.includes('/node_modules/react-dom/') ||
    normalizedId.includes('/node_modules/scheduler/')
  ) {
    return 'react-dom'
  }

  if (normalizedId.includes('/node_modules/react/')) {
    return 'react'
  }

  if (normalizedId.includes('/node_modules/three/')) {
    return 'three-core'
  }

  if (normalizedId.includes('/node_modules/three-stdlib/')) {
    return 'three-stdlib'
  }

  if (normalizedId.includes('/node_modules/@react-three/fiber/')) {
    return 'react-three-fiber'
  }

  if (normalizedId.includes('/node_modules/@react-three/drei/')) {
    return 'react-three-drei'
  }

  if (normalizedId.includes('/node_modules/gsap/')) {
    return 'gsap'
  }

  if (normalizedId.includes('/node_modules/maath/')) {
    return 'maath'
  }

  if (
    normalizedId.includes('/node_modules/react-reconciler/') ||
    normalizedId.includes('/node_modules/use-sync-external-store/')
  ) {
    return 'react-rendering-runtime'
  }

  if (
    normalizedId.includes('/node_modules/suspend-react/') ||
    normalizedId.includes('/node_modules/its-fine/') ||
    normalizedId.includes('/node_modules/zustand/')
  ) {
    return 'react-three-runtime'
  }

  if (
    normalizedId.includes('/node_modules/meshline/') ||
    normalizedId.includes('/node_modules/troika-three-text/') ||
    normalizedId.includes('/node_modules/tunnel-rat/') ||
    normalizedId.includes('/node_modules/camera-controls/') ||
    normalizedId.includes('/node_modules/detect-gpu/')
  ) {
    return 'react-three-extras'
  }

  if (
    normalizedId.includes('/node_modules/react-router/') ||
    normalizedId.includes('/node_modules/react-router-dom/')
  ) {
    return 'react-router'
  }

  if (
    normalizedId.includes('/node_modules/i18next/') ||
    normalizedId.includes('/node_modules/react-i18next/')
  ) {
    return 'i18n'
  }

  if (normalizedId.includes('/node_modules/axios/')) {
    return 'axios'
  }

  return undefined
}

function getChunkName(id: string) {
  const normalizedId = id.replace(/\\/g, '/')

  return getDependencyChunk(normalizedId) ?? getRouteChunk(normalizedId) ?? null
}

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    mode === 'analyze'
      ? visualizer({
          filename: 'dist/bundle-stats.html',
          gzipSize: true,
          brotliSize: true,
          open: false,
          template: 'treemap',
        })
      : undefined,
  ],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          includeDependenciesRecursively: false,
          groups: [
            {
              name: getChunkName,
              maxSize: 420_000,
              priority: 10,
            },
          ],
        },
        strictExecutionOrder: true,
      },
    },
  },
}))
