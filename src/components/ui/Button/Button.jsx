import { Button as MuiButton } from '@mui/material'
import { forwardRef } from 'react'
import { classNames } from '@/utils/classNames'

export const Button = forwardRef(
  (
    {
      children,
      variant = 'contained',
      color = 'primary',
      size = 'medium',
      fullWidth = false,
      loading = false,
      disabled,
      className,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    return (
      <MuiButton
        ref={ref}
        variant={variant}
        color={color}
        size={size}
        fullWidth={fullWidth}
        disabled={disabled || loading}
        className={classNames('tw-transition-all', className)}
        aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
        aria-busy={loading}
        {...props}
      >
        {loading ? 'Loading...' : children}
      </MuiButton>
    )
  }
)

Button.displayName = 'Button'
