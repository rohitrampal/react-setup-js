import { Chip as MuiChip } from '@mui/material'
import { forwardRef } from 'react'
import { classNames } from '@/utils/classNames'

export const Chip = forwardRef(
  (
    {
      color = 'default',
      variant = 'filled',
      size = 'medium',
      className,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    return (
      <MuiChip
        ref={ref}
        color={color}
        variant={variant}
        size={size}
        className={classNames('tw-transition-all', className)}
        aria-label={ariaLabel || (typeof props.label === 'string' ? props.label : undefined)}
        {...props}
      />
    )
  }
)

Chip.displayName = 'Chip'

