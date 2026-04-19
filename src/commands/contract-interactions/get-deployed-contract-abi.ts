import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetDeployedContractAbi extends FireblocksBaseCommand {
  static summary = 'Return deployed contract\'s ABI'

  static description = 'Return deployed contract\'s ABI by blockchain native asset id and contract address.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor, and Viewer.\n\nOperation ID: getDeployedContractAbi\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Contract%20Interactions/getDeployedContractAbi'

  static enableJsonFlag = false

  static flags = {
    'contract-address': Flags.string({
      description: 'The contract\'s onchain address',
      required: true,
    }),
    'base-asset-id': Flags.string({
      description: 'The blockchain base assetId',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/contract_interactions/base_asset_id/{baseAssetId}/contract_address/{contractAddress}/functions'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetDeployedContractAbi)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['contractAddress'] = String(flags['contract-address'])
    pathParams['baseAssetId'] = String(flags['base-asset-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/contract_interactions/base_asset_id/{baseAssetId}/contract_address/{contractAddress}/functions',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
