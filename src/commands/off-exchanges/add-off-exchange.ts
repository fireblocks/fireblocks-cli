import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class AddOffExchange extends FireblocksBaseCommand {
  static summary = 'Add Collateral'

  static description = 'Add collateral and create deposit request.\nLearn more about Fireblocks Off Exchange in the following [guide](https://developers.fireblocks.com/docs/off-exchange).\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: addOffExchange\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Off%20exchanges/addOffExchange'

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
  static path = '/v1/off_exchange/add'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(AddOffExchange)

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



    await this.confirmOrAbort('POST', '/v1/off_exchange/add')

    const result = await this.makeRequest(
      'POST',
      '/v1/off_exchange/add',
      {
        body,
        headers,
      },
    )

    return result
  }
}
