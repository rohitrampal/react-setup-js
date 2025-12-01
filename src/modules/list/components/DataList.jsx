import { lazy } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography, TextField, InputAdornment, CircularProgress } from '@mui/material'
import { Search } from '@mui/icons-material'
import { useListItems } from '../hooks/useListQuery'
import { QueryErrorFallback } from '@/components/errors'
import { ModuleErrorBoundary } from '@/components/errors'
import { ComponentSuspense } from '@/components/lazy'

// Lazy load Table component
const LazyTable = lazy(() =>
  import('@/components/ui/Table').then(module => ({ default: module.Table }))
)

export const DataList = () => {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const { data, isLoading, isError, error, refetch } = useListItems(searchTerm || undefined)

  const columns = [
    { id: 'name', label: t('list.name'), minWidth: 150 },
    { id: 'email', label: t('list.email'), minWidth: 200 },
    { id: 'role', label: t('list.role'), minWidth: 100 },
    {
      id: 'status',
      label: t('list.status'),
      minWidth: 100,
      format: value => {
        const statusValue = String(value)
        const isActive = statusValue === 'Active'
        return (
          <span
            className={`tw-px-2 tw-py-1 tw-rounded tw-text-xs ${
              isActive ? 'tw-bg-green-100 tw-text-green-800' : 'tw-bg-red-100 tw-text-red-800'
            }`}
          >
            {isActive ? t('list.active') : t('list.inactive')}
          </span>
        )
      },
    },
  ]

  if (isLoading) {
    return (
      <Box className='tw-flex tw-justify-center tw-items-center tw-py-8'>
        <CircularProgress aria-label={t('common.loading')} />
      </Box>
    )
  }

  if (isError) {
    return <QueryErrorFallback error={error} refetch={refetch} isLoading={isLoading} />
  }

  return (
    <ModuleErrorBoundary moduleName='List'>
      <Box aria-label={t('list.title')}>
        <Box className='tw-mb-4 tw-flex tw-flex-col sm:tw-flex-row tw-items-start sm:tw-items-center tw-justify-between tw-gap-4'>
          <Typography
            variant='h5'
            component='h2'
            className='tw-text-lg sm:tw-text-xl md:tw-text-2xl'
          >
            {t('list.users')}
          </Typography>
          <TextField
            placeholder={t('list.searchPlaceholder')}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            size='small'
            fullWidth
            className='sm:tw-w-auto sm:tw-min-w-[200px]'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              ),
            }}
            aria-label={t('common.search')}
          />
        </Box>

        <ComponentSuspense>
          <LazyTable
            columns={columns}
            rows={data || []}
            getRowId={row => row.id || ''}
            stickyHeader
            aria-label={t('list.users')}
          />
        </ComponentSuspense>
      </Box>
    </ModuleErrorBoundary>
  )
}
