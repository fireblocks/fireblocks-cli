import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class SetByorkTimeouts extends FireblocksBaseCommand {
  static summary = 'Set BYORK Light timeouts'

  static description = 'Updates timeout values for BYORK wait-for-response (incoming and/or outgoing). At least one of incomingTimeoutSeconds or outgoingTimeoutSeconds is required. Values must be within the ranges returned in GET config (timeoutRangeIncoming for incomingTimeoutSeconds, timeoutRangeOutgoing for outgoingTimeoutSeconds). Requires BYORK Light to be enabled for the tenant (contact your CSM to enable).\n\nOperation ID: setByorkTimeouts\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/setByorkTimeouts'

  static enableJsonFlag = false

  static flags = {
    data: Flags.string({
      description: 'JSON request body',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'PUT'
  static path = '/v1/screening/byork/config/timeouts'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(SetByorkTimeouts)

    let body: Record<string, unknown> | undefined
    if (flags.data) {
      try {
        const parsed = JSON.parse(flags.data)
        if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
          this.error('--data must be a JSON object (e.g., \'{"key": "value"}\')')
        }
        body = parsed as Record<string, unknown>
      } catch {
        this.error('Invalid JSON in --data flag. Ensure the value is valid JSON.')
      }
    }

    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }



    await this.confirmOrAbort('PUT', '/v1/screening/byork/config/timeouts')

    const result = await this.makeRequest(
      'PUT',
      '/v1/screening/byork/config/timeouts',
      {
        body,
        headers,
      },
    )

    return result
  }
}
