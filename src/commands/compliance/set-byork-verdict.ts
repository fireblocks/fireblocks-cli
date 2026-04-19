import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class SetByorkVerdict extends FireblocksBaseCommand {
  static summary = 'Set BYORK Light verdict'

  static description = 'Submit verdict (ACCEPT or REJECT) for a transaction in the BYORK Light flow. If the transaction is awaiting your decision, the verdict is applied immediately (response status COMPLETED). If processing has not yet reached that point, the verdict is stored and applied when it does (response status PRE_ACCEPTED). Requires BYORK Light to be enabled for the tenant.\n\nOperation ID: setByorkVerdict\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/setByorkVerdict'

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

  static method = 'POST'
  static path = '/v1/screening/byork/verdict'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(SetByorkVerdict)

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



    await this.confirmOrAbort('POST', '/v1/screening/byork/verdict')

    const result = await this.makeRequest(
      'POST',
      '/v1/screening/byork/verdict',
      {
        body,
        headers,
      },
    )

    return result
  }
}
