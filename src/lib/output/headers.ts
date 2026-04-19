/**
 * Format response headers for display. Only includes headers that are both
 * in the allowed list (from the OpenAPI spec) and present in the actual response.
 * Returns null if no matching headers are found.
 */
export function formatHeaders(
  responseHeaders: Headers,
  allowedHeaders: string[],
): string | null {
  const lines: string[] = []
  for (const name of allowedHeaders) {
    const value = responseHeaders.get(name)
    if (value !== null) {
      lines.push(`${name}: ${value}`)
    }
  }

  return lines.length > 0 ? lines.join('\n') : null
}
