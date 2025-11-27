import { useTranslation } from 'react-i18next'
import { usePagination } from '@/hooks/usePagination'
import { Table } from '@/components/ui'
import { Box, Typography, Button, CircularProgress, Pagination } from '@mui/material'

export const PaginatedListExample = () => {
  const { t } = useTranslation()
  const {
    data,
    total,
    page,
    pageSize,
    totalPages,
    isLoading,
    isError,
    setPage,
    nextPage,
    previousPage,
    hasNextPage,
    hasPreviousPage,
  } = usePagination({
    endpoint: '/list/items',
    pageSize: 10,
  })

  const columns = [
    { id: 'name', label: t('list.name'), minWidth: 150 },
    { id: 'email', label: t('list.email'), minWidth: 200 },
    { id: 'role', label: t('list.role'), minWidth: 100 },
    { id: 'status', label: t('list.status'), minWidth: 100 },
  ]

  if (isLoading) {
    return (
      <Box className='tw-flex tw-justify-center tw-items-center tw-py-8'>
        <CircularProgress aria-label={t('common.loading')} />
      </Box>
    )
  }

  if (isError) {
    return <Box>{t('common.error')}</Box>
  }

  return (
    <Box>
      <Typography variant='h5' component='h2' className='tw-mb-4 tw-text-lg sm:tw-text-xl md:tw-text-2xl'>
        {t('list.users')} (Paginated)
      </Typography>

      <Table
        columns={columns}
        rows={(data || [])}
        getRowId={(row) => (row.id) || ''}
        stickyHeader
        aria-label={t('list.users')}
      />

      <Box className='tw-mt-4 tw-flex tw-flex-col sm:tw-flex-row tw-items-center tw-justify-between tw-gap-4'>
        <Typography variant='body2' className='tw-text-xs sm:tw-text-sm'>
          {t('common.showing')} {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, total)} of{' '}
          {total}
        </Typography>

        <Box className='tw-flex tw-flex-col sm:tw-flex-row tw-gap-2 tw-items-center tw-w-full sm:tw-w-auto'>
          <Button
            onClick={previousPage}
            disabled={!hasPreviousPage}
            variant='outlined'
            size='small'
            aria-label='Previous page'
            className='tw-w-full sm:tw-w-auto'
          >
            {t('common.previous')}
          </Button>

          <Pagination
            count={totalPages}
            page={page}
            onChange={(_e, newPage) => setPage(newPage)}
            color='primary'
            size='small'
            aria-label='Pagination'
            sx={{
              '& .MuiPagination-ul': {
                flexWrap: 'nowrap',
              },
            }}
          />

          <Button
            onClick={nextPage}
            disabled={!hasNextPage}
            variant='outlined'
            size='small'
            aria-label='Next page'
            className='tw-w-full sm:tw-w-auto'
          >
            {t('common.next')}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
