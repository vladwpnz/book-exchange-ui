import { RouterProvider } from 'react-router-dom'

import { AuthProvider } from './auth/AuthContext'
import { ToastProvider } from './components/ToastProvider'
import { router } from './router'

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ToastProvider>
  )
}

export default App
