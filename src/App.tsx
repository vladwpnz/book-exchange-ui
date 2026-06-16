import { RouterProvider } from 'react-router-dom'

import { AuthProvider } from './auth/AuthContext'
import { ToastProvider } from './components/ToastProvider'
import { router } from './router'
import { ThemeProvider } from './theme/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App
