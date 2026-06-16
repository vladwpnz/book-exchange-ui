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

function manualChunks(id: string) {
  const normalizedId = id.replace(/\\/g, '/')
  const routeChunk = getRouteChunk(normalizedId)

  if (routeChunk) {
    return routeChunk
  }

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
    rollupOptions: {
      output: {
        manualChunks,
      },
    },
  },
}))
