import { useState } from 'react'
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme as useMuiTheme } from '@mui/material'
import { Dashboard, List as ListIcon, Person } from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const Navigation = ({ mobileOpen, onMobileClose }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()
  const muiTheme = useMuiTheme()
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'))

  const navItems = [
    { labelKey: 'navigation.dashboard', path: '/dashboard', icon: <Dashboard /> },
    { labelKey: 'navigation.list', path: '/list', icon: <ListIcon /> },
    { labelKey: 'navigation.profile', path: '/profile', icon: <Person /> },
  ]

  const handleNavClick = (path) => {
    navigate(path)
    if (isMobile && onMobileClose) {
      onMobileClose()
    }
  }

  const drawerContent = (
    <List className={isMobile ? 'tw-mt-4' : 'tw-mt-16'} role='navigation' aria-label={t('navigation.dashboard')}>
      {navItems.map(item => {
        const isActive = location.pathname === item.path
        return (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              selected={isActive}
              onClick={() => handleNavClick(item.path)}
              aria-label={t(item.labelKey)}
              aria-current={isActive ? 'page' : undefined}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={t(item.labelKey)} />
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )

  if (isMobile) {
    return (
      <Drawer
        variant='temporary'
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
          },
        }}
        aria-label={t('navigation.dashboard')}
      >
        {drawerContent}
      </Drawer>
    )
  }

  return (
    <Drawer
      variant='permanent'
      sx={{
        display: { xs: 'none', md: 'block' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: 256,
        },
      }}
      aria-label={t('navigation.dashboard')}
    >
      {drawerContent}
    </Drawer>
  )
}
