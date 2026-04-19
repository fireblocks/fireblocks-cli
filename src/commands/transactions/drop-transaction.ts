import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class DropTransaction extends FireblocksBaseCommand {
  static summary = 'Drop ETH (EVM) transaction by ID'

  static description = 'Drops a stuck ETH (EVM) transaction and creates a replacement transaction with 0 amount.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: dropTransaction\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Transactions/dropTransaction'

  static enableJsonFlag = false

  static flags = {
    'tx-id': Flags.string({
      description: 'The ID of the transaction',
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
  static path = '/v1/transactions/{txId}/drop'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(DropTransaction)

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
    pathParams['txId'] = String(flags['tx-id'])


    await this.confirmOrAbort('POST', '/v1/transactions/{txId}/drop')

    const result = await this.makeRequest(
      'POST',
      '/v1/transactions/{txId}/drop',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
