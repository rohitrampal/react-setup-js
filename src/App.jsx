import { lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeWrapper } from '@/hooks/useTheme'
import { queryClient } from '@/config/queryClient'
import { ErrorBoundary } from '@/components/errors'
import { PageSuspense } from '@/components/lazy'
import { Layout } from '@/components/layout'
import { ProtectedRoute } from '@/components/routes'
import { env } from '@/config/env'
import '@/styles/globals.css'

// Lazy load DevTools only in development
const ReactQueryDevtools = import.meta.env.DEV
  ? lazy(() =>
      import('@tanstack/react-query-devtools').then(module => ({
        default: module.ReactQueryDevtools,
      }))
    )
  : () => null

// Lazy load all pages for code splitting
const LoginPage = lazy(() =>
  import('@/modules/login').then(module => ({ default: module.LoginPage }))
)

const DashboardPage = lazy(() =>
  import('@/modules/dashboard').then(module => ({ default: module.DashboardPage }))
)

const ProfilePage = lazy(() =>
  import('@/modules/profile').then(module => ({ default: module.ProfilePage }))
)

const ListPage = lazy(() => import('@/modules/list').then(module => ({ default: module.ListPage })))

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <ThemeWrapper>
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route
                    path='/login'
                    element={
                      <PageSuspense>
                        <ErrorBoundary>
                          <LoginPage />
                        </ErrorBoundary>
                      </PageSuspense>
                    }
                  />
                  <Route
                    path='/dashboard'
                    element={
                      <ProtectedRoute>
                        <PageSuspense>
                          <ErrorBoundary>
                            <DashboardPage />
                          </ErrorBoundary>
                        </PageSuspense>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path='/profile'
                    element={
                      <ProtectedRoute>
                        <PageSuspense>
                          <ErrorBoundary>
                            <ProfilePage />
                          </ErrorBoundary>
                        </PageSuspense>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path='/list'
                    element={
                      <ProtectedRoute>
                        <PageSuspense>
                          <ErrorBoundary>
                            <ListPage />
                          </ErrorBoundary>
                        </PageSuspense>
                      </ProtectedRoute>
                    }
                  />
                  <Route path='/' element={<Navigate to='/dashboard' replace />} />
                  <Route path='*' element={<Navigate to='/dashboard' replace />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </ThemeWrapper>
        </HelmetProvider>
        {import.meta.env.DEV && env.enableDevTools && (
          <PageSuspense>
            <ReactQueryDevtools initialIsOpen={false} />
          </PageSuspense>
        )}
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App

