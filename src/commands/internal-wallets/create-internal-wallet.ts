import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateInternalWallet extends FireblocksBaseCommand {
  static summary = 'Create an internal wallet'

  static description = 'Creates a new internal wallet with the requested name.\nLearn more about Whitelisted Internal Addresses [here](https://developers.fireblocks.com/docs/whitelist-addresses#internal-wallets)\n\nOperation ID: createInternalWallet\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Internal%20wallets/createInternalWallet'

  static enableJsonFlag = false

  static flags = {
    data: Flags.string({
      description: 'JSON request body',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/internal_wallets'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateInternalWallet)

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



    await this.confirmOrAbort('POST', '/v1/internal_wallets')

    const result = await this.makeRequest(
      'POST',
      '/v1/internal_wallets',
      {
        body,
        headers,
      },
    )

    return result
  }
}
