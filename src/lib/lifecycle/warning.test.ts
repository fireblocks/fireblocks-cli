import {
  buildLifecycleWarning,
  isSuppressed,
  LIFECYCLE_STATE_HEADER,
  LINK_HEADER,
  SUNSET_HEADER,
  SUPPRESS_ENV_VAR,
} from './warning.js'

const SUNSET = 'Fri, 15 Jan 2027 00:00:00 GMT'
const MIGRATION_GUIDE = 'https://developer.fireblocks.com/docs/v2-migration'
const SUCCESSOR = 'https://api.fireblocks.io/v1/transactions_v2'

function headersOf(state?: string, sunset?: string, link?: string): Headers {
  const headers = new Headers()
  if (state !== undefined) headers.set(LIFECYCLE_STATE_HEADER, state)
  if (sunset !== undefined) headers.set(SUNSET_HEADER, sunset)
  if (link !== undefined) headers.set(LINK_HEADER, link)
  return headers
}

describe('buildLifecycleWarning', () => {
  describe('states that warn', () => {
    it('warns for beta', () => {
      expect(buildLifecycleWarning(headersOf('beta'), 'getWebhooks')).toBe(
        "Operation 'getWebhooks' is in 'beta' lifecycle state and is not generally available. " +
          'It may change or be removed without notice.',
      )
    })

    it('renders the beta state verbatim, lowercase', () => {
      const message = buildLifecycleWarning(headersOf('beta'), 'op')
      expect(message).toContain("'beta'")
      expect(message).not.toContain("'Beta'")
    })

    it('no longer recognises the old private_beta name (strict rename)', () => {
      expect(buildLifecycleWarning(headersOf('private_beta'), 'op')).toBeUndefined()
      expect(buildLifecycleWarning(headersOf('private_beta'), 'op', 200)).toBeUndefined()
    })

    it('no longer mentions a major version bump', () => {
      expect(buildLifecycleWarning(headersOf('beta'), 'op')).not.toContain('major version')
    })

    it('warns for beta whatever the status, including 410', () => {
      for (const status of [200, 404, 410, 500, undefined]) {
        expect(buildLifecycleWarning(headersOf('beta'), 'op', status)).toBeDefined()
      }
    })
  })

  describe('closed state', () => {
    const CLOSED_MESSAGE =
      "Operation 'getContractTemplates' has been closed and is no longer supported. " +
      'Your access is provided under a temporary exception and may be revoked. ' +
      'Contact your Customer Success Manager for migration support'

    it('stays silent on 410 Gone, which already says the operation is closed', () => {
      expect(buildLifecycleWarning(headersOf('closed'), 'getContractTemplates', 410)).toBeUndefined()
    })

    it.each([200, 201, 400, 401, 403, 404, 429, 500, 503])('warns with the exception message on status %j', (status) => {
      expect(buildLifecycleWarning(headersOf('closed'), 'getContractTemplates', status)).toBe(CLOSED_MESSAGE)
    })

    it('warns when the status is not known, since only a known 410 silences it', () => {
      expect(buildLifecycleWarning(headersOf('closed'), 'getContractTemplates')).toBe(CLOSED_MESSAGE)
    })

    it('names the operation and has no trailing period', () => {
      const message = buildLifecycleWarning(headersOf('closed'), 'someOtherOperation', 200)!
      expect(message).toContain("'someOtherOperation'")
      expect(message.endsWith('migration support')).toBe(true)
    })

    it('does not use the generic lifecycle-state wording', () => {
      expect(buildLifecycleWarning(headersOf('closed'), 'op', 200)).not.toContain('lifecycle state')
    })

    it('is case-insensitive on the state value', () => {
      expect(buildLifecycleWarning(headersOf('CLOSED'), 'getContractTemplates', 200)).toBe(CLOSED_MESSAGE)
    })

    it('still honours 410 when the state value is uppercase', () => {
      expect(buildLifecycleWarning(headersOf('CLOSED'), 'getContractTemplates', 410)).toBeUndefined()
    })
  })

  describe('410 only silences closed', () => {
    it('still warns for deprecated on 410', () => {
      expect(buildLifecycleWarning(headersOf('deprecated', SUNSET), 'op', 410)).toBe(
        `Operation 'op' is deprecated and will stop working after ${SUNSET}.`,
      )
    })

    it('stays silent for ga and unknown states regardless of status', () => {
      expect(buildLifecycleWarning(headersOf('ga'), 'op', 404)).toBeUndefined()
      expect(buildLifecycleWarning(headersOf('quantum_preview'), 'op', 404)).toBeUndefined()
    })
  })

  describe('silence', () => {
    it.each(['ga', 'internal', 'unlisted', 'quantum_preview', '', '   ', 'private beta', 'private-beta'])(
      'stays silent for state %j',
      (state) => {
        expect(buildLifecycleWarning(headersOf(state), 'op')).toBeUndefined()
      },
    )

    it('stays silent when the header is absent', () => {
      expect(buildLifecycleWarning(new Headers(), 'op')).toBeUndefined()
    })
  })

  describe('case handling', () => {
    it('warns on an uppercase state value', () => {
      const message = buildLifecycleWarning(headersOf('DEPRECATED', SUNSET), 'op')
      expect(message).toBe(`Operation 'op' is deprecated and will stop working after ${SUNSET}.`)
    })

    it.each(['Fireblocks-Lifecycle-State', 'fireblocks-lifecycle-state', 'FIREBLOCKS-LIFECYCLE-STATE'])(
      'looks the header name up case-insensitively: %s',
      (name) => {
        const headers = new Headers({[name]: 'beta'})
        expect(buildLifecycleWarning(headers, 'op')).toBeDefined()
      },
    )
  })

  describe('deprecated message shapes', () => {
    it('uses the sunset alone when there are no links', () => {
      expect(buildLifecycleWarning(headersOf('deprecated', SUNSET), 'op')).toBe(
        `Operation 'op' is deprecated and will stop working after ${SUNSET}.`,
      )
    })

    it('appends the successor clause', () => {
      const link = `<${SUCCESSOR}>; rel="successor-version"`
      expect(buildLifecycleWarning(headersOf('deprecated', SUNSET, link), 'op')).toBe(
        `Operation 'op' is deprecated and will stop working after ${SUNSET}. Use ${SUCCESSOR} instead.`,
      )
    })

    it('appends the migration guide clause', () => {
      const link = `<${MIGRATION_GUIDE}>; rel="deprecation"`
      expect(buildLifecycleWarning(headersOf('deprecated', SUNSET, link), 'op')).toBe(
        `Operation 'op' is deprecated and will stop working after ${SUNSET}. Migration guide: ${MIGRATION_GUIDE}`,
      )
    })

    it('orders successor before migration guide when both are present', () => {
      const link = `<${MIGRATION_GUIDE}>; rel="deprecation", <${SUCCESSOR}>; rel="successor-version"`
      expect(buildLifecycleWarning(headersOf('deprecated', SUNSET, link), 'op')).toBe(
        `Operation 'op' is deprecated and will stop working after ${SUNSET}. ` +
          `Use ${SUCCESSOR} instead. Migration guide: ${MIGRATION_GUIDE}`,
      )
    })

    it('degrades gracefully without a sunset header', () => {
      expect(buildLifecycleWarning(headersOf('deprecated'), 'op')).toBe("Operation 'op' is deprecated.")
    })
  })

  describe('Link parsing', () => {
    it('does not split a URI containing a comma', () => {
      const url = 'https://developer.fireblocks.com/docs/a,b'
      const link = `<${url}>; rel="deprecation"`
      expect(buildLifecycleWarning(headersOf('deprecated', SUNSET, link), 'op')).toContain(
        `Migration guide: ${url}`,
      )
    })

    it('accepts an unquoted rel', () => {
      const link = `<${SUCCESSOR}>; rel=successor-version`
      expect(buildLifecycleWarning(headersOf('deprecated', SUNSET, link), 'op')).toContain(
        `Use ${SUCCESSOR} instead.`,
      )
    })

    it('reads repeated Link headers, which Headers joins with a comma', () => {
      const headers = headersOf('deprecated', SUNSET)
      headers.append(LINK_HEADER, `<${MIGRATION_GUIDE}>; rel="deprecation"`)
      headers.append(LINK_HEADER, `<${SUCCESSOR}>; rel="successor-version"`)
      const message = buildLifecycleWarning(headers, 'op')
      expect(message).toContain(`Use ${SUCCESSOR} instead.`)
      expect(message).toContain(`Migration guide: ${MIGRATION_GUIDE}`)
    })

    it('parses rel after other parameters', () => {
      const link = `<${MIGRATION_GUIDE}>; type="text/html"; rel="deprecation"`
      expect(buildLifecycleWarning(headersOf('deprecated', SUNSET, link), 'op')).toContain(
        `Migration guide: ${MIGRATION_GUIDE}`,
      )
    })

    it('ignores a parameter after rel', () => {
      const link = `<${MIGRATION_GUIDE}>; rel="deprecation"; title="Migrate to v2"`
      expect(buildLifecycleWarning(headersOf('deprecated', SUNSET, link), 'op')).toContain(
        `Migration guide: ${MIGRATION_GUIDE}`,
      )
    })

    it('serves each relation when rel lists several', () => {
      const link = `<${MIGRATION_GUIDE}>; rel="deprecation successor-version"`
      expect(buildLifecycleWarning(headersOf('deprecated', SUNSET, link), 'op')).toBe(
        `Operation 'op' is deprecated and will stop working after ${SUNSET}.` +
          ` Use ${MIGRATION_GUIDE} instead.` +
          ` Migration guide: ${MIGRATION_GUIDE}`,
      )
    })

    it('finds the relation among several in a multi-valued rel', () => {
      const link = `<${SUCCESSOR}>; rel="successor-version alternate"`
      expect(buildLifecycleWarning(headersOf('deprecated', SUNSET, link), 'op')).toContain(
        `Use ${SUCCESSOR} instead.`,
      )
    })

    it('handles two links that each have leading parameters', () => {
      const link =
        `<${MIGRATION_GUIDE}>; type="text/html"; rel="deprecation", ` +
        `<${SUCCESSOR}>; title="v2"; rel="successor-version"`
      expect(buildLifecycleWarning(headersOf('deprecated', SUNSET, link), 'op')).toBe(
        `Operation 'op' is deprecated and will stop working after ${SUNSET}.` +
          ` Use ${SUCCESSOR} instead.` +
          ` Migration guide: ${MIGRATION_GUIDE}`,
      )
    })

    it('does not credit a rel to the previous link-value', () => {
      // Only the second link carries a rel; the first must not pick it up.
      const link = `<${MIGRATION_GUIDE}>; type="text/html", <${SUCCESSOR}>; rel="successor-version"`
      expect(buildLifecycleWarning(headersOf('deprecated', SUNSET, link), 'op')).toBe(
        `Operation 'op' is deprecated and will stop working after ${SUNSET}.` +
          ` Use ${SUCCESSOR} instead.`,
      )
    })

    it.each(['REL="deprecation"', 'Rel="deprecation"', 'rel="Deprecation"', 'rel=DEPRECATION'])(
      'matches the rel name and value case-insensitively: %s',
      (rel) => {
        const link = `<${MIGRATION_GUIDE}>; ${rel}`
        expect(buildLifecycleWarning(headersOf('deprecated', SUNSET, link), 'op')).toContain(
          `Migration guide: ${MIGRATION_GUIDE}`,
        )
      },
    )

    it('keeps the first occurrence when a relation appears twice', () => {
      const first = 'https://developer.fireblocks.com/docs/first'
      const link = `<${first}>; rel="deprecation", <https://developer.fireblocks.com/docs/second>; rel="deprecation"`
      expect(buildLifecycleWarning(headersOf('deprecated', SUNSET, link), 'op')).toContain(
        `Migration guide: ${first}`,
      )
    })

    it('ignores unknown relations', () => {
      const link = `<${SUCCESSOR}>; rel="something-else"`
      expect(buildLifecycleWarning(headersOf('deprecated', SUNSET, link), 'op')).toBe(
        `Operation 'op' is deprecated and will stop working after ${SUNSET}.`,
      )
    })

    it('does not throw on a malformed Link header', () => {
      expect(buildLifecycleWarning(headersOf('deprecated', SUNSET, 'not a link header'), 'op')).toBe(
        `Operation 'op' is deprecated and will stop working after ${SUNSET}.`,
      )
    })
  })
})

describe('isSuppressed', () => {
  it('uses the documented variable name', () => {
    expect(SUPPRESS_ENV_VAR).toBe('FIREBLOCKS_SDK_SUPPRESS_LIFECYCLE_WARNING')
  })

  it.each(['1', 'true', 'yes'])('suppresses for %j', (value) => {
    expect(isSuppressed(value)).toBe(true)
  })

  it.each([undefined, '', '0', 'false'])('does not suppress for %j', (value) => {
    expect(isSuppressed(value)).toBe(false)
  })
})
