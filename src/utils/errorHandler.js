import { errorTracking } from './errorTracking'

class ErrorHandler {
  constructor() {
    this.errors = []
    this.maxErrors = 50
  }

  logError(error, errorInfo) {
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo?.componentStack,
      timestamp: new Date(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    }

    this.errors.push(errorData)

    if (this.errors.length > this.maxErrors) {
      this.errors.shift()
    }

    console.error('Error logged:', errorData)

    // Send to error tracking service
    errorTracking.captureException(error, {
      componentStack: errorInfo?.componentStack,
      componentName: errorInfo?.componentName,
      extra: errorInfo?.extra,
    })

    if (this.shouldReportToServer(error)) {
      this.reportToServer(errorData)
    }
  }

  shouldReportToServer(error) {
    const isNetworkError = error.message?.includes('Network') || error.message?.includes('fetch')

    return !isNetworkError
  }

  async reportToServer(errorData) {
    try {
      if (import.meta.env.VITE_APP_MODE === 'production') {
        await fetch('/api/errors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(errorData),
        })
      }
    } catch (err) {
      console.error('Failed to report error to server:', err)
    }
  }

  getErrors() {
    return [...this.errors]
  }

  clearErrors() {
    this.errors = []
  }

  getLastError() {
    return this.errors[this.errors.length - 1] || null
  }

  isUndefinedError(error) {
    const message = typeof error === 'string' ? error : error.message
    return (
      message.includes('undefined') ||
      message.includes('Cannot read') ||
      message.includes('null') ||
      message.includes('is not defined')
    )
  }

  isNetworkError(error) {
    const message = typeof error === 'string' ? error : error.message
    return (
      message.includes('Network') ||
      message.includes('fetch') ||
      message.includes('timeout') ||
      message.includes('Failed to fetch')
    )
  }
}

export const errorHandler = new ErrorHandler()

window.addEventListener('error', event => {
  errorHandler.logError(new Error(event.message), { componentStack: event.filename })
})

window.addEventListener('unhandledrejection', event => {
  errorHandler.logError(new Error(event.reason?.message || 'Unhandled promise rejection'), {})
})

