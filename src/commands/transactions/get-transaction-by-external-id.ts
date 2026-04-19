import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetTransactionByExternalId extends FireblocksBaseCommand {
  static summary = 'Get a specific transaction by external transaction ID'

  static description = 'Returns transaction by external transaction ID.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nOperation ID: getTransactionByExternalId\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Transactions/getTransactionByExternalId'

  static enableJsonFlag = false

  static flags = {
    'external-tx-id': Flags.string({
      description: 'The external ID of the transaction to return',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/transactions/external_tx_id/{externalTxId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetTransactionByExternalId)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['externalTxId'] = String(flags['external-tx-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/transactions/external_tx_id/{externalTxId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
