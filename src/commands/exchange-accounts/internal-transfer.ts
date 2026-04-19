import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class InternalTransfer extends FireblocksBaseCommand {
  static summary = 'Internal transfer for exchange accounts'

  static description = 'Transfers funds between trading accounts under the same exchange account.\nLearn more about Fireblocks Exchange Connectivity in the following [guide](https://developers.fireblocks.com/docs/connect-to-exchanges-and-fiat-providers).\nEndpoint Permission: Admin, Non-Signing Admin.\n\nOperation ID: internalTransfer\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Exchange%20accounts/internalTransfer'

  static enableJsonFlag = false

  static flags = {
    'exchange-account-id': Flags.string({
      description: 'The ID of the exchange account to return',
      required: true,
    }),
    data: Flags.string({
      description: 'JSON request body',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/exchange_accounts/{exchangeAccountId}/internal_transfer'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(InternalTransfer)

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

    const pathParams: Record<string, string> = {}
    pathParams['exchangeAccountId'] = String(flags['exchange-account-id'])


    await this.confirmOrAbort('POST', '/v1/exchange_accounts/{exchangeAccountId}/internal_transfer')

    const result = await this.makeRequest(
      'POST',
      '/v1/exchange_accounts/{exchangeAccountId}/internal_transfer',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
