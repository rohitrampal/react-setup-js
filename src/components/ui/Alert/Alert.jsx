import {
  Alert as MuiAlert,
  AlertTitle,
  IconButton,
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { classNames } from '@/utils/classNames'

export const Alert = ({
  severity = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  className,
  'aria-label': ariaLabel,
  ...props
}) => {
  return (
    <MuiAlert
      severity={severity}
      className={classNames('tw-rounded-lg tw-mb-3 sm:tw-mb-4', className)}
      aria-label={ariaLabel || `${severity} alert`}
      role='alert'
      sx={{
        '& .MuiAlert-message': {
          fontSize: { xs: '0.875rem', sm: '1rem' },
        },
        '& .MuiAlertTitle-root': {
          fontSize: { xs: '0.9375rem', sm: '1rem' },
        },
      }}
      action={
        dismissible && onDismiss ? (
          <IconButton aria-label='Dismiss alert' color='inherit' size='small' onClick={onDismiss}>
            <CloseIcon fontSize='inherit' />
          </IconButton>
        ) : undefined
      }
      {...props}
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {children}
    </MuiAlert>
  )
}
