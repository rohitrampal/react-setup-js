import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'

/**
 * UI Store
 *
 * Stores: UI preferences, theme, sidebar state, etc.
 * Safe to persist - no sensitive data
 */
export const useUIStore = create(
  devtools(
    persist(
      (set, get) => ({
        // Theme
        theme: 'light',

        // Sidebar
        sidebarOpen: true,
        sidebarCollapsed: false,

        // Layout
        layout: 'default',
        compactMode: false,

        // Notifications
        notificationsEnabled: true,
        notificationSound: true,

        // Actions
        setTheme: theme => {
          set({ theme })
          // Also update localStorage for MUI theme
          localStorage.setItem('theme_mode', theme)
        },

        toggleTheme: () => {
          const { theme } = get()
          const newTheme = theme === 'light' ? 'dark' : 'light'
          set({ theme: newTheme })
          localStorage.setItem('theme_mode', newTheme)
        },

        setSidebarOpen: open => {
          set({ sidebarOpen: open })
        },

        toggleSidebar: () => {
          const { sidebarOpen } = get()
          set({ sidebarOpen: !sidebarOpen })
        },

        setSidebarCollapsed: collapsed => {
          set({ sidebarCollapsed: collapsed })
        },

        setLayout: layout => {
          set({ layout })
        },

        setCompactMode: compact => {
          set({ compactMode: compact })
        },

        setNotificationsEnabled: enabled => {
          set({ notificationsEnabled: enabled })
        },

        setNotificationSound: sound => {
          set({ notificationSound: sound })
        },

        // Reset to defaults
        reset: () => {
          set({
            theme: 'light',
            sidebarOpen: true,
            sidebarCollapsed: false,
            layout: 'default',
            compactMode: false,
            notificationsEnabled: true,
            notificationSound: true,
          })
        },
      }),
      {
        name: 'ui-storage',
        // Safe to persist - no sensitive data
      }
    ),
    { name: 'UIStore' }
  )
)
