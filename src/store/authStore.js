import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'
import { validateUser } from '@/utils/stateValidation'
import { secureStorage } from '@/utils/secureStorage'

/**
 * Auth Store
 *
 * Stores: User profile data (non-sensitive)
 * Does NOT store: Tokens (kept in encrypted storage)
 *
 * Security:
 * - User data is validated on load
 * - State is persisted securely
 * - Cleared on logout
 */
export const useAuthStore = create(
  devtools(
    persist(
      (set, get) => ({
        // State
        user: null,
        isAuthenticated: false,
        isLoading: false,
        lastLogin: null,

        // Actions
        setUser: userData => {
          // Validate user data before storing
          const validatedUser = validateUser(userData)

          set({
            user: validatedUser,
            isAuthenticated: !!validatedUser,
            lastLogin: validatedUser ? new Date().toISOString() : null,
          })
        },

        setLoading: loading => {
          set({ isLoading: loading })
        },

        login: async userData => {
          set({ isLoading: true })

          try {
            const validatedUser = validateUser(userData)

            set({
              user: validatedUser,
              isAuthenticated: true,
              isLoading: false,
              lastLogin: new Date().toISOString(),
            })
          } catch (error) {
            set({ isLoading: false })
            throw error
          }
        },

        logout: () => {
          // Clear tokens from secure storage
          secureStorage.removeItem('access_token')
          secureStorage.removeItem('refresh_token')

          // Clear state
          set({
            user: null,
            isAuthenticated: false,
            lastLogin: null,
          })
        },

        updateUser: updates => {
          const { user } = get()
          if (!user) return

          const updatedUser = validateUser({ ...user, ...updates })
          set({ user: updatedUser })
        },

        // Getters
        getUserRole: () => {
          const { user } = get()
          return user?.role || 'customer'
        },

        hasRole: role => {
          const { user } = get()
          return user?.role === role
        },

        hasAnyRole: roles => {
          const { user } = get()
          return roles.includes(user?.role)
        },
      }),
      {
        name: 'auth-storage',
        storage: createJSONStorage(() => ({
          getItem: name => {
            const value = localStorage.getItem(name)
            if (!value) return null

            try {
              // Decrypt and validate on load
              const decrypted = secureStorage.decrypt(value)
              return decrypted
            } catch (error) {
              console.error('Failed to decrypt auth storage:', error)
              // Clear corrupted data
              localStorage.removeItem(name)
              return null
            }
          },
          setItem: (name, value) => {
            try {
              // Encrypt before storing
              const encrypted = secureStorage.encrypt(value)
              localStorage.setItem(name, encrypted)
            } catch (error) {
              console.error('Failed to encrypt auth storage:', error)
            }
          },
          removeItem: name => {
            localStorage.removeItem(name)
          },
        })),
        // Only persist non-sensitive data
        partialize: state => ({
          user: state.user
            ? {
                id: state.user.id,
                email: state.user.email,
                name: state.user.name,
                role: state.user.role,
                // Add other non-sensitive fields
                // Exclude: password, tokens, sensitive data
              }
            : null,
          isAuthenticated: state.isAuthenticated,
          lastLogin: state.lastLogin,
        }),
      }
    ),
    { name: 'AuthStore' }
  )
)
