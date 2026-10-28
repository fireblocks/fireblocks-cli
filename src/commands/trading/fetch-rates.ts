import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class FetchRates extends FireblocksBaseCommand {
  static summary = 'Get rates'

  static description = 'Retrieve indicative exchange rate from specified providers for a given asset pair.\nRates are non-executable price signals intended for discovery and display purposes.\n\nIf \`side\` is omitted it defaults to \`SELL\`. Use \`side: BOTH\` to get rates for each side the provider supports in a single call; providers that support only one side return that side only. Every returned rate carries a concrete \`BUY\` or \`SELL\` side, never \`BOTH\`.\n\nEndpoint Permission: Owner, Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nFor detailed information about error codes and troubleshooting, please refer to our [API Error Codes documentation](https://developers.fireblocks.com/reference/api-error-codes).\n\nOperation ID: fetchRates\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Trading/fetchRates'

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
  static path = '/v1/trading/rates'
  static operationId = 'fetchRates'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(FetchRates)

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



    await this.confirmOrAbort('POST', '/v1/trading/rates')

    const result = await this.makeRequest(
      'POST',
      '/v1/trading/rates',
      {
        body,
        headers,
      },
    )

    return result
  }
}
