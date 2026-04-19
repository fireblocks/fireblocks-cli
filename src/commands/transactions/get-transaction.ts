import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetTransaction extends FireblocksBaseCommand {
  static summary = 'Get a specific transaction by Fireblocks transaction ID'

  static description = 'Get a specific transaction data by Fireblocks Transaction ID\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nOperation ID: getTransaction\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Transactions/getTransaction'

  static enableJsonFlag = false

  static flags = {
    'tx-id': Flags.string({
      description: 'The ID of the transaction to return',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/transactions/{txId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetTransaction)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['txId'] = String(flags['tx-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/transactions/{txId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
