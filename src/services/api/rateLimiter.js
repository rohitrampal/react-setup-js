import { SecurityUtils } from '@/utils/security'

class RateLimiter {
  constructor() {
    this.config = {
      maxRequests: 100,
      windowMs: 60000,
    }
  }

  setConfig(config) {
    this.config = { ...this.config, ...config }
  }

  async checkLimit(endpoint) {
    const key = `api_rate_limit_${endpoint}`
    const result = SecurityUtils.rateLimitCheck(key, this.config.maxRequests, this.config.windowMs)

    if (!result.allowed) {
      throw new Error('Rate limit exceeded. Please try again later.')
    }

    return true
  }
}

export const rateLimiter = new RateLimiter()
