export interface StructuredError {
  code: number
  status: number
  message: string
  request_id?: string
  retry_after?: number
}

export const EXIT_CODE = {
  GENERAL: 1,
  AUTH: 3,
  NOT_FOUND: 4,
  RATE_LIMIT: 5,
  SERVER: 6,
  TIMEOUT: 7,
} as const

export function mapHttpError(
  status: number,
  body: unknown,
  requestId?: string,
  retryAfter?: string | null,
): {exitCode: number; message: string; structured: StructuredError} {
  let exitCode: number
  let message: string

  const bodyMessage =
    typeof body === 'object' && body !== null && 'message' in body
      ? String((body as {message: unknown}).message)
      : undefined

  switch (true) {
    case status === 401 || status === 403:
      exitCode = EXIT_CODE.AUTH
      message = bodyMessage ?? `Authentication error (${status})`
      break
    case status === 404:
      exitCode = EXIT_CODE.NOT_FOUND
      message = bodyMessage ?? 'Resource not found'
      break
    case status === 429:
      exitCode = EXIT_CODE.RATE_LIMIT
      message = bodyMessage ?? 'Rate limit exceeded'
      break
    case status >= 500:
      exitCode = EXIT_CODE.SERVER
      message = bodyMessage ?? `Server error (${status})`
      break
    default:
      exitCode = EXIT_CODE.GENERAL
      message = bodyMessage ?? `HTTP error ${status}`
  }

  const structured: StructuredError = {
    code: exitCode,
    status,
    message,
  }

  if (requestId) structured.request_id = requestId
  if (retryAfter) {
    const parsed = Number.parseInt(retryAfter, 10)
    if (!Number.isNaN(parsed) && parsed > 0) {
      structured.retry_after = parsed
    }
  }

  return {exitCode, message, structured}
}
