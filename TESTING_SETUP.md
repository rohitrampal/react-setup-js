# Testing Setup Guide

## Overview

This project uses **Vitest** for testing - a fast, lightweight testing framework that's Jest-compatible and works seamlessly with Vite.

## Why Vitest?

- ✅ **Lightweight**: Much smaller than Jest
- ✅ **Fast**: Uses Vite's fast HMR
- ✅ **Jest-compatible API**: Easy migration from Jest
- ✅ **TypeScript support**: Built-in TypeScript support
- ✅ **No configuration needed**: Works out of the box with Vite

## Installation

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

## Test Scripts

```bash
# Run tests in watch mode (development)
npm test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## Test Structure

Tests are located alongside the code they test:

```
src/
├── components/
│   └── ui/
│       └── Button/
│           ├── Button.jsx
│           └── Button.test.jsx
├── utils/
│   ├── classNames.js
│   └── classNames.test.js
└── test/
    └── setup.js
```

## Writing Tests

### Component Tests

```javascript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
```

### Utility Function Tests

```javascript
import { describe, it, expect } from 'vitest'
import { classNames } from './classNames'

describe('classNames', () => {
  it('joins string classes', () => {
    expect(classNames('foo', 'bar')).toBe('foo bar')
  })
})
```

### Testing Hooks

```javascript
import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useCustomHook } from './useCustomHook'

describe('useCustomHook', () => {
  it('returns expected value', () => {
    const { result } = renderHook(() => useCustomHook())
    expect(result.current).toBeDefined()
  })
})
```

## Test Utilities

### Setup File

The test setup file (`src/test/setup.js`) includes:

- **@testing-library/jest-dom**: Custom matchers for DOM testing
- **Mock setup**: Window.matchMedia, IntersectionObserver, ResizeObserver
- **i18n mocks**: React-i18next mocking
- **Router mocks**: React Router mocking
- **QueryClient helper**: Test QueryClient for React Query

### Using Test QueryClient

```javascript
import { createTestQueryClient } from '@/test/setup'
import { QueryClientProvider } from '@tanstack/react-query'

const TestWrapper = ({ children }) => {
  const queryClient = createTestQueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
```

## Coverage

Coverage reports are generated in the `coverage/` directory:

```bash
npm run test:coverage
```

Coverage includes:
- **Text report**: In terminal
- **HTML report**: `coverage/index.html`
- **LCOV report**: For CI/CD integration
- **JSON report**: For programmatic access

## Best Practices

### 1. Test User Interactions

```javascript
import userEvent from '@testing-library/user-event'

it('handles user input', async () => {
  const user = userEvent.setup()
  render(<Input label="Email" />)
  
  const input = screen.getByLabelText(/email/i)
  await user.type(input, 'test@example.com')
  
  expect(input).toHaveValue('test@example.com')
})
```

### 2. Test Accessibility

```javascript
it('has proper ARIA attributes', () => {
  render(<Button aria-label="Submit">Submit</Button>)
  
  const button = screen.getByRole('button', { name: /submit/i })
  expect(button).toHaveAttribute('aria-label', 'Submit')
})
```

### 3. Test Error States

```javascript
it('shows error state', () => {
  render(<Input label="Email" error helperText="Invalid email" />)
  
  const input = screen.getByLabelText(/email/i)
  expect(input).toHaveAttribute('aria-invalid', 'true')
  expect(screen.getByText(/invalid email/i)).toBeInTheDocument()
})
```

### 4. Use Descriptive Test Names

```javascript
// ❌ Bad
it('works', () => { ... })

// ✅ Good
it('disables button when loading prop is true', () => { ... })
```

### 5. Group Related Tests

```javascript
describe('Button', () => {
  describe('when loading', () => {
    it('shows loading text', () => { ... })
    it('disables the button', () => { ... })
  })
  
  describe('when disabled', () => {
    it('prevents click events', () => { ... })
  })
})
```

## Mocking

### Mock Modules

```javascript
import { vi } from 'vitest'

vi.mock('@/utils/api', () => ({
  apiClient: {
    get: vi.fn(),
  },
}))
```

### Mock Functions

```javascript
const mockFn = vi.fn()
render(<Button onClick={mockFn}>Click</Button>)

fireEvent.click(screen.getByRole('button'))
expect(mockFn).toHaveBeenCalledTimes(1)
```

## CI/CD Integration

Add to your CI pipeline:

```yaml
# .github/workflows/ci.yml
- name: Run tests
  run: npm run test:run

- name: Generate coverage
  run: npm run test:coverage
```

## Example Test Files

### Component Test Example

See: `src/components/ui/Button/Button.test.jsx`

### Utility Test Example

See: `src/utils/classNames.test.js`

### Hook Test Example

```javascript
import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCounter } from './useCounter'

describe('useCounter', () => {
  it('increments count', () => {
    const { result } = renderHook(() => useCounter())
    
    act(() => {
      result.current.increment()
    })
    
    expect(result.current.count).toBe(1)
  })
})
```

## Troubleshooting

### Tests not running

1. Check that test files end with `.test.jsx` or `.spec.jsx`
2. Verify `vitest.config.js` is in the root
3. Check that dependencies are installed

### Coverage not generating

1. Run `npm run test:coverage` (not just `npm test`)
2. Check that `coverage/` directory is not in `.gitignore`

### Mock issues

1. Ensure mocks are defined before imports
2. Use `vi.mock()` at the top level
3. Check that mocks are reset between tests

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

*Last Updated: $(date)*

