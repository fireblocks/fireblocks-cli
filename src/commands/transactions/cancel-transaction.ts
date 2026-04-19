import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CancelTransaction extends FireblocksBaseCommand {
  static summary = 'Cancel a transaction'

  static description = 'Cancels a transaction by Fireblocks Transaction ID.\n\nCan be used only for transactions that did not get to the BROADCASTING state.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: cancelTransaction\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Transactions/cancelTransaction'

  static enableJsonFlag = false

  static flags = {
    'tx-id': Flags.string({
      description: 'The ID of the transaction to cancel',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/transactions/{txId}/cancel'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CancelTransaction)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['txId'] = String(flags['tx-id'])


    await this.confirmOrAbort('POST', '/v1/transactions/{txId}/cancel')

    const result = await this.makeRequest(
      'POST',
      '/v1/transactions/{txId}/cancel',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
