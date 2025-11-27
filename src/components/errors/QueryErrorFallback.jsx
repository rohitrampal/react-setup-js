import { Box, Typography, Button } from '@mui/material'
import { ErrorOutline, Refresh } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

export const QueryErrorFallback = ({
  error,
  refetch,
  isLoading,
  children,
}) => {
  const { t } = useTranslation()

  if (!error) {
    return <>{children}</>
  }

  const isNetworkError =
    error.message?.includes('Network') ||
    error.message?.includes('fetch') ||
    error.message?.includes('timeout')

  const isUndefinedError =
    error.message?.includes('undefined') || error.message?.includes('Cannot read')

  return (
    <Box
      className='tw-p-3 sm:tw-p-4 tw-bg-red-50 tw-rounded-lg tw-border tw-border-red-200'
      role='alert'
      aria-live='polite'
    >
      <Box className='tw-flex tw-items-start tw-gap-2 sm:tw-gap-3'>
        <ErrorOutline className='tw-text-red-500 tw-mt-1 tw-flex-shrink-0' sx={{ fontSize: { xs: 20, sm: 24 } }} />
        <Box className='tw-flex-1 tw-min-w-0'>
          <Typography variant='h6' component='h3' className='tw-mb-1 tw-text-red-800 tw-text-sm sm:tw-text-base'>
            {isNetworkError
              ? t('errors.networkError')
              : isUndefinedError
                ? t('errors.dataError')
                : t('errors.queryError')}
          </Typography>
          <Typography variant='body2' color='textSecondary' className='tw-mb-3 tw-text-xs sm:tw-text-sm'>
            {isNetworkError
              ? t('errors.networkErrorDescription')
              : isUndefinedError
                ? t('errors.dataErrorDescription')
                : t('errors.queryErrorDescription')}
          </Typography>
          {error.message && (
            <Typography
              variant='caption'
              className='tw-block tw-mb-3 tw-p-2 tw-bg-white tw-rounded tw-font-mono tw-text-xs tw-break-words'
            >
              {error.message}
            </Typography>
          )}
          {refetch && (
            <Button
              size='small'
              variant='outlined'
              startIcon={<Refresh />}
              onClick={() => refetch()}
              disabled={isLoading}
              aria-label={t('errors.retry')}
              className='tw-w-full sm:tw-w-auto'
            >
              {isLoading ? t('common.loading') : t('errors.retry')}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const withQueryErrorFallback = (
  queryResult,
  fallback
) => {
  const { error, refetch, isLoading } = queryResult

  if (error) {
    return <QueryErrorFallback error={error} refetch={refetch} isLoading={isLoading} />
  }

  return fallback || null
}
