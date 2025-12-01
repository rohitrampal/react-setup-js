import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { classNames } from '@/utils/classNames'

export const Modal = ({
  title,
  children,
  actions,
  onClose,
  closeButton = true,
  open,
  className,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  ...props
}) => {
  const titleId = title ? 'modal-title' : undefined
  const descriptionId = 'modal-description'

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby={ariaLabelledBy || titleId}
      aria-describedby={ariaDescribedBy || descriptionId}
      className={classNames('tw-rounded-lg', className)}
      fullWidth
      maxWidth='sm'
      PaperProps={{
        sx: {
          width: { xs: '95%', sm: 'auto' },
          maxWidth: { xs: '95%', sm: '600px' },
          margin: { xs: '16px', sm: 'auto' },
        },
      }}
      {...props}
    >
      {title && (
        <DialogTitle
          id={titleId}
          className='tw-flex tw-items-center tw-justify-between tw-pr-2 sm:tw-pr-4'
        >
          <Typography variant='h6' component='span' className='tw-text-base sm:tw-text-lg'>
            {title}
          </Typography>
          {closeButton && (
            <IconButton
              onClick={onClose}
              aria-label='Close modal'
              className='tw-ml-auto'
              size='small'
            >
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
      )}
      <DialogContent
        id={descriptionId}
        className='tw-py-3 sm:tw-py-4 tw-px-3 sm:tw-px-6'
        aria-describedby={descriptionId}
      >
        {children}
      </DialogContent>
      {actions && (
        <DialogActions className='tw-px-3 sm:tw-px-6 tw-pb-3 sm:tw-pb-4 tw-flex-col sm:tw-flex-row tw-gap-2'>
          {actions}
        </DialogActions>
      )}
    </Dialog>
  )
}
