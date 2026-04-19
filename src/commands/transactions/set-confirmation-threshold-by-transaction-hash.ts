import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class SetConfirmationThresholdByTransactionHash extends FireblocksBaseCommand {
  static summary = 'Set confirmation threshold by transaction hash'

  static description = 'Overrides the required number of confirmations for transaction completion by transaction hash.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: setConfirmationThresholdByTransactionHash\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Transactions/setConfirmationThresholdByTransactionHash'

  static enableJsonFlag = false

  static flags = {
    'tx-hash': Flags.string({
      description: 'The TxHash',
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
  static path = '/v1/txHash/{txHash}/set_confirmation_threshold'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(SetConfirmationThresholdByTransactionHash)

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
    pathParams['txHash'] = String(flags['tx-hash'])


    await this.confirmOrAbort('POST', '/v1/txHash/{txHash}/set_confirmation_threshold')

    const result = await this.makeRequest(
      'POST',
      '/v1/txHash/{txHash}/set_confirmation_threshold',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
