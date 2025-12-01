import { Menu, MenuItem, IconButton, Tooltip } from '@mui/material'
import { Language } from '@mui/icons-material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const languages = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिंदी' },
  { code: 'pa', label: 'Punjabi', nativeLabel: 'ਪੰਜਾਬੀ' },
]

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLanguageChange = languageCode => {
    i18n.changeLanguage(languageCode)
    handleClose()
  }

  return (
    <>
      <Tooltip title={t('language.switchLanguage')}>
        <IconButton
          color='inherit'
          onClick={handleClick}
          aria-label={t('language.switchLanguage')}
          aria-haspopup='true'
          aria-expanded={Boolean(anchorEl)}
        >
          <Language />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'language-menu-button',
        }}
      >
        {languages.map(language => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            selected={i18n.language === language.code}
            aria-label={`${t('language.switchLanguage')}: ${language.nativeLabel}`}
          >
            {language.nativeLabel} ({language.label})
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
