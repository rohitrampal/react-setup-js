export const env = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  appMode: import.meta.env.VITE_APP_MODE || 'development',
  enableDevTools: import.meta.env.VITE_ENABLE_DEV_TOOLS === 'true',
  enableErrorTracking: import.meta.env.VITE_ENABLE_ERROR_TRACKING === 'true',
  enablePerformanceMonitoring: import.meta.env.VITE_ENABLE_PERFORMANCE_MONITORING === 'true',
  sentryDsn: import.meta.env.VITE_SENTRY_DSN,
  analyticsId: import.meta.env.VITE_ANALYTICS_ID,
}
