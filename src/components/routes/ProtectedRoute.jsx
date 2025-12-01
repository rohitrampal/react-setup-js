import { Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/modules/auth'

export const ProtectedRoute = ({ children }) => {
  const { t } = useTranslation()
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <div aria-label={t('common.loading')}>{t('common.loading')}</div>
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  return <>{children}</>
}
