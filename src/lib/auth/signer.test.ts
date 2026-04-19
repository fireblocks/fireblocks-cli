import {generateKeyPairSync, createHash, createVerify, createSign, createPrivateKey} from 'node:crypto'

// Mock jose (ESM-only) with native Node.js crypto equivalents so signer.ts can load
jest.mock('jose', () => {
  const {createSign: _createSign, createPrivateKey: _createPrivateKey} = require('node:crypto')

  class SignJWT {
    private _payload: Record<string, unknown>
    private _header: Record<string, unknown> = {}
    private _iat?: number
    private _exp?: number

    constructor(payload: Record<string, unknown>) {
      this._payload = {...payload}
    }

    setProtectedHeader(header: Record<string, unknown>) {
      this._header = header
      return this
    }

    setIssuedAt(time: number) {
      this._iat = time
      return this
    }

    setExpirationTime(time: number) {
      this._exp = time
      return this
    }

    async sign(key: {pem: string}) {
      const payload = {...this._payload}
      if (this._iat !== undefined) payload.iat = this._iat
      if (this._exp !== undefined) payload.exp = this._exp

      const headerB64 = Buffer.from(JSON.stringify(this._header)).toString('base64url')
      const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url')
      const data = `${headerB64}.${payloadB64}`

      const signer = _createSign('RSA-SHA256')
      signer.update(data)
      const signature = signer.sign(key.pem, 'base64url')
      return `${data}.${signature}`
    }
  }

  async function importPKCS8(pem: string, _alg: string) {
    return {pem}
  }

  return {SignJWT, importPKCS8}
})

import {signRequest} from './signer.js'

// Generate a test RSA key pair in PEM format
const {publicKey, privateKey} = generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {type: 'spki', format: 'pem'},
  privateKeyEncoding: {type: 'pkcs8', format: 'pem'},
})

const TEST_API_KEY = 'test-api-key-12345'
const TEST_PATH = '/v1/vault/accounts'

// Native JWT decoding helpers (avoids ESM-only jose dependency in tests)
function decodeJwtHeader(token: string): Record<string, unknown> {
  const [headerB64] = token.split('.')
  return JSON.parse(Buffer.from(headerB64, 'base64url').toString())
}

function decodeJwtPayload(token: string): Record<string, unknown> {
  const [, payloadB64] = token.split('.')
  return JSON.parse(Buffer.from(payloadB64, 'base64url').toString())
}

function verifyJwtSignature(token: string, pubKey: string): boolean {
  const [headerB64, payloadB64, signatureB64] = token.split('.')
  const data = `${headerB64}.${payloadB64}`
  const signature = Buffer.from(signatureB64, 'base64url')
  const verifier = createVerify('RSA-SHA256')
  verifier.update(data)
  return verifier.verify(pubKey, signature)
}

describe('signRequest', () => {
  it('produces a valid JWT with RS256 algorithm', async () => {
    const token = await signRequest(TEST_API_KEY, privateKey, TEST_PATH)

    const header = decodeJwtHeader(token)
    expect(header.alg).toBe('RS256')
    expect(header.typ).toBe('JWT')
  })

  it('can be verified with the corresponding public key', async () => {
    const token = await signRequest(TEST_API_KEY, privateKey, TEST_PATH)

    expect(verifyJwtSignature(token, publicKey)).toBe(true)

    const payload = decodeJwtPayload(token)
    expect(payload.sub).toBe(TEST_API_KEY)
    expect(payload.uri).toBe(TEST_PATH)
  })

  it('includes correct payload fields without body', async () => {
    const token = await signRequest(TEST_API_KEY, privateKey, TEST_PATH)

    const payload = decodeJwtPayload(token)

    expect(payload.sub).toBe(TEST_API_KEY)
    expect(payload.uri).toBe(TEST_PATH)
    expect(payload.nonce).toBeDefined()
    expect(typeof payload.nonce).toBe('string')
    // nonce should be a UUID v4 pattern
    expect(payload.nonce).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    )
    expect(payload.iat).toBeDefined()
    expect(typeof payload.iat).toBe('number')
    expect(payload.exp).toBeDefined()
    expect(typeof payload.exp).toBe('number')
    // exp should be iat + 55
    expect((payload.exp as number) - (payload.iat as number)).toBe(55)

    // bodyHash is SHA-256 of empty string when no body provided
    const expectedHash = createHash('sha256').update('').digest('hex')
    expect(payload.bodyHash).toBe(expectedHash)
  })

  it('includes correct bodyHash when body is provided', async () => {
    const body = '{"amount": "1.5", "assetId": "BTC"}'
    const token = await signRequest(TEST_API_KEY, privateKey, TEST_PATH, body)

    const payload = decodeJwtPayload(token)

    const expectedHash = createHash('sha256').update(body).digest('hex')
    expect(payload.bodyHash).toBe(expectedHash)
  })

  it('generates unique nonces for each call', async () => {
    const token1 = await signRequest(TEST_API_KEY, privateKey, TEST_PATH)
    const token2 = await signRequest(TEST_API_KEY, privateKey, TEST_PATH)

    const payload1 = decodeJwtPayload(token1)
    const payload2 = decodeJwtPayload(token2)

    expect(payload1.nonce).not.toBe(payload2.nonce)
  })

  it('uses the api key as the subject claim', async () => {
    const customKey = 'my-custom-api-key-67890'
    const token = await signRequest(customKey, privateKey, TEST_PATH)

    const payload = decodeJwtPayload(token)
    expect(payload.sub).toBe(customKey)
  })

  it('uses the path as the uri claim', async () => {
    const customPath = '/v1/transactions'
    const token = await signRequest(TEST_API_KEY, privateKey, customPath)

    const payload = decodeJwtPayload(token)
    expect(payload.uri).toBe(customPath)
  })

  it('includes query string in the uri claim when present', async () => {
    const pathWithQuery = '/v1/vault/accounts_paged?orderBy=DESC&limit=200'
    const token = await signRequest(TEST_API_KEY, privateKey, pathWithQuery)

    const payload = decodeJwtPayload(token)
    expect(payload.uri).toBe(pathWithQuery)
  })
})
