import { useMemo } from 'react'
import { useAuth } from '@/modules/auth'
import { ROLE_PERMISSIONS } from '../types'

export const useRole = () => {
  const { user } = useAuth()

  const role = useMemo(() => {
    if (!user) return 'customer'
    return user?.role || 'customer'
  }, [user])

  const permissions = useMemo(() => {
    return ROLE_PERMISSIONS[role]
  }, [role])

  const hasPermission = permission => {
    return permissions[permission]
  }

  const hasAnyRole = roles => {
    return roles.includes(role)
  }

  return {
    role,
    permissions,
    hasPermission,
    hasAnyRole,
    isCustomer: role === 'customer',
    isWaiter: role === 'waiter',
    isChef: role === 'chef',
    isManager: role === 'manager',
    isAdmin: role === 'admin',
  }
}
