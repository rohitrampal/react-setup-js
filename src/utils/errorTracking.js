class ErrorTrackingService {
  constructor() {
    this.dsn = import.meta.env.VITE_SENTRY_DSN
    this.environment = import.meta.env.VITE_SENTRY_ENVIRONMENT || import.meta.env.VITE_APP_MODE
    this.enabled = import.meta.env.VITE_ENABLE_ERROR_TRACKING === 'true' || !!this.dsn
    this.sampleRate = parseFloat(import.meta.env.VITE_ERROR_SAMPLE_RATE || '1.0')
  }

  init() {
    if (!this.enabled || !this.dsn) {
      // eslint-disable-next-line no-console
      console.log('Error tracking disabled or DSN not configured')
      return
    }

    // Initialize Sentry if DSN is provided
    if (this.dsn && typeof window !== 'undefined') {
      // For now, we'll use a custom implementation
      // In production, you would initialize Sentry here:
      // Sentry.init({ dsn: this.dsn, environment: this.environment })
      // eslint-disable-next-line no-console
      console.log('Error tracking initialized')
    }
  }

  captureException(error, errorInfo = {}) {
    if (!this.shouldCapture()) {
      return
    }

    const errorData = {
      message: error?.message || 'Unknown error',
      stack: error?.stack,
      componentStack: errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      environment: this.environment,
      level: 'error',
      tags: {
        component: errorInfo?.componentName,
        route: window.location.pathname,
      },
      extra: errorInfo?.extra || {},
    }

    // Send to error tracking service
    this.sendToService(errorData)

    // Also log to console in development
    if (import.meta.env.DEV) {
      console.error('Error captured:', errorData)
    }
  }

  captureMessage(message, level = 'info', context = {}) {
    if (!this.shouldCapture()) {
      return
    }

    const messageData = {
      message,
      level,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      environment: this.environment,
      context,
    }

    this.sendToService(messageData)

    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.log(`[${level.toUpperCase()}]`, messageData)
    }
  }

  shouldCapture() {
    if (!this.enabled) return false
    return Math.random() < this.sampleRate
  }

  async sendToService(errorData) {
    try {
      // Option 1: Send to Sentry (if configured)
      if (this.dsn && window.Sentry) {
        window.Sentry.captureException(new Error(errorData.message), {
          contexts: {
            react: {
              componentStack: errorData.componentStack,
            },
          },
          tags: errorData.tags,
          extra: errorData.extra,
        })
        return
      }

      // Option 2: Send to custom error endpoint
      if (import.meta.env.VITE_APP_MODE === 'production') {
        const response = await fetch('/api/errors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(errorData),
        })

        if (!response.ok) {
          console.error('Failed to send error to tracking service')
        }
      }
    } catch (err) {
      console.error('Error tracking service unavailable:', err)
    }
  }

  setUser(user) {
    if (this.dsn && window.Sentry) {
      window.Sentry.setUser(user)
    }
  }

  setContext(key, context) {
    if (this.dsn && window.Sentry) {
      window.Sentry.setContext(key, context)
    }
  }

  addBreadcrumb(breadcrumb) {
    if (this.dsn && window.Sentry) {
      window.Sentry.addBreadcrumb(breadcrumb)
    }
  }
}

export const errorTracking = new ErrorTrackingService()

// Initialize on import
if (typeof window !== 'undefined') {
  errorTracking.init()
}
