import { Card } from '@/components/ui'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { TrendingUp, People, AttachMoney, ShoppingCart } from '@mui/icons-material'

const StatCard = ({ title, value, icon, trend, 'aria-label': ariaLabel }) => {
  return (
    <Card className='tw-h-full' aria-label={ariaLabel || `${title} statistic`}>
      <Box className='tw-flex tw-items-center tw-justify-between'>
        <Box className='tw-flex-1 tw-min-w-0'>
          <Typography
            variant='body2'
            color='textSecondary'
            className='tw-mb-1 tw-text-xs sm:tw-text-sm'
          >
            {title}
          </Typography>
          <Typography
            variant='h4'
            component='div'
            className='tw-font-bold tw-text-lg sm:tw-text-xl md:tw-text-2xl'
          >
            {value}
          </Typography>
          {trend && (
            <Typography variant='caption' color='success.main' className='tw-mt-1 tw-text-xs'>
              {trend}
            </Typography>
          )}
        </Box>
        <Box className='tw-text-primary-500 tw-flex-shrink-0 tw-ml-2'>{icon}</Box>
      </Box>
    </Card>
  )
}

export const DashboardStats = () => {
  const { t } = useTranslation()
  const stats = [
    {
      title: t('dashboard.totalRevenue'),
      value: '$45,231',
      icon: <AttachMoney fontSize='large' className='tw-text-2xl sm:tw-text-3xl md:tw-text-4xl' />,
      trend: `+20.1% ${t('dashboard.fromLastMonth')}`,
      'aria-label': t('dashboard.totalRevenue'),
    },
    {
      title: t('dashboard.users'),
      value: '2,350',
      icon: <People fontSize='large' className='tw-text-2xl sm:tw-text-3xl md:tw-text-4xl' />,
      trend: `+12.5% ${t('dashboard.fromLastMonth')}`,
      'aria-label': t('dashboard.users'),
    },
    {
      title: t('dashboard.orders'),
      value: '1,234',
      icon: <ShoppingCart fontSize='large' className='tw-text-2xl sm:tw-text-3xl md:tw-text-4xl' />,
      trend: `+8.2% ${t('dashboard.fromLastMonth')}`,
      'aria-label': t('dashboard.orders'),
    },
    {
      title: t('dashboard.growth'),
      value: '+15.3%',
      icon: <TrendingUp fontSize='large' className='tw-text-2xl sm:tw-text-3xl md:tw-text-4xl' />,
      trend: t('dashboard.fromLastMonth'),
      'aria-label': t('dashboard.growth'),
    },
  ]

  return (
    <Box
      className='tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-3 md:tw-gap-4 tw-mb-4 md:tw-mb-6'
      role='region'
      aria-label='Dashboard statistics'
    >
      {stats.map(stat => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </Box>
  )
}
