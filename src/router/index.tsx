import {
  Suspense,
  lazy,
  type ComponentType,
  type ReactElement,
} from 'react'
import { Navigate, createBrowserRouter } from 'react-router-dom'

import { ProtectedRoute } from '../auth/ProtectedRoute'
import { RouteLoadingFallback } from '../components/RouteLoadingFallback'
import { AppLayout } from '../layout/AppLayout'

function lazyPage<TExportName extends string>(
  loadPage: () => Promise<Record<TExportName, ComponentType>>,
  exportName: TExportName,
) {
  return lazy(async () => {
    const pageModule = await loadPage()

    return { default: pageModule[exportName] }
  })
}

const LandingPage = lazyPage(
  () => import('../pages/LandingPage'),
  'LandingPage',
)
const LoginPage = lazyPage(() => import('../pages/LoginPage'), 'LoginPage')
const RegisterPage = lazyPage(
  () => import('../pages/RegisterPage'),
  'RegisterPage',
)
const MyBooksPage = lazyPage(
  () => import('../pages/MyBooksPage'),
  'MyBooksPage',
)
const ProfilePage = lazyPage(
  () => import('../pages/ProfilePage'),
  'ProfilePage',
)
const SettingsPage = lazyPage(
  () => import('../pages/SettingsPage'),
  'SettingsPage',
)
const HeldBooksPage = lazyPage(
  () => import('../pages/HeldBooksPage'),
  'HeldBooksPage',
)
const AddBookPage = lazyPage(
  () => import('../pages/AddBookPage'),
  'AddBookPage',
)
const ShareBookPage = lazyPage(
  () => import('../pages/ShareBookPage'),
  'ShareBookPage',
)
const GiveBookPage = lazyPage(
  () => import('../pages/GiveBookPage'),
  'GiveBookPage',
)
const ReturnBookPage = lazyPage(
  () => import('../pages/ReturnBookPage'),
  'ReturnBookPage',
)
const AdminPanelPage = lazyPage(
  () => import('../pages/AdminPanelPage'),
  'AdminPanelPage',
)

function withPageSuspense(element: ReactElement, label: string) {
  return (
    <Suspense
      fallback={<RouteLoadingFallback fullPage label={`Loading ${label}`} />}
    >
      {element}
    </Suspense>
  )
}

function withAppSuspense(element: ReactElement, label: string) {
  return (
    <Suspense fallback={<RouteLoadingFallback label={`Loading ${label}`} />}>
      {element}
    </Suspense>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: withPageSuspense(<LandingPage />, 'landing page'),
  },
  {
    path: '/login',
    element: withPageSuspense(<LoginPage />, 'login page'),
  },
  {
    path: '/register',
    element: withPageSuspense(<RegisterPage />, 'register page'),
  },
  {
    element: <ProtectedRoute />,
    children: [
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
            element: withAppSuspense(<MyBooksPage />, 'my books'),
          },
          {
            path: 'profile',
            element: withAppSuspense(<ProfilePage />, 'profile'),
          },
          {
            path: 'settings',
            element: withAppSuspense(<SettingsPage />, 'settings'),
          },
          {
            path: 'held-books',
            element: withAppSuspense(<HeldBooksPage />, 'held books'),
          },
          {
            path: 'add-book',
            element: withAppSuspense(<AddBookPage />, 'add book'),
          },
          {
            path: 'add',
            element: withAppSuspense(<AddBookPage />, 'add book'),
          },
          {
            path: 'share-book',
            element: withAppSuspense(<ShareBookPage />, 'share book'),
          },
          {
            path: 'give-book',
            element: withAppSuspense(<GiveBookPage />, 'give book'),
          },
          {
            path: 'return-book',
            element: withAppSuspense(<ReturnBookPage />, 'return book'),
          },
          {
            path: 'admin',
            element: withAppSuspense(<AdminPanelPage />, 'admin'),
          },
        ],
      },
    ],
  },
])
