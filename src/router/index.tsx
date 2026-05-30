import { Navigate, createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '../layout/AppLayout'
import { AddBookPage } from '../pages/AddBookPage'
import { AdminPanelPage } from '../pages/AdminPanelPage'
import { GiveBookPage } from '../pages/GiveBookPage'
import { HeldBooksPage } from '../pages/HeldBooksPage'
import { LandingPage } from '../pages/LandingPage'
import { LoginPage } from '../pages/LoginPage'
import { MyBooksPage } from '../pages/MyBooksPage'
import { RegisterPage } from '../pages/RegisterPage'
import { ReturnBookPage } from '../pages/ReturnBookPage'
import { ShareBookPage } from '../pages/ShareBookPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/app',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/app/my-books" replace />,
      },
      {
        path: 'my-books',
        element: <MyBooksPage />,
      },
      {
        path: 'held-books',
        element: <HeldBooksPage />,
      },
      {
        path: 'add-book',
        element: <AddBookPage />,
      },
      {
        path: 'share-book',
        element: <ShareBookPage />,
      },
      {
        path: 'give-book',
        element: <GiveBookPage />,
      },
      {
        path: 'return-book',
        element: <ReturnBookPage />,
      },
      {
        path: 'admin',
        element: <AdminPanelPage />,
      },
    ],
  },
])
