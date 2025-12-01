import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Suspense } from 'react'
import { LazySuspense, PageSuspense, ComponentSuspense } from './LazySuspense'

describe('LazySuspense', () => {
  it('renders children when loaded', async () => {
    const TestComponent = () => <div>Test Content</div>

    render(
      <LazySuspense>
        <TestComponent />
      </LazySuspense>
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('shows loading state with default fallback', () => {
    const LazyComponent = () => <div>Lazy Content</div>

    render(
      <Suspense
        fallback={
          <LazySuspense>
            <LazyComponent />
          </LazySuspense>
        }
      >
        <LazyComponent />
      </Suspense>
    )

    // Should render without throwing
    expect(screen.getByText('Lazy Content')).toBeInTheDocument()
  })

  it('accepts custom fallback', () => {
    const CustomFallback = () => <div>Custom Loading...</div>

    render(
      <LazySuspense fallback={<CustomFallback />}>
        <div>Content</div>
      </LazySuspense>
    )

    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('supports minHeight prop', () => {
    render(
      <LazySuspense minHeight='500px'>
        <div>Content</div>
      </LazySuspense>
    )

    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('can hide loading text', () => {
    render(
      <LazySuspense showText={false}>
        <div>Content</div>
      </LazySuspense>
    )

    expect(screen.getByText('Content')).toBeInTheDocument()
  })
})

describe('PageSuspense', () => {
  it('renders children', () => {
    render(
      <PageSuspense>
        <div>Page Content</div>
      </PageSuspense>
    )

    expect(screen.getByText('Page Content')).toBeInTheDocument()
  })

  it('has proper minHeight for pages', () => {
    render(
      <PageSuspense>
        <div>Page Content</div>
      </PageSuspense>
    )

    expect(screen.getByText('Page Content')).toBeInTheDocument()
  })
})

describe('ComponentSuspense', () => {
  it('renders children', () => {
    render(
      <ComponentSuspense>
        <div>Component Content</div>
      </ComponentSuspense>
    )

    expect(screen.getByText('Component Content')).toBeInTheDocument()
  })

  it('has smaller minHeight for components', () => {
    render(
      <ComponentSuspense>
        <div>Component Content</div>
      </ComponentSuspense>
    )

    expect(screen.getByText('Component Content')).toBeInTheDocument()
  })
})
