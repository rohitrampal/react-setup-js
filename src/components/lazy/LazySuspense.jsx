import { Suspense } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

export const LazySuspense = ({ children, fallback, minHeight = '400px', showText = true }) => {
  const { t } = useTranslation()

  const defaultFallback = (
    <Box
      className='tw-flex tw-flex-col tw-items-center tw-justify-center'
      sx={{ minHeight: { xs: '200px', sm: minHeight } }}
      role='status'
      aria-label={t('common.loading')}
    >
      <CircularProgress
        size={48}
        className='tw-mb-4'
        sx={{ width: { xs: 32, sm: 48 }, height: { xs: 32, sm: 48 } }}
      />
      {showText && (
        <Typography variant='body2' color='textSecondary' className='tw-text-sm sm:tw-text-base'>
          {t('common.loading')}
        </Typography>
      )}
    </Box>
  )

  return <Suspense fallback={fallback || defaultFallback}>{children}</Suspense>
}

export const PageSuspense = ({ children }) => {
  return (
    <LazySuspense minHeight='60vh' showText={true}>
      {children}
    </LazySuspense>
  )
}

export const ComponentSuspense = ({ children }) => {
  return (
    <LazySuspense minHeight='200px' showText={false}>
      {children}
    </LazySuspense>
  )
}
