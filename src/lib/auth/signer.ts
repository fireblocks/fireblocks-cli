import {SignJWT, importPKCS8} from 'jose'
import {createHash, randomUUID} from 'node:crypto'

let cachedKey: {pemHash: string; key: CryptoKey} | null = null

async function getKey(privateKey: string): Promise<CryptoKey> {
  const pemHash = createHash('sha256').update(privateKey).digest('hex')
  if (cachedKey?.pemHash === pemHash) return cachedKey.key
  const key = await importPKCS8(privateKey, 'RS256')
  cachedKey = {pemHash, key}
  return key
}

const JWT_EXPIRY_SECONDS = 55

// Matches the signing approach from fireblocks/ts-sdk bearerTokenProvider.ts
export async function signRequest(
  apiKey: string,
  privateKey: string,
  path: string,
  body?: string,
): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  const bodyHash = createHash('sha256')
    .update(body || '')
    .digest('hex')

  const key = await getKey(privateKey)

  return new SignJWT({
    uri: path,
    nonce: randomUUID(),
    sub: apiKey,
    bodyHash,
  })
    .setProtectedHeader({alg: 'RS256', typ: 'JWT'})
    .setIssuedAt(now)
    .setExpirationTime(now + JWT_EXPIRY_SECONDS)
    .sign(key)
}
