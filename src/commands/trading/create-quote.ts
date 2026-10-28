import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateQuote extends FireblocksBaseCommand {
  static summary = 'Create a quote'

  static description = 'Generate a time-limited quote for asset conversion, providing exchange rate and amount calculations.\n\nIf \`side\` is omitted it defaults to \`SELL\`. Use \`side: BOTH\` to get quotes for each side the provider supports in a single call; providers that support only one side return that side only. Every returned quote carries a concrete \`BUY\` or \`SELL\` side, never \`BOTH\`.\n\nEndpoint Permission: Owner, Admin, Non-Signing Admin, Signer, Editor.\n\nFor detailed information about error codes and troubleshooting, please refer to our [API Error Codes documentation](https://developers.fireblocks.com/reference/api-error-codes).\n\nOperation ID: createQuote\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Trading/createQuote'

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
  static path = '/v1/trading/quotes'
  static operationId = 'createQuote'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateQuote)

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



    await this.confirmOrAbort('POST', '/v1/trading/quotes')

    const result = await this.makeRequest(
      'POST',
      '/v1/trading/quotes',
      {
        body,
        headers,
      },
    )

    return result
  }
}
