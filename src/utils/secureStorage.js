/**
 * Secure Storage Utility
 * 
 * Provides encryption/decryption for sensitive data
 * 
 * NOTE: For production, use proper encryption with server-side key management
 * This is a simplified version for development
 */

class SecureStorage {

  // Synchronous methods for localStorage compatibility
  // Note: These use a simplified approach for sync operations
  encryptSync(text) {
    // For sync operations, use a simpler approach
    // In production, consider using IndexedDB with async encryption
    try {
      // Simple obfuscation (not real encryption, but better than plain text)
      return btoa(unescape(encodeURIComponent(text)))
    } catch (error) {
      console.error('Sync encryption error:', error)
      return text
    }
  }

  decryptSync(encryptedText) {
    try {
      return decodeURIComponent(escape(atob(encryptedText)))
    } catch (error) {
      console.error('Sync decryption error:', error)
      return encryptedText
    }
  }

  // localStorage wrapper with encryption
  setItem(key, value) {
    try {
      const encrypted = this.encryptSync(JSON.stringify(value))
      localStorage.setItem(key, encrypted)
    } catch (error) {
      console.error('Failed to store encrypted item:', error)
    }
  }

  getItem(key) {
    try {
      const encrypted = localStorage.getItem(key)
      if (!encrypted) return null
      
      const decrypted = this.decryptSync(encrypted)
      return JSON.parse(decrypted)
    } catch (error) {
      console.error('Failed to retrieve encrypted item:', error)
      return null
    }
  }

  removeItem(key) {
    localStorage.removeItem(key)
  }

  clear() {
    localStorage.clear()
  }
}

export const secureStorage = new SecureStorage()

