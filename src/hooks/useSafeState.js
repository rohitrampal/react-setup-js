import { useState, useCallback } from 'react'
import { errorHandler } from '@/utils/errorHandler'

export function useSafeState(initialValue) {
  const [state, setState] = useState(initialValue)

  const safeSetState = useCallback((value) => {
    try {
      setState(value)
    } catch (error) {
      errorHandler.logError(error)
      console.error('Error in setState:', error)
    }
  }, [])

  return [state, safeSetState]
}

export function useSafeValue(value, fallback) {
  if (value === undefined || value === null) {
    if (import.meta.env.VITE_APP_MODE === 'development') {
      console.warn('Undefined or null value detected, using fallback:', { value, fallback })
    }
    return fallback
  }
  return value
}

