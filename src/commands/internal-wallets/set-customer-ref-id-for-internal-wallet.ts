import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class SetCustomerRefIdForInternalWallet extends FireblocksBaseCommand {
  static summary = 'Set an AML/KYT customer reference ID for internal wallet'

  static description = 'Sets an AML/KYT customer reference ID for the specific internal wallet.\n\nOperation ID: setCustomerRefIdForInternalWallet\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Internal%20wallets/setCustomerRefIdForInternalWallet'

  static enableJsonFlag = false

  static flags = {
    'wallet-id': Flags.string({
      description: 'The wallet ID',
      required: true,
    }),
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
  static path = '/v1/internal_wallets/{walletId}/set_customer_ref_id'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(SetCustomerRefIdForInternalWallet)

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
    pathParams['walletId'] = String(flags['wallet-id'])


    await this.confirmOrAbort('POST', '/v1/internal_wallets/{walletId}/set_customer_ref_id')

    const result = await this.makeRequest(
      'POST',
      '/v1/internal_wallets/{walletId}/set_customer_ref_id',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
