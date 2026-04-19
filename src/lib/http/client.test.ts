import {generateKeyPairSync} from 'node:crypto'
import type {AuthContext} from '../auth/config.js'
import type {RequestOptions} from './client.js'

// Mock the signer
jest.mock('../auth/signer.js', () => ({
  signRequest: jest.fn().mockResolvedValue('mock-jwt-token'),
}))

// Mock version module to avoid import.meta.url in Jest CJS mode
jest.mock('../version.js', () => ({
  getCliVersion: () => '1.0.0-test',
}))

import {fireblocksFetch} from './client.js'
import {signRequest} from '../auth/signer.js'

const mockSignRequest = signRequest as jest.Mock

const {privateKey: TEST_PRIVATE_KEY} = generateKeyPairSync('rsa', {
  modulusLength: 2048,
  privateKeyEncoding: {type: 'pkcs8', format: 'pem'},
  publicKeyEncoding: {type: 'spki', format: 'pem'},
})

const testAuth: AuthContext = {
  apiKey: 'test-api-key',
  privateKey: TEST_PRIVATE_KEY,
  baseUrl: 'https://api.test.fireblocks.io',
}

function mockResponse(body: unknown, status = 200, headers: Record<string, string> = {}): Response {
  const defaultHeaders = {'content-type': 'application/json', ...headers}
  return {
    status,
    ok: status < 400,
    headers: new Headers(defaultHeaders),
    json: () => Promise.resolve(body),
    text: () => Promise.resolve(typeof body === 'string' ? body : JSON.stringify(body)),
  } as unknown as Response
}

let originalFetch: typeof globalThis.fetch
const mockFetch = jest.fn<Promise<Response>, [RequestInfo | URL, RequestInit?]>()

beforeEach(() => {
  jest.clearAllMocks()
  originalFetch = globalThis.fetch
  globalThis.fetch = mockFetch as unknown as typeof globalThis.fetch
})

afterEach(() => {
  globalThis.fetch = originalFetch
})

describe('fireblocksFetch', () => {
  describe('basic GET request', () => {
    it('constructs the correct URL, sets auth headers, and uses the right method', async () => {
      mockFetch.mockResolvedValueOnce(mockResponse({data: 'ok'}))

      const result = await fireblocksFetch(testAuth, 'GET', '/v1/vault/accounts')

      expect(mockFetch).toHaveBeenCalledTimes(1)
      const [url, init] = mockFetch.mock.calls[0]
      expect(url).toBe('https://api.test.fireblocks.io/v1/vault/accounts')
      expect(init?.method).toBe('GET')
      expect(init?.headers).toMatchObject({
        Authorization: 'Bearer mock-jwt-token',
        'X-API-Key': 'test-api-key',
        'User-Agent': expect.stringMatching(/^fireblocks-cli\//),
      })
      expect(init?.body).toBeUndefined()

      expect(mockSignRequest).toHaveBeenCalledWith(
        'test-api-key',
        testAuth.privateKey,
        '/v1/vault/accounts',
        undefined,
      )

      expect(result.status).toBe(200)
      expect(result.body).toEqual({data: 'ok'})
    })
  })

  describe('POST with body', () => {
    it('stringifies the body and sets Content-Type header', async () => {
      mockFetch.mockResolvedValueOnce(mockResponse({id: '123'}))

      const options: RequestOptions = {
        body: {name: 'My Vault', autoFuel: true},
      }

      await fireblocksFetch(testAuth, 'POST', '/v1/vault/accounts', options)

      const [, init] = mockFetch.mock.calls[0]
      expect(init?.body).toBe(JSON.stringify({name: 'My Vault', autoFuel: true}))
      expect(init?.headers).toMatchObject({
        'Content-Type': 'application/json',
      })

      expect(mockSignRequest).toHaveBeenCalledWith(
        'test-api-key',
        testAuth.privateKey,
        '/v1/vault/accounts',
        JSON.stringify({name: 'My Vault', autoFuel: true}),
      )
    })
  })

  describe('query parameters', () => {
    it('appends query string to URL and includes it in signed path', async () => {
      mockFetch.mockResolvedValueOnce(mockResponse([]))

      const options: RequestOptions = {
        queryParams: {limit: 10, offset: 0, namePrefix: 'test'},
      }

      await fireblocksFetch(testAuth, 'GET', '/v1/vault/accounts', options)

      const [url] = mockFetch.mock.calls[0]
      const parsed = new URL(url as string)
      expect(parsed.searchParams.get('limit')).toBe('10')
      expect(parsed.searchParams.get('offset')).toBe('0')
      expect(parsed.searchParams.get('namePrefix')).toBe('test')

      // JWT must be signed with path + query string (matches TS-SDK behavior)
      const signedPath = mockSignRequest.mock.calls[0][2] as string
      expect(signedPath).toContain('?')
      expect(signedPath).toMatch(/^\/v1\/vault\/accounts\?/)
      const signedParams = new URLSearchParams(signedPath.split('?')[1])
      expect(signedParams.get('limit')).toBe('10')
      expect(signedParams.get('offset')).toBe('0')
      expect(signedParams.get('namePrefix')).toBe('test')
    })

    it('skips undefined, null, and empty string values', async () => {
      mockFetch.mockResolvedValueOnce(mockResponse([]))

      const options: RequestOptions = {
        queryParams: {
          limit: 10,
          offset: undefined,
          filter: null,
          namePrefix: '',
          active: true,
        },
      }

      await fireblocksFetch(testAuth, 'GET', '/v1/vault/accounts', options)

      const [url] = mockFetch.mock.calls[0]
      const parsed = new URL(url as string)
      expect(parsed.searchParams.get('limit')).toBe('10')
      expect(parsed.searchParams.get('active')).toBe('true')
      expect(parsed.searchParams.has('offset')).toBe(false)
      expect(parsed.searchParams.has('filter')).toBe(false)
      expect(parsed.searchParams.has('namePrefix')).toBe(false)

      // Signed path should only contain the non-empty params
      const signedPath = mockSignRequest.mock.calls[0][2] as string
      const signedParams = new URLSearchParams(signedPath.split('?')[1])
      expect(signedParams.get('limit')).toBe('10')
      expect(signedParams.get('active')).toBe('true')
      expect(signedParams.has('offset')).toBe(false)
    })

    it('signs with bare path when all query params are empty', async () => {
      mockFetch.mockResolvedValueOnce(mockResponse([]))

      const options: RequestOptions = {
        queryParams: {offset: undefined, filter: null, namePrefix: ''},
      }

      await fireblocksFetch(testAuth, 'GET', '/v1/vault/accounts', options)

      expect(mockSignRequest).toHaveBeenCalledWith(
        'test-api-key',
        testAuth.privateKey,
        '/v1/vault/accounts',
        undefined,
      )
    })
  })

  describe('JSON response parsing', () => {
    it('parses JSON response body correctly', async () => {
      const responseData = {id: '1', name: 'Test Account', assets: [{id: 'BTC'}]}
      mockFetch.mockResolvedValueOnce(mockResponse(responseData))

      const result = await fireblocksFetch(testAuth, 'GET', '/v1/vault/accounts/1')

      expect(result.body).toEqual(responseData)
      expect(result.status).toBe(200)
    })
  })

  describe('non-JSON response', () => {
    it('returns null body for non-JSON content types', async () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse('OK', 200, {'content-type': 'text/plain'}),
      )

      const result = await fireblocksFetch(testAuth, 'GET', '/v1/health')

      expect(result.body).toBeNull()
    })
  })

  describe('invalid JSON response', () => {
    it('returns _parseError and _rawBody fields for malformed JSON', async () => {
      const malformedResponse = {
        status: 200,
        ok: true,
        headers: new Headers({'content-type': 'application/json'}),
        json: () => Promise.reject(new Error('Unexpected token')),
        text: () => Promise.resolve('this is not json {{{'),
      } as unknown as Response
      mockFetch.mockResolvedValueOnce(malformedResponse)

      const result = await fireblocksFetch(testAuth, 'GET', '/v1/vault/accounts')

      expect(result.body).toEqual({
        _parseError: 'Response body was not valid JSON',
        _rawBody: 'this is not json {{{',
      })
    })
  })

  describe('request ID extraction', () => {
    it('captures x-request-id header from response', async () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse({ok: true}, 200, {'x-request-id': 'req-abc-123'}),
      )

      const result = await fireblocksFetch(testAuth, 'GET', '/v1/vault/accounts')

      expect(result.requestId).toBe('req-abc-123')
    })

    it('returns undefined requestId when header is absent', async () => {
      const response = {
        status: 200,
        ok: true,
        headers: new Headers({'content-type': 'application/json'}),
        json: () => Promise.resolve({}),
        text: () => Promise.resolve('{}'),
      } as unknown as Response
      mockFetch.mockResolvedValueOnce(response)

      const result = await fireblocksFetch(testAuth, 'GET', '/v1/vault/accounts')

      expect(result.requestId).toBeUndefined()
    })
  })

  describe('204 No Content', () => {
    it('does not attempt body parsing for 204 responses', async () => {
      const textSpy = jest.fn()
      const response = {
        status: 204,
        ok: true,
        headers: new Headers({'content-type': 'application/json'}),
        json: jest.fn(),
        text: textSpy,
      } as unknown as Response
      mockFetch.mockResolvedValueOnce(response)

      const result = await fireblocksFetch(testAuth, 'DELETE', '/v1/vault/accounts/1')

      expect(result.status).toBe(204)
      expect(result.body).toBeNull()
      expect(textSpy).not.toHaveBeenCalled()
      expect(response.json).not.toHaveBeenCalled()
    })
  })
})
