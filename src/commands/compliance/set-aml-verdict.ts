import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class SetAmlVerdict extends FireblocksBaseCommand {
  static summary = 'Set AML Verdict (BYORK Super Light)'

  static description = 'Set AML verdict for incoming transactions when **BYORK Super Light** (Manual Screening Verdict) is enabled. This endpoint is for Super Light only. For **BYORK Light**, use POST /screening/byork/verdict instead. When Super Light is retired, this endpoint will be deprecated; use the BYORK Light verdict API for new integrations.\n\nOperation ID: setAmlVerdict\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/setAmlVerdict'

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
  static path = '/v1/screening/aml/verdict/manual'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(SetAmlVerdict)

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



    await this.confirmOrAbort('POST', '/v1/screening/aml/verdict/manual')

    const result = await this.makeRequest(
      'POST',
      '/v1/screening/aml/verdict/manual',
      {
        body,
        headers,
      },
    )

    return result
  }
}
