import { useTranslation } from 'react-i18next'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { Table } from '@/components/ui'
import { Box, Typography, Button, CircularProgress } from '@mui/material'

export const InfiniteListExample = () => {
  const { t } = useTranslation()
  const { allItems, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteScroll({
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
        {t('list.users')} (Infinite Scroll)
      </Typography>

      <Table
        columns={columns}
        rows={(allItems || [])}
        getRowId={(row) => (row.id) || ''}
        stickyHeader
        aria-label={t('list.users')}
      />

      <Box className='tw-mt-4 tw-text-center'>
        {hasNextPage && (
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            variant='contained'
            aria-label='Load more'
            className='tw-w-full sm:tw-w-auto'
          >
            {isFetchingNextPage ? (
              <>
                <CircularProgress size={20} className='tw-mr-2' />
                {t('common.loading')}
              </>
            ) : (
              'Load More'
            )}
          </Button>
        )}
      </Box>
    </Box>
  )
}
