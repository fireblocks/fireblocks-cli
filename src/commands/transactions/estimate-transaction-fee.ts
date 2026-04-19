import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class EstimateTransactionFee extends FireblocksBaseCommand {
  static summary = 'Estimate transaction fee'

  static description = 'Estimates the transaction fee for a specific transaction request.\nThis endpoint simulates a transaction which means that the system will expect to have the requested asset and balance in the specified wallet.\n\n**Note**: Supports all Fireblocks assets except ZCash (ZEC).\nLearn more about Fireblocks Fee Management in the following [guide](https://developers.fireblocks.com/reference/estimate-transaction-fee).\nEndpoint Permission: Admin, Signer, Approver, Editor.\n\nOperation ID: estimateTransactionFee\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Transactions/estimateTransactionFee'

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
  static path = '/v1/transactions/estimate_fee'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(EstimateTransactionFee)

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



    await this.confirmOrAbort('POST', '/v1/transactions/estimate_fee')

    const result = await this.makeRequest(
      'POST',
      '/v1/transactions/estimate_fee',
      {
        body,
        headers,
      },
    )

    return result
  }
}
