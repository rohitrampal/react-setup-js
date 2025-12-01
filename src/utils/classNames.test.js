import { describe, it, expect } from 'vitest'
import { classNames } from './classNames'

describe('classNames', () => {
  it('joins string classes', () => {
    expect(classNames('foo', 'bar', 'baz')).toBe('foo bar baz')
  })

  it('filters out falsy values', () => {
    expect(classNames('foo', false, 'bar', null, 'baz', undefined)).toBe('foo bar baz')
  })

  it('handles conditional classes with objects', () => {
    expect(
      classNames({
        foo: true,
        bar: false,
        baz: true,
      })
    ).toBe('foo baz')
  })

  it('handles mixed string and object classes', () => {
    expect(
      classNames('foo', {
        bar: true,
        baz: false,
      })
    ).toBe('foo bar')
  })

  it('handles empty input', () => {
    expect(classNames()).toBe('')
    expect(classNames('')).toBe('')
  })

  it('handles numbers', () => {
    expect(classNames(1, 2, 3)).toBe('1 2 3')
  })

  it('handles nested conditionals', () => {
    expect(
      classNames('base', {
        active: true,
        disabled: false,
        'text-lg': true,
      })
    ).toBe('base active text-lg')
  })

  it('handles null and undefined gracefully', () => {
    expect(classNames('foo', null, undefined, 'bar')).toBe('foo bar')
  })
})
