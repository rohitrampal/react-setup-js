import { Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/modules/auth'

export const RoleGuard = ({ children, allowedRoles, fallback }) => {
  const { t } = useTranslation()
  const { user, loading } = useAuth()

  if (loading) {
    return <div aria-label={t('common.loading')}>{t('common.loading')}</div>
  }

  if (!user) {
    return <Navigate to='/login' replace />
  }

  const userRole = user?.role || 'customer'

  if (!allowedRoles.includes(userRole)) {
    return fallback ? <>{fallback}</> : <Navigate to='/dashboard' replace />
  }

  return <>{children}</>
}

