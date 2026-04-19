import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetActiveRolesForContract extends FireblocksBaseCommand {
  static summary = 'List of active roles for a given contract address and base asset ID'

  static description = 'Returns a list of currently active roles for the specified baseAssetId and contractAddress.\n\nOperation ID: getActiveRolesForContract\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Onchain%20Data/getActiveRolesForContract'

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
  static path = '/v1/onchain_data/base_asset_id/{baseAssetId}/contract_address/{contractAddress}/roles'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetActiveRolesForContract)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['baseAssetId'] = String(flags['base-asset-id'])
    pathParams['contractAddress'] = String(flags['contract-address'])


    const result = await this.makeRequest(
      'GET',
      '/v1/onchain_data/base_asset_id/{baseAssetId}/contract_address/{contractAddress}/roles',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
