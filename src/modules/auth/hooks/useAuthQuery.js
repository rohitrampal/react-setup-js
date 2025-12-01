import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/services/api/client'

const AUTH_KEYS = {
  currentUser: ['auth', 'currentUser'],
  login: ['auth', 'login'],
  register: ['auth', 'register'],
}

export const useCurrentUser = () => {
  return useQuery({
    queryKey: AUTH_KEYS.currentUser,
    queryFn: async () => {
      const response = await apiClient.get('/auth/me', {
        skipCache: true,
      })
      return response.data
    },
    enabled: !!localStorage.getItem('access_token'),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}

export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async credentials => {
      const response = await apiClient.post('/auth/login', credentials, {
        skipAuth: true,
        skipCache: true,
        skipDeduplication: true,
      })
      localStorage.setItem('access_token', response.data.accessToken)
      localStorage.setItem('refresh_token', response.data.refreshToken)
      return response.data
    },
    onSuccess: data => {
      queryClient.setQueryData(AUTH_KEYS.currentUser, data.user)
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.currentUser })
    },
  })
}

export const useRegister = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async data => {
      const response = await apiClient.post('/auth/register', data, {
        skipAuth: true,
        skipCache: true,
        skipDeduplication: true,
      })
      localStorage.setItem('access_token', response.data.accessToken)
      localStorage.setItem('refresh_token', response.data.refreshToken)
      return response.data
    },
    onSuccess: data => {
      queryClient.setQueryData(AUTH_KEYS.currentUser, data.user)
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.currentUser })
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      await apiClient.post('/auth/logout', {}, { skipCache: true })
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: AUTH_KEYS.currentUser })
      queryClient.clear()
    },
  })
}
