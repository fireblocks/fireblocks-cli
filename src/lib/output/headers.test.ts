import {formatHeaders} from './headers.js'

describe('formatHeaders', () => {
  it('returns matching headers in spec-defined order', () => {
    const headers = new Headers({
      'x-request-id': 'abc-123',
      'next-page': 'https://api.fireblocks.io/v1/transactions?next=xyz',
      'prev-page': 'https://api.fireblocks.io/v1/transactions?prev=abc',
    })

    const result = formatHeaders(headers, ['X-Request-ID', 'next-page', 'prev-page'])

    expect(result).toBe(
      'X-Request-ID: abc-123\n' +
      'next-page: https://api.fireblocks.io/v1/transactions?next=xyz\n' +
      'prev-page: https://api.fireblocks.io/v1/transactions?prev=abc',
    )
  })

  it('returns null when no headers match', () => {
    const headers = new Headers({})
    const result = formatHeaders(headers, ['X-Request-ID'])
    expect(result).toBeNull()
  })

  it('skips headers not in the allowlist', () => {
    const headers = new Headers({
      'x-request-id': 'abc-123',
      'content-type': 'application/json',
      'x-extra-header': 'should-not-appear',
    })

    const result = formatHeaders(headers, ['X-Request-ID'])

    expect(result).toBe('X-Request-ID: abc-123')
    expect(result).not.toContain('content-type')
    expect(result).not.toContain('x-extra-header')
  })

  it('skips allowed headers not present in the response', () => {
    const headers = new Headers({
      'x-request-id': 'abc-123',
    })

    const result = formatHeaders(headers, ['X-Request-ID', 'next-page', 'prev-page'])

    expect(result).toBe('X-Request-ID: abc-123')
  })

  it('handles partial presence — only includes present headers', () => {
    const headers = new Headers({
      'next-page': 'https://api.fireblocks.io/v1/transactions?next=xyz',
    })

    const result = formatHeaders(headers, ['X-Request-ID', 'next-page', 'prev-page'])

    expect(result).toBe('next-page: https://api.fireblocks.io/v1/transactions?next=xyz')
  })

  it('preserves allowedHeaders casing in output even if server sends lowercase', () => {
    const headers = new Headers({
      'x-request-id': 'abc-123',
    })

    const result = formatHeaders(headers, ['X-Request-ID'])

    expect(result).toBe('X-Request-ID: abc-123')
  })

  it('returns null for empty allowedHeaders array', () => {
    const headers = new Headers({
      'x-request-id': 'abc-123',
    })

    const result = formatHeaders(headers, [])

    expect(result).toBeNull()
  })
})
