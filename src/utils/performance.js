class PerformanceMonitor {
  constructor() {
    this.enabled = import.meta.env.VITE_ENABLE_PERFORMANCE_MONITORING === 'true' || true
    this.sampleRate = parseFloat(import.meta.env.VITE_PERFORMANCE_SAMPLE_RATE || '1.0')
    this.metrics = []
    this.maxMetrics = 100
  }

  init() {
    if (!this.enabled || typeof window === 'undefined') {
      return
    }

    // Initialize Web Vitals if available
    this.initWebVitals()

    // Monitor long tasks
    this.monitorLongTasks()

    // Monitor memory (if available)
    this.monitorMemory()

    // Monitor network performance
    this.monitorNetwork()
  }

  async initWebVitals() {
    try {
      // Dynamically import web-vitals to reduce bundle size
      const { onCLS, onFID, onFCP, onLCP, onTTFB, onINP } = await import('web-vitals')

      onCLS(this.reportMetric.bind(this))
      onFID(this.reportMetric.bind(this))
      onFCP(this.reportMetric.bind(this))
      onLCP(this.reportMetric.bind(this))
      onTTFB(this.reportMetric.bind(this))

      // INP (Interaction to Next Paint) - newer metric
      if (onINP) {
        onINP(this.reportMetric.bind(this))
      }
    } catch (error) {
      console.warn('Web Vitals not available:', error)
    }
  }

  reportMetric(metric) {
    if (!this.shouldSample()) {
      return
    }

    const metricData = {
      name: metric.name,
      value: metric.value,
      id: metric.id,
      rating: metric.rating,
      delta: metric.delta,
      timestamp: Date.now(),
      url: window.location.href,
    }

    this.metrics.push(metricData)

    if (this.metrics.length > this.maxMetrics) {
      this.metrics.shift()
    }

    // Send to analytics service
    this.sendToAnalytics(metricData)

    // Log in development
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.log(`[Performance] ${metricData.name}:`, metricData.value, metricData.rating)
    }
  }

  shouldSample() {
    return Math.random() < this.sampleRate
  }

  async sendToAnalytics(metricData) {
    try {
      // Option 1: Google Analytics
      if (window.gtag && import.meta.env.VITE_ANALYTICS_ENABLED === 'true') {
        window.gtag('event', metricData.name, {
          event_category: 'Web Vitals',
          value: Math.round(metricData.name === 'CLS' ? metricData.value * 1000 : metricData.value),
          event_label: metricData.id,
          non_interaction: true,
        })
      }

      // Option 2: Custom analytics endpoint
      if (import.meta.env.VITE_APP_MODE === 'production') {
        await fetch('/api/analytics/performance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(metricData),
        }).catch(() => {
          // Silently fail if endpoint doesn't exist
        })
      }
    } catch (error) {
      console.error('Failed to send performance metric:', error)
    }
  }

  monitorLongTasks() {
    if (!('PerformanceObserver' in window)) {
      return
    }

    try {
      const observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            // Task took longer than 50ms
            this.reportLongTask({
              duration: entry.duration,
              startTime: entry.startTime,
              name: entry.name,
            })
          }
        }
      })

      observer.observe({ entryTypes: ['longtask'] })
    } catch (error) {
      // Long task API not supported
    }
  }

  reportLongTask(taskData) {
    if (import.meta.env.DEV) {
      console.warn('[Performance] Long task detected:', taskData)
    }

    this.sendToAnalytics({
      name: 'longtask',
      value: taskData.duration,
      ...taskData,
    })
  }

  monitorMemory() {
    if (!('memory' in performance)) {
      return
    }

    // Monitor memory usage periodically
    setInterval(() => {
      const memory = performance.memory
      const memoryData = {
        name: 'memory',
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit,
        percentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
        timestamp: Date.now(),
      }

      if (memoryData.percentage > 80) {
        // Memory usage above 80%
        console.warn('[Performance] High memory usage:', memoryData)
      }
    }, 60000) // Check every minute
  }

  monitorNetwork() {
    if (!('PerformanceObserver' in window)) {
      return
    }

    try {
      const observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'resource') {
            const resourceData = {
              name: entry.name,
              duration: entry.duration,
              size: entry.transferSize,
              type: entry.initiatorType,
              timestamp: Date.now(),
            }

            // Log slow resources
            if (entry.duration > 1000) {
              console.warn('[Performance] Slow resource:', resourceData)
            }
          }
        }
      })

      observer.observe({ entryTypes: ['resource'] })
    } catch (error) {
      // Resource timing not supported
    }
  }

  mark(name) {
    if (typeof performance !== 'undefined' && performance.mark) {
      performance.mark(name)
    }
  }

  measure(name, startMark, endMark) {
    if (typeof performance !== 'undefined' && performance.measure) {
      try {
        performance.measure(name, startMark, endMark)
        const measure = performance.getEntriesByName(name)[0]
        return measure?.duration || 0
      } catch (error) {
        return 0
      }
    }
    return 0
  }

  getMetrics() {
    return [...this.metrics]
  }

  clearMetrics() {
    this.metrics = []
  }
}

export const performanceMonitor = new PerformanceMonitor()

// Initialize on import
if (typeof window !== 'undefined') {
  performanceMonitor.init()
}
