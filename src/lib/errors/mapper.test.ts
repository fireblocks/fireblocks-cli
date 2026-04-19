import {mapHttpError, EXIT_CODE} from './mapper.js'

describe('mapHttpError', () => {
  describe('401/403 -> AUTH exit code', () => {
    it('maps 401 to AUTH exit code', () => {
      const result = mapHttpError(401, null)
      expect(result.exitCode).toBe(EXIT_CODE.AUTH)
      expect(result.structured.code).toBe(EXIT_CODE.AUTH)
      expect(result.structured.status).toBe(401)
      expect(result.message).toBe('Authentication error (401)')
    })

    it('maps 403 to AUTH exit code', () => {
      const result = mapHttpError(403, null)
      expect(result.exitCode).toBe(EXIT_CODE.AUTH)
      expect(result.structured.code).toBe(EXIT_CODE.AUTH)
      expect(result.structured.status).toBe(403)
      expect(result.message).toBe('Authentication error (403)')
    })

    it('uses body message for 401 when available', () => {
      const result = mapHttpError(401, {message: 'Invalid API key'})
      expect(result.exitCode).toBe(EXIT_CODE.AUTH)
      expect(result.message).toBe('Invalid API key')
    })
  })

  describe('404 -> NOT_FOUND exit code', () => {
    it('maps 404 to NOT_FOUND exit code', () => {
      const result = mapHttpError(404, null)
      expect(result.exitCode).toBe(EXIT_CODE.NOT_FOUND)
      expect(result.structured.code).toBe(EXIT_CODE.NOT_FOUND)
      expect(result.structured.status).toBe(404)
      expect(result.message).toBe('Resource not found')
    })

    it('uses body message for 404 when available', () => {
      const result = mapHttpError(404, {message: 'Vault account not found'})
      expect(result.exitCode).toBe(EXIT_CODE.NOT_FOUND)
      expect(result.message).toBe('Vault account not found')
    })
  })

  describe('429 -> RATE_LIMIT exit code with retry_after', () => {
    it('maps 429 to RATE_LIMIT exit code', () => {
      const result = mapHttpError(429, null)
      expect(result.exitCode).toBe(EXIT_CODE.RATE_LIMIT)
      expect(result.structured.code).toBe(EXIT_CODE.RATE_LIMIT)
      expect(result.structured.status).toBe(429)
      expect(result.message).toBe('Rate limit exceeded')
    })

    it('includes retry_after when valid numeric string', () => {
      const result = mapHttpError(429, null, 'req-123', '30')
      expect(result.exitCode).toBe(EXIT_CODE.RATE_LIMIT)
      expect(result.structured.retry_after).toBe(30)
    })

    it('does not include retry_after when header is missing', () => {
      const result = mapHttpError(429, null, undefined, null)
      expect(result.structured.retry_after).toBeUndefined()
    })

    it('ignores NaN retry_after values like date strings', () => {
      const result = mapHttpError(429, null, 'req-123', 'Wed, 21 Oct 2015')
      expect(result.structured.retry_after).toBeUndefined()
    })

    it('ignores negative retry_after values', () => {
      const result = mapHttpError(429, null, 'req-123', '-1')
      expect(result.structured.retry_after).toBeUndefined()
    })
  })

  describe('500+ -> SERVER exit code', () => {
    it('maps 500 to SERVER exit code', () => {
      const result = mapHttpError(500, null)
      expect(result.exitCode).toBe(EXIT_CODE.SERVER)
      expect(result.structured.code).toBe(EXIT_CODE.SERVER)
      expect(result.structured.status).toBe(500)
      expect(result.message).toBe('Server error (500)')
    })

    it('maps 502 to SERVER exit code', () => {
      const result = mapHttpError(502, null)
      expect(result.exitCode).toBe(EXIT_CODE.SERVER)
      expect(result.message).toBe('Server error (502)')
    })

    it('maps 503 to SERVER exit code', () => {
      const result = mapHttpError(503, null)
      expect(result.exitCode).toBe(EXIT_CODE.SERVER)
      expect(result.message).toBe('Server error (503)')
    })
  })

  describe('other status codes -> GENERAL exit code', () => {
    it('maps 400 to GENERAL exit code', () => {
      const result = mapHttpError(400, null)
      expect(result.exitCode).toBe(EXIT_CODE.GENERAL)
      expect(result.structured.code).toBe(EXIT_CODE.GENERAL)
      expect(result.message).toBe('HTTP error 400')
    })

    it('maps 422 to GENERAL exit code', () => {
      const result = mapHttpError(422, {message: 'Validation error'})
      expect(result.exitCode).toBe(EXIT_CODE.GENERAL)
      expect(result.message).toBe('Validation error')
    })

    it('maps 409 to GENERAL exit code', () => {
      const result = mapHttpError(409, null)
      expect(result.exitCode).toBe(EXIT_CODE.GENERAL)
      expect(result.message).toBe('HTTP error 409')
    })
  })

  describe('request_id handling', () => {
    it('includes request_id in structured error when provided', () => {
      const result = mapHttpError(500, null, 'req-abc-123')
      expect(result.structured.request_id).toBe('req-abc-123')
    })

    it('does not include request_id when not provided', () => {
      const result = mapHttpError(500, null)
      expect(result.structured.request_id).toBeUndefined()
    })
  })

  describe('body message extraction', () => {
    it('extracts message from body object', () => {
      const result = mapHttpError(400, {message: 'Bad request body'})
      expect(result.message).toBe('Bad request body')
    })

    it('uses default message when body has no message field', () => {
      const result = mapHttpError(400, {error: 'something'})
      expect(result.message).toBe('HTTP error 400')
    })

    it('uses default message when body is null', () => {
      const result = mapHttpError(500, null)
      expect(result.message).toBe('Server error (500)')
    })

    it('uses default message when body is a string', () => {
      const result = mapHttpError(500, 'plain string')
      expect(result.message).toBe('Server error (500)')
    })
  })
})
