import { useState, useEffect, useMemo } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { getTheme } from '@/config/theme'

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const [mode, setMode] = useState(() => {
    const stored = localStorage.getItem('theme_mode')
    return stored || 'light'
  })

  useEffect(() => {
    localStorage.setItem('theme_mode', mode)
  }, [mode])

  const toggleTheme = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  const theme = useMemo(() => getTheme(mode), [mode])

  return {
    mode,
    theme,
    toggleTheme,
    setMode,
  }
}

export const ThemeWrapper = ({ children }) => {
  const { theme } = useTheme()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
