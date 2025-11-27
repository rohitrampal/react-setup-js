import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('shows loading state', () => {
    render(<Button loading>Click me</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('is disabled when loading', () => {
    render(<Button loading>Click me</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Click me</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  it('supports different variants', () => {
    const { rerender } = render(<Button variant="contained">Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
    
    rerender(<Button variant="outlined">Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
    
    rerender(<Button variant="text">Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('supports different sizes', () => {
    const { rerender } = render(<Button size="small">Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
    
    rerender(<Button size="medium">Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
    
    rerender(<Button size="large">Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('supports fullWidth prop', () => {
    render(<Button fullWidth>Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('has proper aria-label when provided', () => {
    render(<Button aria-label="Custom label">Click me</Button>)
    
    const button = screen.getByRole('button', { name: /custom label/i })
    expect(button).toBeInTheDocument()
  })
})

