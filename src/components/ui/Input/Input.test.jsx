import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'

describe('Input', () => {
  it('renders with label', () => {
    render(<Input label='Email' />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })

  it('handles user input', async () => {
    const user = userEvent.setup()
    render(<Input label='Email' />)

    const input = screen.getByLabelText(/email/i)
    await user.type(input, 'test@example.com')

    expect(input).toHaveValue('test@example.com')
  })

  it('shows error state', () => {
    render(<Input label='Email' error helperText='Invalid email' />)

    const input = screen.getByLabelText(/email/i)
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByText(/invalid email/i)).toBeInTheDocument()
  })

  it('shows helper text', () => {
    render(<Input label='Email' helperText='Enter your email address' />)

    expect(screen.getByText(/enter your email address/i)).toBeInTheDocument()
  })

  it('shows required indicator', () => {
    render(<Input label='Email' required />)

    const input = screen.getByLabelText(/email/i)
    expect(input).toHaveAttribute('aria-required', 'true')
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('supports startAdornment', () => {
    render(<Input label='Email' startAdornment={<span>@</span>} />)

    expect(screen.getByText('@')).toBeInTheDocument()
  })

  it('supports endAdornment', () => {
    render(<Input label='Email' endAdornment={<span>✓</span>} />)

    expect(screen.getByText('✓')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Input label='Email' className='custom-class' />)

    const formControl = screen.getByLabelText(/email/i).closest('.custom-class')
    expect(formControl).toBeInTheDocument()
  })

  it('calls onChange handler', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    render(<Input label='Email' onChange={handleChange} />)

    const input = screen.getByLabelText(/email/i)
    await user.type(input, 'test')

    expect(handleChange).toHaveBeenCalled()
  })

  it('supports different input types', () => {
    const { rerender } = render(<Input label='Email' type='email' />)
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('type', 'email')

    rerender(<Input label='Password' type='password' />)
    expect(screen.getByLabelText(/password/i)).toHaveAttribute('type', 'password')
  })

  it('has proper aria attributes', () => {
    render(
      <Input
        label='Email'
        aria-label='Email input'
        aria-describedby='email-help'
        helperText='Enter email'
      />
    )

    const input = screen.getByLabelText(/email/i)
    expect(input).toHaveAttribute('aria-label', 'Email input')
    expect(input).toHaveAttribute('aria-describedby')
  })
})
