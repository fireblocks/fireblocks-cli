import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetTransactionReceipt extends FireblocksBaseCommand {
  static summary = 'Get transaction receipt'

  static description = 'Retrieve the transaction receipt by blockchain native asset ID and transaction hash\n> **Note** > This functionality is exclusively available for EVM (Ethereum Virtual Machine) compatible chains. \nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor, and Viewer.\n\nOperation ID: getTransactionReceipt\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Contract%20Interactions/getTransactionReceipt'

  static enableJsonFlag = false

  static flags = {
    'base-asset-id': Flags.string({
      description: 'The blockchain base assetId',
      required: true,
    }),
    'tx-hash': Flags.string({
      description: 'The transaction hash',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/contract_interactions/base_asset_id/{baseAssetId}/tx_hash/{txHash}/receipt'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetTransactionReceipt)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['baseAssetId'] = String(flags['base-asset-id'])
    pathParams['txHash'] = String(flags['tx-hash'])


    const result = await this.makeRequest(
      'GET',
      '/v1/contract_interactions/base_asset_id/{baseAssetId}/tx_hash/{txHash}/receipt',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
