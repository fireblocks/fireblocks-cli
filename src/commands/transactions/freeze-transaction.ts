import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class FreezeTransaction extends FireblocksBaseCommand {
  static summary = 'Freeze a transaction'

  static description = 'Freezes a transaction by ID.\n\nUsually used for AML integrations when the incoming funds should be quarantined.\nFor account based assets - the entire amount of the transaction is frozen \nFor UTXO based assets - all UTXOs of the specified transaction are frozen\nEndpoint Permission: Admin, Non-Signing Admin.\n\nOperation ID: freezeTransaction\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Transactions/freezeTransaction'

  static enableJsonFlag = false

  static flags = {
    'tx-id': Flags.string({
      description: 'The ID of the transaction to freeze',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/transactions/{txId}/freeze'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(FreezeTransaction)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['txId'] = String(flags['tx-id'])


    await this.confirmOrAbort('POST', '/v1/transactions/{txId}/freeze')

    const result = await this.makeRequest(
      'POST',
      '/v1/transactions/{txId}/freeze',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
