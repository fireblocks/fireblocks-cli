import {signRequest} from '../auth/signer.js'
import type {AuthContext} from '../auth/config.js'
import {getCliVersion} from '../version.js'
const REQUEST_TIMEOUT_MS = 30_000

export interface RequestOptions {
  body?: Record<string, unknown>
  queryParams?: Record<string, string | number | boolean | undefined | null>
  headers?: Record<string, string>
}

export interface ApiResponse {
  status: number
  body: unknown
  headers: Headers
  requestId?: string
}

export async function fireblocksFetch(
  auth: AuthContext,
  method: string,
  path: string,
  options?: RequestOptions,
): Promise<ApiResponse> {
  // Build query string and include it in the signed path.
  // The Fireblocks server validates the JWT uri claim against the full
  // request path including query params (matching the TS-SDK approach).
  let queryString = ''
  if (options?.queryParams) {
    const params = new URLSearchParams()
    for (const [key, value] of Object.entries(options.queryParams)) {
      if (value === undefined || value === null || value === '') continue
      params.set(key, String(value))
    }

    const qs = params.toString()
    if (qs) queryString = '?' + qs
  }

  const signedPath = path + queryString
  const url = auth.baseUrl + signedPath

  // Serialize body
  const bodyString = options?.body ? JSON.stringify(options.body) : undefined

  // Sign the request
  const jwt = await signRequest(auth.apiKey, auth.privateKey, signedPath, bodyString)

  // Build headers
  const headers: Record<string, string> = {
    ...options?.headers,
    Authorization: `Bearer ${jwt}`,
    'X-API-Key': auth.apiKey,
    'User-Agent': `fireblocks-cli/${getCliVersion()}`,
  }

  if (bodyString) {
    headers['Content-Type'] = 'application/json'
  }

  // Execute fetch
  const response = await fetch(url, {
    method,
    headers,
    body: bodyString,
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  })

  const contentType = response.headers.get('content-type') ?? ''
  let responseBody: unknown = null
  if (contentType.includes('application/json') && response.status !== 204) {
    const text = await response.text()
    try {
      responseBody = JSON.parse(text)
    } catch {
      responseBody = {_parseError: 'Response body was not valid JSON', _rawBody: text.slice(0, 1000)}
    }
  }
  const requestId = response.headers.get('x-request-id') ?? undefined

  return {
    status: response.status,
    body: responseBody,
    headers: response.headers,
    requestId,
  }
}
