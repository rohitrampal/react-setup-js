import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'

/**
 * App Store
 * 
 * Stores: App-wide settings, feature flags, etc.
 * Safe to persist - no sensitive data
 */
export const useAppStore = create(
  devtools(
    persist(
      (set, get) => ({
        // Feature flags
        features: {
          pwa: true,
          offline: true,
          analytics: false,
          errorTracking: false,
        },
        
        // App settings
        language: 'en',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        dateFormat: 'MM/DD/YYYY',
        timeFormat: '12h',
        
        // Performance
        performanceMode: false,
        animationsEnabled: true,
        
        // Actions
        setLanguage: (language) => {
          set({ language })
          // Update i18n
          if (window.i18n) {
            window.i18n.changeLanguage(language)
          }
        },
        
        setTimezone: (timezone) => {
          set({ timezone })
        },
        
        setDateFormat: (format) => {
          set({ dateFormat: format })
        },
        
        setTimeFormat: (format) => {
          set({ timeFormat: format })
        },
        
        setFeature: (feature, enabled) => {
          const { features } = get()
          set({
            features: {
              ...features,
              [feature]: enabled,
            },
          })
        },
        
        setPerformanceMode: (enabled) => {
          set({ performanceMode: enabled })
        },
        
        setAnimationsEnabled: (enabled) => {
          set({ animationsEnabled: enabled })
        },
        
        // Reset to defaults
        reset: () => {
          set({
            language: 'en',
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            dateFormat: 'MM/DD/YYYY',
            timeFormat: '12h',
            performanceMode: false,
            animationsEnabled: true,
          })
        },
      }),
      {
        name: 'app-storage',
        // Safe to persist - no sensitive data
      }
    ),
    { name: 'AppStore' }
  )
)

