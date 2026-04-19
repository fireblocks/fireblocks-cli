import {generateKeyPairSync} from 'node:crypto'
import {resolve} from 'node:path'

import {resolveAuth} from './config.js'

// Mock the fs/promises module used by config.ts
jest.mock('node:fs/promises', () => ({
  readFile: jest.fn(),
  mkdir: jest.fn(),
  writeFile: jest.fn(),
}))

import {readFile} from 'node:fs/promises'

const mockReadFile = readFile as jest.Mock

function enoent(): NodeJS.ErrnoException {
  const err: NodeJS.ErrnoException = new Error('ENOENT: no such file or directory')
  err.code = 'ENOENT'
  return err
}

const KEY_PATH = resolve('/path/to/key.pem')
const STAGING_KEY_PATH = resolve('/path/to/staging-key.pem')

let FAKE_PEM: string
let FAKE_CONFIG: string

beforeEach(() => {
  FAKE_PEM = generateKeyPairSync('rsa', {
    modulusLength: 1024,
    privateKeyEncoding: {type: 'pkcs8', format: 'pem'},
    publicKeyEncoding: {type: 'spki', format: 'pem'},
  }).privateKey

  FAKE_CONFIG = JSON.stringify({
    profiles: {
      default: {
        apiKey: 'config-api-key',
        privateKeyPath: KEY_PATH,
        baseUrl: 'https://config-base.example.com',
      },
      staging: {
        apiKey: 'staging-api-key',
        privateKeyPath: STAGING_KEY_PATH,
      },
    },
    defaultProfile: 'default',
  })

  jest.resetAllMocks()
  delete process.env.FIREBLOCKS_API_KEY
  delete process.env.FIREBLOCKS_SECRET_KEY
  delete process.env.FIREBLOCKS_SECRET_KEY_PATH
  delete process.env.FIREBLOCKS_BASE_URL
})

afterEach(() => {
  delete process.env.FIREBLOCKS_API_KEY
  delete process.env.FIREBLOCKS_SECRET_KEY
  delete process.env.FIREBLOCKS_SECRET_KEY_PATH
  delete process.env.FIREBLOCKS_BASE_URL
})

describe('resolveAuth', () => {
  describe('precedence: CLI flags > env vars > config file', () => {
    it('uses CLI flags when all sources are available', async () => {
      process.env.FIREBLOCKS_API_KEY = 'env-api-key'
      process.env.FIREBLOCKS_SECRET_KEY = FAKE_PEM

      const result = await resolveAuth({
        apiKey: 'flag-api-key',
        secretKey: FAKE_PEM,
        baseUrl: 'https://flag-base.example.com',
      })

      expect(result.apiKey).toBe('flag-api-key')
      expect(result.baseUrl).toBe('https://flag-base.example.com')
      expect(result.privateKey).toBe(FAKE_PEM)
    })

    it('falls back to env vars when flags are not provided', async () => {
      process.env.FIREBLOCKS_API_KEY = 'env-api-key'
      process.env.FIREBLOCKS_SECRET_KEY = FAKE_PEM
      process.env.FIREBLOCKS_BASE_URL = 'https://env-base.example.com'

      const result = await resolveAuth({})

      expect(result.apiKey).toBe('env-api-key')
      expect(result.privateKey).toBe(FAKE_PEM)
      expect(result.baseUrl).toBe('https://env-base.example.com')
    })

    it('falls back to FIREBLOCKS_SECRET_KEY_PATH env var', async () => {
      process.env.FIREBLOCKS_API_KEY = 'env-api-key'
      process.env.FIREBLOCKS_SECRET_KEY_PATH = '/env/path/to/key.pem'

      mockReadFile.mockImplementation(async (path: any) => {
        if (String(path) === resolve('/env/path/to/key.pem')) return FAKE_PEM
        throw enoent()
      })

      const result = await resolveAuth({})

      expect(result.apiKey).toBe('env-api-key')
      expect(result.privateKey).toBe(FAKE_PEM)
    })

    it('falls back to config file when flags and env vars are not provided', async () => {
      mockReadFile.mockImplementation(async (path: any) => {
        const pathStr = String(path)
        if (pathStr.endsWith('config.json')) return FAKE_CONFIG
        if (pathStr === KEY_PATH) return FAKE_PEM
        throw new Error(`Unexpected readFile call: ${pathStr}`)
      })

      const result = await resolveAuth({})

      expect(result.apiKey).toBe('config-api-key')
      expect(result.privateKey).toBe(FAKE_PEM)
      expect(result.baseUrl).toBe('https://config-base.example.com')
    })

    it('uses a named profile from config file', async () => {
      mockReadFile.mockImplementation(async (path: any) => {
        const pathStr = String(path)
        if (pathStr.endsWith('config.json')) return FAKE_CONFIG
        if (pathStr === STAGING_KEY_PATH) return FAKE_PEM
        throw new Error(`Unexpected readFile call: ${pathStr}`)
      })

      const result = await resolveAuth({profile: 'staging'})

      expect(result.apiKey).toBe('staging-api-key')
      expect(result.privateKey).toBe(FAKE_PEM)
      // staging profile has no baseUrl, so default should be used
      expect(result.baseUrl).toBe('https://api.fireblocks.io')
    })
  })

  describe('error handling', () => {
    it('throws when no credentials are available', async () => {
      mockReadFile.mockRejectedValue(enoent())

      await expect(resolveAuth({})).rejects.toThrow('Missing Fireblocks credentials')
    })

    it('throws when only api key is provided without secret key', async () => {
      mockReadFile.mockRejectedValue(enoent())

      await expect(resolveAuth({apiKey: 'some-key'})).rejects.toThrow(
        'Missing Fireblocks credentials',
      )
    })

    it('throws when only secret key is provided without api key', async () => {
      mockReadFile.mockRejectedValue(enoent())

      await expect(resolveAuth({secretKey: FAKE_PEM})).rejects.toThrow(
        'Missing Fireblocks credentials',
      )
    })
  })

  describe('private key reading', () => {
    it('uses inline PEM directly when it contains BEGIN marker', async () => {
      const result = await resolveAuth({
        apiKey: 'test-key',
        secretKey: FAKE_PEM,
      })

      expect(result.privateKey).toBe(FAKE_PEM)
      // readFile should not be called for the private key (only potentially for config)
    })

    it('reads private key from file path when no BEGIN marker present', async () => {
      mockReadFile.mockImplementation(async (path: any) => {
        if (String(path) === resolve('/my/key.pem')) return FAKE_PEM
        throw enoent()
      })

      const result = await resolveAuth({
        apiKey: 'test-key',
        secretKey: '/my/key.pem',
      })

      expect(result.privateKey).toBe(FAKE_PEM)
    })
  })

  describe('default base URL', () => {
    it('uses default base URL when none is specified', async () => {
      const result = await resolveAuth({
        apiKey: 'test-key',
        secretKey: FAKE_PEM,
      })

      expect(result.baseUrl).toBe('https://api.fireblocks.io')
    })
  })

  describe('base URL validation', () => {
    it('rejects HTTP base URL by default', async () => {
      await expect(
        resolveAuth({apiKey: 'test-key', secretKey: FAKE_PEM, baseUrl: 'http://localhost:3000'}),
      ).rejects.toThrow('HTTP base URLs are not allowed')
    })

    it('allows HTTP base URL when FIREBLOCKS_ALLOW_HTTP is set', async () => {
      process.env.FIREBLOCKS_ALLOW_HTTP = '1'
      const result = await resolveAuth({
        apiKey: 'test-key',
        secretKey: FAKE_PEM,
        baseUrl: 'http://localhost:3000',
      })
      expect(result.baseUrl).toBe('http://localhost:3000')
      delete process.env.FIREBLOCKS_ALLOW_HTTP
    })

    it('accepts HTTPS base URL', async () => {
      const result = await resolveAuth({
        apiKey: 'test-key',
        secretKey: FAKE_PEM,
        baseUrl: 'https://sandbox.fireblocks.io',
      })
      expect(result.baseUrl).toBe('https://sandbox.fireblocks.io')
    })

    it('rejects invalid URL', async () => {
      await expect(
        resolveAuth({apiKey: 'test-key', secretKey: FAKE_PEM, baseUrl: 'not-a-url'}),
      ).rejects.toThrow('Invalid base URL')
    })
  })
})
