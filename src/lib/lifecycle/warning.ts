/**
 * API lifecycle warnings.
 *
 * When a response reports a non-GA lifecycle state, the CLI prints a warning to
 * stderr naming the operation and its state. The state is read from the
 * `Fireblocks-Lifecycle-State` response header, so it stays accurate regardless of
 * which CLI version is installed.
 *
 * The wording is identical to the Fireblocks SDKs (Python, TypeScript, Java).
 *
 * Header values are used as received. They are gateway-authored: the gateway strips
 * any downstream-supplied lifecycle headers and reapplies its own, derived from the
 * deployed specification, which is validated by the OpenAPI lint rules.
 */

/** Set (e.g. to 1) to suppress lifecycle warnings entirely; 0 and false do not suppress. */
export const SUPPRESS_ENV_VAR = 'FIREBLOCKS_SDK_SUPPRESS_LIFECYCLE_WARNING'

export const LIFECYCLE_STATE_HEADER = 'Fireblocks-Lifecycle-State'
export const SUNSET_HEADER = 'Sunset'
export const LINK_HEADER = 'Link'

export const BETA_STATE = 'beta'
export const DEPRECATED_STATE = 'deprecated'
export const CLOSED_STATE = 'closed'
export const WARNING_STATES: ReadonlySet<string> = new Set([BETA_STATE, DEPRECATED_STATE, CLOSED_STATE])

// The gateway answers a closed operation with 410 Gone to every caller without a
// temporary exception. That response already says what happened, so no warning.
export const GONE_STATUS = 410

export const REL_DEPRECATION = 'deprecation'
export const REL_SUCCESSOR_VERSION = 'successor-version'

// RFC 8288. Anchored on the angle brackets rather than split on commas, because a
// comma is legal inside a URI and Headers joins repeated Link headers with ", ".
// `rel` may follow other parameters (`<url>; type="text/html"; rel="deprecation"`), is
// matched case-insensitively, and may be quoted or bare. `[^<]*?` keeps the parameters
// between `>` and `rel` from running into the next link-value.
const LINK_PATTERN = /<([^>]*)>[^<]*?;\s*rel\s*=\s*(?:"([^"]*)"|([^\s;,]+))/gi

/** True when the suppression env var is set to anything other than 0 or false. */
export function isSuppressed(value: string | undefined): boolean {
  return Boolean(value) && value !== '0' && value !== 'false'
}

/** Map link relation -> URL, first occurrence wins. */
function parseLinks(headers: Headers): Record<string, string> {
  const links: Record<string, string> = {}
  const raw = headers.get(LINK_HEADER)
  if (!raw) return links

  for (const match of raw.matchAll(LINK_PATTERN)) {
    const url = match[1].trim()
    // `rel` can list several relation types separated by spaces: rel="deprecation successor-version"
    for (const relation of (match[2] ?? match[3]).toLowerCase().split(/\s+/)) {
      if (relation && !(relation in links)) {
        links[relation] = url
      }
    }
  }

  return links
}

/**
 * Build the warning for a response, or undefined when nothing should be logged.
 * Silent on: absent or empty header, an unrecognised state, `ga`, and a `closed`
 * operation answered with 410 Gone. An unknown status counts as "not 410".
 */
export function buildLifecycleWarning(
  headers: Headers,
  operationId: string,
  status?: number,
): string | undefined {
  const rawState = headers.get(LIFECYCLE_STATE_HEADER)
  if (!rawState) return undefined

  const state = rawState.trim().toLowerCase()
  if (!WARNING_STATES.has(state)) return undefined

  if (state === BETA_STATE) {
    return (
      `Operation '${operationId}' is in 'beta' lifecycle state and is not generally available.` +
      ' It may change or be removed without notice.'
    )
  }

  if (state === CLOSED_STATE) {
    if (status === GONE_STATUS) return undefined
    return (
      `Operation '${operationId}' has been closed and is no longer supported.` +
      ' Your access is provided under a temporary exception and may be revoked.' +
      ' Contact your Customer Success Manager for migration support'
    )
  }

  const sunset = headers.get(SUNSET_HEADER)?.trim()
  let message = sunset
    ? `Operation '${operationId}' is deprecated and will stop working after ${sunset}.`
    : `Operation '${operationId}' is deprecated.`

  const links = parseLinks(headers)
  const successor = links[REL_SUCCESSOR_VERSION]
  if (successor) message += ` Use ${successor} instead.`

  const migrationGuide = links[REL_DEPRECATION]
  if (migrationGuide) message += ` Migration guide: ${migrationGuide}`

  return message
}
