import { useState } from 'react'
import { AppBar, Toolbar, Typography, IconButton, Box, Button, useMediaQuery, useTheme as useMuiTheme, Menu, MenuItem } from '@mui/material'
import { Brightness4, Brightness7, Logout, Person, Menu as MenuIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/modules/auth'
import { useTheme } from '@/hooks/useTheme'
import { LanguageSwitcher } from './LanguageSwitcher'

export const Header = ({ onMenuClick }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const { mode, toggleTheme } = useTheme()
  const muiTheme = useMuiTheme()
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'))
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null)

  const handleLogout = async () => {
    await logout()
    setProfileMenuAnchor(null)
  }

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget)
  }

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null)
  }

  return (
    <AppBar position='static' className='tw-shadow-md'>
      <Toolbar className='tw-justify-between tw-px-2 md:tw-px-4'>
        <Box className='tw-flex tw-items-center tw-gap-2'>
          {onMenuClick && (
            <IconButton
              color='inherit'
              edge='start'
              onClick={onMenuClick}
              className='md:tw-hidden'
              aria-label='Open navigation menu'
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant='h6'
            component='div'
            className='tw-cursor-pointer tw-text-sm md:tw-text-base'
            onClick={() => navigate('/dashboard')}
            role='link'
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                navigate('/dashboard')
              }
            }}
            aria-label={t('navigation.dashboard')}
          >
            {t('common.appName')}
          </Typography>
        </Box>

        <Box className='tw-flex tw-items-center tw-gap-1 md:tw-gap-2'>
          {user && (
            <>
              {isMobile ? (
                <>
                  <IconButton
                    color='inherit'
                    onClick={handleProfileMenuOpen}
                    aria-label='User menu'
                  >
                    <Person />
                  </IconButton>
                  <Menu
                    anchorEl={profileMenuAnchor}
                    open={Boolean(profileMenuAnchor)}
                    onClose={handleProfileMenuClose}
                    MenuListProps={{
                      'aria-labelledby': 'user-menu-button',
                    }}
                  >
                    <MenuItem onClick={() => { navigate('/profile'); handleProfileMenuClose(); }}>
                      <Person className='tw-mr-2' />
                      {user.name}
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <Logout className='tw-mr-2' />
                      {t('auth.logout')}
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    color='inherit'
                    startIcon={<Person />}
                    onClick={() => navigate('/profile')}
                    aria-label='Navigate to profile'
                    className='tw-text-xs md:tw-text-sm'
                  >
                    <span className='tw-hidden sm:tw-inline'>{user.name}</span>
                  </Button>
                  <IconButton color='inherit' onClick={handleLogout} aria-label={t('auth.logout')}>
                    <Logout />
                  </IconButton>
                </>
              )}
            </>
          )}
          <LanguageSwitcher />
          <IconButton
            color='inherit'
            onClick={toggleTheme}
            aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
            size={isMobile ? 'small' : 'medium'}
          >
            {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
