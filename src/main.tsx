import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { RouteLoadingFallback } from './components/RouteLoadingFallback'
import { i18nReady } from './i18n/i18n'
import './index.css'
import App from './App.tsx'

const root = createRoot(document.getElementById('root')!)

root.render(
  <StrictMode>
    <RouteLoadingFallback fullPage />
  </StrictMode>,
)

void i18nReady.finally(() => {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
