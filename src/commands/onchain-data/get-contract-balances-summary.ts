import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetContractBalancesSummary extends FireblocksBaseCommand {
  static summary = 'Get summary for the token contract'

  static description = 'Returns the total number of unique addresses holding balances and the total supply for the specified contract.\n\nOperation ID: getContractBalancesSummary\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Onchain%20Data/getContractBalancesSummary'

  static enableJsonFlag = false

  static flags = {
    'base-asset-id': Flags.string({
      description: 'The blockchain base assetId',
      required: true,
    }),
    'contract-address': Flags.string({
      description: 'The contract address',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/onchain_data/base_asset_id/{baseAssetId}/contract_address/{contractAddress}/summary'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetContractBalancesSummary)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['baseAssetId'] = String(flags['base-asset-id'])
    pathParams['contractAddress'] = String(flags['contract-address'])


    const result = await this.makeRequest(
      'GET',
      '/v1/onchain_data/base_asset_id/{baseAssetId}/contract_address/{contractAddress}/summary',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
