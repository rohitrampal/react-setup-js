import { useState } from 'react'
import { Box } from '@mui/material'
import { Header } from './Header'
import { Navigation } from './Navigation'
import { useAuth } from '@/modules/auth'

export const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <Box className='tw-min-h-screen tw-flex tw-flex-col'>
      <Header onMenuClick={isAuthenticated ? handleDrawerToggle : undefined} />
      <Box className='tw-flex tw-flex-1'>
        {isAuthenticated && (
          <Navigation mobileOpen={mobileOpen} onMobileClose={handleDrawerToggle} />
        )}
        <Box
          component='main'
          className='tw-flex-1 tw-p-3 tw-px-4 sm:tw-p-4 md:tw-p-6 tw-overflow-x-hidden'
          role='main'
          aria-label='Main content'
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
