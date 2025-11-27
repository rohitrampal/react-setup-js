import { Card as MuiCard, CardContent, CardHeader } from '@mui/material'
import { classNames } from '@/utils/classNames'

export const Card = ({
  title,
  subtitle,
  children,
  actions,
  className,
  'aria-label': ariaLabel,
  ...props
}) => {
  return (
    <MuiCard
      className={classNames('tw-shadow-md tw-rounded-lg', className)}
      aria-label={ariaLabel}
      {...props}
    >
      {(title || subtitle || actions) && (
        <CardHeader
          title={title}
          subheader={subtitle}
          action={actions}
          aria-label={title ? `${title} card` : undefined}
          sx={{
            '& .MuiCardHeader-title': {
              fontSize: { xs: '1rem', sm: '1.25rem' },
            },
            '& .MuiCardHeader-subheader': {
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
            },
          }}
        />
      )}
      <CardContent className='tw-p-4 sm:tw-p-6'>{children}</CardContent>
    </MuiCard>
  )
}
