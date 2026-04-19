import {generateKeyPairSync} from 'node:crypto'

// Generate a real RSA key pair for signing
const {privateKey: TEST_PRIVATE_KEY} = generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {type: 'spki', format: 'pem'},
  privateKeyEncoding: {type: 'pkcs8', format: 'pem'},
})

const TEST_API_KEY = 'e2e-test-api-key'
const TEST_BASE_URL = 'https://api.fireblocks.io'

// Mock resolveAuth so commands don't need real credentials or config files
jest.mock('../src/lib/auth/config.js', () => ({
  resolveAuth: jest.fn().mockResolvedValue({
    apiKey: TEST_API_KEY,
    privateKey: TEST_PRIVATE_KEY,
    baseUrl: TEST_BASE_URL,
  }),
}))

jest.mock('../src/lib/auth/index.js', () => ({
  resolveAuth: jest.fn().mockResolvedValue({
    apiKey: TEST_API_KEY,
    privateKey: TEST_PRIVATE_KEY,
    baseUrl: TEST_BASE_URL,
  }),
}))

// Mock the HTTP client to intercept all API calls
const mockFireblocksFetch = jest.fn()
jest.mock('../src/lib/http/client.js', () => ({
  fireblocksFetch: mockFireblocksFetch,
}))

// Suppress oclif's command discovery warnings — oclif emits CLIError objects
// via process.emitWarning(), which Node 22+ rejects (expects string or Error).
const originalEmitWarning = process.emitWarning
beforeAll(() => {
  process.emitWarning = (() => {}) as typeof process.emitWarning
})

afterAll(() => {
  process.emitWarning = originalEmitWarning
})

beforeEach(() => {
  mockFireblocksFetch.mockReset()
})

afterEach(() => {
  jest.restoreAllMocks()
})

/**
 * Helper: create a mock ApiResponse compatible with what fireblocksFetch returns.
 */
function createMockApiResponse(
  status: number,
  body: unknown,
  headers?: Record<string, string>,
  requestId?: string,
) {
  return {
    status,
    body,
    headers: new Headers(headers),
    requestId,
  }
}

describe('e2e: full command execution flow', () => {
  describe('successful GET request', () => {
    it('executes a GET command and outputs the response', async () => {
      const mockBody = {
        id: 'vault-1',
        name: 'My Vault',
        assets: [],
      }

      mockFireblocksFetch.mockResolvedValueOnce(createMockApiResponse(200, mockBody))

      // Import and run the command
      const {default: GetVaultAccount} = require(
        '../src/commands/vaults/get-vault-account.js'
      )

      // Use oclif's run method with argv
      try {
        await GetVaultAccount.run([
          '--vault-account-id', '123',
          '--no-confirm',
        ])
      } catch (error: any) {
        // oclif wraps exits in errors; successful exits are expected
        if (error?.oclif?.exit !== undefined && error.oclif.exit !== 0) {
          throw error
        }
      }

      // Verify fireblocksFetch was called
      expect(mockFireblocksFetch).toHaveBeenCalledTimes(1)

      const [auth, method, path] = mockFireblocksFetch.mock.calls[0]
      expect(path).toContain('/v1/vault/accounts/123')
      expect(method).toBe('GET')

      // Verify auth context was passed
      expect(auth.apiKey).toBe(TEST_API_KEY)
      expect(auth.baseUrl).toBe(TEST_BASE_URL)
    })
  })

  describe('successful POST request with --data', () => {
    it('executes a POST command with JSON body', async () => {
      const mockResponseBody = {
        id: 'tx-1',
        status: 'SUBMITTED',
      }

      mockFireblocksFetch.mockResolvedValueOnce(createMockApiResponse(200, mockResponseBody))

      const {default: CreateTransaction} = require(
        '../src/commands/transactions/create-transaction.js'
      )

      try {
        await CreateTransaction.run([
          '--data', '{"assetId":"BTC","amount":"1.0","source":{"type":"VAULT_ACCOUNT","id":"0"},"destination":{"type":"VAULT_ACCOUNT","id":"1"}}',
          '--no-confirm',
        ])
      } catch (error: any) {
        if (error?.oclif?.exit !== undefined && error.oclif.exit !== 0) {
          throw error
        }
      }

      expect(mockFireblocksFetch).toHaveBeenCalledTimes(1)

      const [auth, method, path, options] = mockFireblocksFetch.mock.calls[0]
      expect(path).toContain('/v1/transactions')
      expect(method).toBe('POST')
      expect(options?.body).toBeDefined()
      expect(options.body.assetId).toBe('BTC')
      expect(options.body.amount).toBe('1.0')
    })
  })

  describe('--dry-run mode', () => {
    it('outputs request preview without making an HTTP call', async () => {
      const {default: GetVaultAccount} = require(
        '../src/commands/vaults/get-vault-account.js'
      )

      try {
        await GetVaultAccount.run([
          '--vault-account-id', '456',
          '--dry-run',
          '--no-confirm',
        ])
      } catch (error: any) {
        if (error?.oclif?.exit !== undefined && error.oclif.exit !== 0) {
          throw error
        }
      }

      // fireblocksFetch should NOT have been called in dry-run mode
      expect(mockFireblocksFetch).not.toHaveBeenCalled()
    })
  })

  describe('--output flag', () => {
    it('outputs JSON by default', async () => {
      const mockBody = {id: 'vault-1', name: 'My Vault', assets: []}

      mockFireblocksFetch.mockResolvedValueOnce(createMockApiResponse(200, mockBody))

      const {default: GetVaultAccount} = require('../src/commands/vaults/get-vault-account.js')
      const logSpy = jest.spyOn(GetVaultAccount.prototype, 'log').mockImplementation(() => {})

      try {
        await GetVaultAccount.run(['--vault-account-id', '123', '--no-confirm'])
      } catch (error: any) {
        if (error?.oclif?.exit !== undefined && error.oclif.exit !== 0) throw error
      }

      const output = logSpy.mock.calls[0][0] as string
      expect(() => JSON.parse(output)).not.toThrow()
      expect(output).toContain('"vault-1"')
      logSpy.mockRestore()
    })

    it('outputs YAML when --output yaml is set', async () => {
      const mockBody = {id: 'vault-1', name: 'My Vault', assets: []}

      mockFireblocksFetch.mockResolvedValueOnce(createMockApiResponse(200, mockBody))

      const {default: GetVaultAccount} = require('../src/commands/vaults/get-vault-account.js')
      const logSpy = jest.spyOn(GetVaultAccount.prototype, 'log').mockImplementation(() => {})

      try {
        await GetVaultAccount.run(['--vault-account-id', '123', '--no-confirm', '--output', 'yaml'])
      } catch (error: any) {
        if (error?.oclif?.exit !== undefined && error.oclif.exit !== 0) throw error
      }

      const output = logSpy.mock.calls[0][0] as string
      expect(output).toContain('id: vault-1')
      expect(output).toContain('name: My Vault')
      expect(output).not.toContain('"vault-1"')
      logSpy.mockRestore()
    })

    it('outputs YAML when -o yaml short flag is set', async () => {
      const mockBody = [{id: 'tx-1', status: 'COMPLETED'}]

      mockFireblocksFetch.mockResolvedValueOnce(createMockApiResponse(200, mockBody))

      const {default: GetTransactions} = require('../src/commands/transactions/get-transactions.js')
      const logSpy = jest.spyOn(GetTransactions.prototype, 'log').mockImplementation(() => {})

      try {
        await GetTransactions.run(['--no-confirm', '-o', 'yaml'])
      } catch (error: any) {
        if (error?.oclif?.exit !== undefined && error.oclif.exit !== 0) throw error
      }

      const output = logSpy.mock.calls[0][0] as string
      expect(output).toContain('id: tx-1')
      expect(output).toContain('status: COMPLETED')
      expect(output).not.toContain('"tx-1"')
      logSpy.mockRestore()
    })

    it('outputs YAML for dry-run preview when --output yaml is set', async () => {
      const {default: GetVaultAccount} = require('../src/commands/vaults/get-vault-account.js')
      const logSpy = jest.spyOn(GetVaultAccount.prototype, 'log').mockImplementation(() => {})

      try {
        await GetVaultAccount.run(['--vault-account-id', '456', '--dry-run', '--no-confirm', '--output', 'yaml'])
      } catch (error: any) {
        if (error?.oclif?.exit !== undefined && error.oclif.exit !== 0) throw error
      }

      expect(mockFireblocksFetch).not.toHaveBeenCalled()
      const output = logSpy.mock.calls[0][0] as string
      expect(output).toContain('method: GET')
      expect(output).toContain('/v1/vault/accounts/456')
      logSpy.mockRestore()
    })
  })

  describe('--include-headers flag', () => {
    it('prints response headers to stderr when flag is set', async () => {
      const mockBody = [{id: 'tx-1', status: 'COMPLETED'}]

      mockFireblocksFetch.mockResolvedValueOnce(
        createMockApiResponse(200, mockBody, {
          'x-request-id': 'req-abc-123',
          'next-page': 'https://api.fireblocks.io/v1/transactions?next=cursor123',
          'prev-page': 'https://api.fireblocks.io/v1/transactions?prev=cursor456',
        }),
      )

      const {default: GetTransactions} = require(
        '../src/commands/transactions/get-transactions.js'
      )

      const logSpy = jest.spyOn(GetTransactions.prototype, 'log').mockImplementation(() => {})
      const stderrSpy = jest.spyOn(GetTransactions.prototype, 'logToStderr').mockImplementation(() => {})

      try {
        await GetTransactions.run(['--include-headers', '--no-confirm'])
      } catch (error: any) {
        if (error?.oclif?.exit !== undefined && error.oclif.exit !== 0) {
          throw error
        }
      }

      // Headers go to stderr (keeps stdout clean for pipes/JSON)
      const stderrCalls = stderrSpy.mock.calls.map((c) => c[0])
      expect(stderrCalls[0]).toContain('X-Request-ID: req-abc-123')
      expect(stderrCalls[0]).toContain('next-page: https://api.fireblocks.io/v1/transactions?next=cursor123')
      expect(stderrCalls[0]).toContain('prev-page: https://api.fireblocks.io/v1/transactions?prev=cursor456')

      // Blank separator on stderr
      expect(stderrCalls[1]).toBe('')

      // Body goes to stdout only
      const logCalls = logSpy.mock.calls.map((c) => c[0])
      expect(logCalls).toHaveLength(1)
      expect(logCalls[0]).toContain('"tx-1"')

      logSpy.mockRestore()
      stderrSpy.mockRestore()
    })

    it('does not print headers when flag is not set', async () => {
      const mockBody = [{id: 'tx-1', status: 'COMPLETED'}]

      mockFireblocksFetch.mockResolvedValueOnce(
        createMockApiResponse(200, mockBody, {
          'x-request-id': 'req-abc-123',
          'next-page': 'https://api.fireblocks.io/v1/transactions?next=cursor123',
        }),
      )

      const {default: GetTransactions} = require(
        '../src/commands/transactions/get-transactions.js'
      )

      const logSpy = jest.spyOn(GetTransactions.prototype, 'log').mockImplementation(() => {})

      try {
        await GetTransactions.run(['--no-confirm'])
      } catch (error: any) {
        if (error?.oclif?.exit !== undefined && error.oclif.exit !== 0) {
          throw error
        }
      }

      const logCalls = logSpy.mock.calls.map((c) => c[0])

      // Only the body should be logged, no headers
      expect(logCalls).toHaveLength(1)
      expect(logCalls[0]).toContain('"tx-1"')

      logSpy.mockRestore()
    })

    it('only prints spec-defined headers, not extra response headers', async () => {
      const mockBody = [{id: 'tx-1'}]

      mockFireblocksFetch.mockResolvedValueOnce(
        createMockApiResponse(200, mockBody, {
          'x-request-id': 'req-abc-123',
          'next-page': 'https://api.fireblocks.io/v1/transactions?next=cursor123',
          'content-type': 'application/json',
          'x-custom-header': 'should-not-appear',
        }),
      )

      const {default: GetTransactions} = require(
        '../src/commands/transactions/get-transactions.js'
      )

      const stderrSpy = jest.spyOn(GetTransactions.prototype, 'logToStderr').mockImplementation(() => {})

      try {
        await GetTransactions.run(['--include-headers', '--no-confirm'])
      } catch (error: any) {
        if (error?.oclif?.exit !== undefined && error.oclif.exit !== 0) {
          throw error
        }
      }

      const stderrCalls = stderrSpy.mock.calls.map((c) => c[0])
      const headerOutput = stderrCalls[0]

      expect(headerOutput).toContain('X-Request-ID:')
      expect(headerOutput).toContain('next-page:')
      expect(headerOutput).not.toContain('content-type')
      expect(headerOutput).not.toContain('x-custom-header')

      stderrSpy.mockRestore()
    })

    it('routes headers to stderr on error responses', async () => {
      mockFireblocksFetch.mockResolvedValueOnce(
        createMockApiResponse(401, {message: 'Unauthorized'}, {
          'x-request-id': 'req-err-456',
          'next-page': 'https://api.fireblocks.io/v1/transactions?next=cursor123',
        }),
      )

      const {default: GetTransactions} = require(
        '../src/commands/transactions/get-transactions.js'
      )

      const stderrSpy = jest.spyOn(GetTransactions.prototype, 'logToStderr').mockImplementation(() => {})

      try {
        await GetTransactions.run(['--include-headers', '--no-confirm'])
      } catch (error: any) {
        // expected — 401 exits with code 3
      }

      const stderrCalls = stderrSpy.mock.calls.map((c) => c[0])

      // Headers should appear on stderr
      expect(stderrCalls[0]).toContain('X-Request-ID: req-err-456')
      expect(stderrCalls[0]).toContain('next-page:')

      stderrSpy.mockRestore()
    })

    it('does not print headers when response has none of the spec-defined headers', async () => {
      const mockBody = [{id: 'tx-1'}]

      mockFireblocksFetch.mockResolvedValueOnce(
        createMockApiResponse(200, mockBody, {}),
      )

      const {default: GetTransactions} = require(
        '../src/commands/transactions/get-transactions.js'
      )

      const logSpy = jest.spyOn(GetTransactions.prototype, 'log').mockImplementation(() => {})
      const stderrSpy = jest.spyOn(GetTransactions.prototype, 'logToStderr').mockImplementation(() => {})

      try {
        await GetTransactions.run(['--include-headers', '--no-confirm'])
      } catch (error: any) {
        if (error?.oclif?.exit !== undefined && error.oclif.exit !== 0) {
          throw error
        }
      }

      const logCalls = logSpy.mock.calls.map((c) => c[0])

      // Only the body should be logged — no header output at all
      expect(logCalls).toHaveLength(1)
      expect(logCalls[0]).toContain('"tx-1"')

      // No header output on stderr either
      const stderrCalls = stderrSpy.mock.calls.map((c) => c[0] as string)
      expect(stderrCalls.every((c) => !c.includes('X-Request-ID'))).toBe(true)

      logSpy.mockRestore()
      stderrSpy.mockRestore()
    })
  })

  describe('error scenarios', () => {
    it('handles 401 authentication error with exit code 3', async () => {
      mockFireblocksFetch.mockResolvedValueOnce(
        createMockApiResponse(401, {message: 'Unauthorized'}),
      )

      const {default: GetVaultAccount} = require(
        '../src/commands/vaults/get-vault-account.js'
      )

      try {
        await GetVaultAccount.run([
          '--vault-account-id', '123',
          '--no-confirm',
        ])
        // If we get here without an error, the command didn't exit properly
        throw new Error('Expected command to exit with code 3')
      } catch (error: any) {
        // oclif wraps process.exit in an error with code property
        expect(error?.oclif?.exit).toBe(3)
      }
    })

    it('handles 429 rate limit error with exit code 5', async () => {
      mockFireblocksFetch.mockResolvedValueOnce(
        createMockApiResponse(
          429,
          {message: 'Rate limit exceeded'},
          {'retry-after': '30'},
        ),
      )

      const {default: GetVaultAccount} = require(
        '../src/commands/vaults/get-vault-account.js'
      )

      try {
        await GetVaultAccount.run([
          '--vault-account-id', '123',
          '--no-confirm',
        ])
        throw new Error('Expected command to exit with code 5')
      } catch (error: any) {
        expect(error?.oclif?.exit).toBe(5)
      }
    })

    it('handles 500 server error with exit code 6', async () => {
      mockFireblocksFetch.mockResolvedValueOnce(
        createMockApiResponse(500, {message: 'Internal server error'}),
      )

      const {default: GetVaultAccount} = require(
        '../src/commands/vaults/get-vault-account.js'
      )

      try {
        await GetVaultAccount.run([
          '--vault-account-id', '123',
          '--no-confirm',
        ])
        throw new Error('Expected command to exit with code 6')
      } catch (error: any) {
        expect(error?.oclif?.exit).toBe(6)
      }
    })
  })
})
