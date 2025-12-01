/**
 * State Validation Utilities
 *
 * Validates state data before storing/using
 * Prevents corrupted or malicious data
 */

/**
 * Validates user data structure
 * @param {Object} user - User data to validate
 * @returns {Object|null} - Validated user or null
 */
export function validateUser(user) {
  if (!user || typeof user !== 'object') {
    return null
  }

  // Required fields
  if (!user.id || !user.email) {
    console.warn('Invalid user data: missing required fields')
    return null
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(user.email)) {
    console.warn('Invalid user data: invalid email format')
    return null
  }

  // Sanitize and return only allowed fields
  return {
    id: String(user.id),
    email: String(user.email).toLowerCase().trim(),
    name: user.name ? String(user.name).trim() : '',
    role: user.role || 'customer',
    avatar: user.avatar || null,
    // Add other safe fields as needed
    // Exclude: password, tokens, sensitive data
  }
}

/**
 * Validates UI preferences
 * @param {Object} preferences - Preferences to validate
 * @returns {Object} - Validated preferences
 */
export function validateUIPreferences(preferences) {
  if (!preferences || typeof preferences !== 'object') {
    return getDefaultUIPreferences()
  }

  return {
    theme: ['light', 'dark'].includes(preferences.theme) ? preferences.theme : 'light',
    sidebarOpen: typeof preferences.sidebarOpen === 'boolean' ? preferences.sidebarOpen : true,
    sidebarCollapsed:
      typeof preferences.sidebarCollapsed === 'boolean' ? preferences.sidebarCollapsed : false,
    layout: ['default', 'compact', 'wide'].includes(preferences.layout)
      ? preferences.layout
      : 'default',
    compactMode: typeof preferences.compactMode === 'boolean' ? preferences.compactMode : false,
  }
}

/**
 * Gets default UI preferences
 * @returns {Object} - Default preferences
 */
export function getDefaultUIPreferences() {
  return {
    theme: 'light',
    sidebarOpen: true,
    sidebarCollapsed: false,
    layout: 'default',
    compactMode: false,
  }
}

/**
 * Validates app settings
 * @param {Object} settings - Settings to validate
 * @returns {Object} - Validated settings
 */
export function validateAppSettings(settings) {
  if (!settings || typeof settings !== 'object') {
    return getDefaultAppSettings()
  }

  return {
    language: typeof settings.language === 'string' ? settings.language : 'en',
    timezone:
      typeof settings.timezone === 'string'
        ? settings.timezone
        : Intl.DateTimeFormat().resolvedOptions().timeZone,
    dateFormat: typeof settings.dateFormat === 'string' ? settings.dateFormat : 'MM/DD/YYYY',
    timeFormat: ['12h', '24h'].includes(settings.timeFormat) ? settings.timeFormat : '12h',
  }
}

/**
 * Gets default app settings
 * @returns {Object} - Default settings
 */
export function getDefaultAppSettings() {
  return {
    language: 'en',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
  }
}

/**
 * Sanitizes string input
 * @param {string} input - Input to sanitize
 * @returns {string} - Sanitized string
 */
export function sanitizeString(input) {
  if (typeof input !== 'string') {
    return ''
  }

  // Remove potentially dangerous characters
  return input.trim().replace(/[<>]/g, '').slice(0, 1000) // Limit length
}
