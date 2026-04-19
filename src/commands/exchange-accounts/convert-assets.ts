import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class ConvertAssets extends FireblocksBaseCommand {
  static summary = 'Convert exchange account funds'

  static description = 'Convert exchange account funds from the source asset to the destination asset. Coinbase (USD to USDC, USDC to USD) and Bitso (MXN to USD) are supported conversions.\nLearn more about Fireblocks Exchange Connectivity in the following [guide](https://developers.fireblocks.com/docs/connect-to-exchanges-and-fiat-providers).\nEndpoint Permission: Admin, Non-Signing Admin.\n\nOperation ID: convertAssets\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Exchange%20accounts/convertAssets'

  static enableJsonFlag = false

  static flags = {
    'exchange-account-id': Flags.string({
      description: 'The ID of the exchange account. Please make sure the exchange supports conversions. To find the ID of your exchange account, use GET/exchange_accounts.',
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
  static path = '/v1/exchange_accounts/{exchangeAccountId}/convert'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(ConvertAssets)

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


    await this.confirmOrAbort('POST', '/v1/exchange_accounts/{exchangeAccountId}/convert')

    const result = await this.makeRequest(
      'POST',
      '/v1/exchange_accounts/{exchangeAccountId}/convert',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
