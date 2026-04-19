import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class UnfreezeTransaction extends FireblocksBaseCommand {
  static summary = 'Unfreeze a transaction'

  static description = 'Unfreezes a transaction by Fireblocks Transaction ID and makes the transaction available again.\nEndpoint Permission: Admin, Non-Signing Admin.\n\nOperation ID: unfreezeTransaction\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Transactions/unfreezeTransaction'

  static enableJsonFlag = false

  static flags = {
    'tx-id': Flags.string({
      description: 'The ID of the transaction to unfreeze',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/transactions/{txId}/unfreeze'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(UnfreezeTransaction)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['txId'] = String(flags['tx-id'])


    await this.confirmOrAbort('POST', '/v1/transactions/{txId}/unfreeze')

    const result = await this.makeRequest(
      'POST',
      '/v1/transactions/{txId}/unfreeze',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
