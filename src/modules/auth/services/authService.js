import { apiClient } from '@/services/api/client'

export const authService = {
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials, {
      skipAuth: true,
      skipCache: true,
      skipDeduplication: true,
    })
    return response.data
  },

  register: async (data) => {
    const response = await apiClient.post('/auth/register', data, {
      skipAuth: true,
      skipCache: true,
      skipDeduplication: true,
    })
    return response.data
  },

  logout: async () => {
    await apiClient.post('/auth/logout', {}, { skipCache: true })
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  },

  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/me')
    return response.data
  },
}

