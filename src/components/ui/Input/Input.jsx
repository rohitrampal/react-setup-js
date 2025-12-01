import { TextField, InputAdornment, FormHelperText, FormControl, FormLabel } from '@mui/material'
import { forwardRef } from 'react'
import { classNames } from '@/utils/classNames'

export const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      startAdornment,
      endAdornment,
      required,
      className,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`
    const helperTextId = helperText ? `${inputId}-helper-text` : undefined

    return (
      <FormControl
        fullWidth={props.fullWidth}
        error={error}
        required={required}
        className={classNames('tw-mb-4', className)}
      >
        <FormLabel htmlFor={inputId} className='tw-mb-2'>
          {label}
          {required && <span className='tw-text-red-500 tw-ml-1'>*</span>}
        </FormLabel>
        <TextField
          ref={ref}
          id={inputId}
          label={label}
          error={error}
          variant='outlined'
          InputProps={{
            startAdornment: startAdornment ? (
              <InputAdornment position='start'>{startAdornment}</InputAdornment>
            ) : undefined,
            endAdornment: endAdornment ? (
              <InputAdornment position='end'>{endAdornment}</InputAdornment>
            ) : undefined,
            'aria-label': ariaLabel || label,
            'aria-describedby': ariaDescribedBy || helperTextId,
            'aria-required': required,
          }}
          {...props}
        />
        {helperText && (
          <FormHelperText id={helperTextId} aria-live='polite'>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    )
  }
)

Input.displayName = 'Input'
