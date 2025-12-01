import axios from 'axios'
import { env } from '@/config/env'
import { CacheManager } from '@/utils/cache'
import { requestDeduplication } from './deduplication'
import { rateLimiter } from './rateLimiter'
import { SecurityUtils } from '@/utils/security'

class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: env.apiUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.refreshTokenPromise = null
    this.csrfToken = null

    this.setupInterceptors()
    this.initializeCSRFToken()
  }

  initializeCSRFToken() {
    const stored = localStorage.getItem('csrf_token')
    if (stored) {
      this.csrfToken = stored
    } else {
      this.csrfToken = SecurityUtils.generateCSRFToken()
      localStorage.setItem('csrf_token', this.csrfToken)
    }
  }

  setupInterceptors() {
    this.client.interceptors.request.use(
      config => {
        const token = this.getAccessToken()
        if (token && !config.skipAuth) {
          config.headers.Authorization = `Bearer ${token}`
        }

        if (this.csrfToken) {
          config.headers['X-CSRF-Token'] = this.csrfToken
        }

        config.headers['X-Requested-With'] = 'XMLHttpRequest'

        return config
      },
      error => {
        return Promise.reject(error)
      }
    )

    this.client.interceptors.response.use(
      response => {
        return response
      },
      async error => {
        if (!axios.isAxiosError(error)) {
          return Promise.reject(this.formatError(error))
        }

        const originalRequest = error.config

        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
          originalRequest._retry = true

          try {
            const newToken = await this.refreshAccessToken()
            originalRequest.headers.Authorization = `Bearer ${newToken}`
            return this.client(originalRequest)
          } catch (refreshError) {
            this.handleLogout()
            return Promise.reject(refreshError)
          }
        }

        return Promise.reject(this.formatError(error))
      }
    )
  }

  async refreshAccessToken() {
    if (this.refreshTokenPromise) {
      return this.refreshTokenPromise
    }

    this.refreshTokenPromise = (async () => {
      try {
        const refreshToken = this.getRefreshToken()
        if (!refreshToken) {
          throw new Error('No refresh token available')
        }

        const response = await axios.post(`${env.apiUrl}/auth/refresh`, {
          refreshToken,
        })

        const { accessToken, refreshToken: newRefreshToken } = response.data

        this.setTokens(accessToken, newRefreshToken)

        return accessToken
      } catch (error) {
        this.handleLogout()
        throw error
      } finally {
        this.refreshTokenPromise = null
      }
    })()

    return this.refreshTokenPromise
  }

  formatError(error) {
    if (axios.isAxiosError(error)) {
      return {
        message: error.response?.data?.message || error.message || 'An error occurred',
        status: error.response?.status || 500,
        errors: error.response?.data?.errors,
      }
    }

    return {
      message: error instanceof Error ? error.message : 'An unknown error occurred',
      status: 500,
    }
  }

  getAccessToken() {
    return localStorage.getItem('access_token')
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token')
  }

  setTokens(accessToken, refreshToken) {
    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('refresh_token', refreshToken)
  }

  handleLogout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    window.location.href = '/login'
  }

  generateCacheKey(method, url, params) {
    return `api_cache_${method}_${url}_${JSON.stringify(params || {})}`
  }

  async get(url, config) {
    const cacheKey = this.generateCacheKey('GET', url, config?.params)
    const ttl = config?.ttl || 300000

    if (!config?.skipCache && CacheManager.has(cacheKey)) {
      const cached = CacheManager.get(cacheKey)
      if (cached) return cached
    }

    await rateLimiter.checkLimit(url)

    const requestFn = () => this.client.get(url, config).then(res => res.data)

    const key = requestDeduplication.generateKey('GET', url, config?.params)
    const data = config?.skipDeduplication
      ? await requestFn()
      : await requestDeduplication.deduplicate(key, requestFn)

    if (!config?.skipCache) {
      CacheManager.set(cacheKey, data, ttl)
    }

    return data
  }

  async post(url, data, config) {
    await rateLimiter.checkLimit(url)

    const requestFn = () => this.client.post(url, data, config).then(res => res.data)

    const key = requestDeduplication.generateKey('POST', url, data)
    return config?.skipDeduplication
      ? await requestFn()
      : await requestDeduplication.deduplicate(key, requestFn)
  }

  async put(url, data, config) {
    await rateLimiter.checkLimit(url)

    const requestFn = () => this.client.put(url, data, config).then(res => res.data)

    const key = requestDeduplication.generateKey('PUT', url, data)
    return config?.skipDeduplication
      ? await requestDeduplication.deduplicate(key, requestFn)
      : await requestFn()
  }

  async patch(url, data, config) {
    await rateLimiter.checkLimit(url)

    const requestFn = () => this.client.patch(url, data, config).then(res => res.data)

    const key = requestDeduplication.generateKey('PATCH', url, data)
    return config?.skipDeduplication
      ? await requestDeduplication.deduplicate(key, requestFn)
      : await requestFn()
  }

  async delete(url, config) {
    await rateLimiter.checkLimit(url)

    return this.client.delete(url, config).then(res => res.data)
  }
}

export const apiClient = new ApiClient()
