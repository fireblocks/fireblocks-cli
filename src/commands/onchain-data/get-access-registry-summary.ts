import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetAccessRegistrySummary extends FireblocksBaseCommand {
  static summary = 'Summary of access registry state'

  static description = 'Returns a summary of the current state of the access registry for the specified baseAssetId and accessRegistryAddress.\n\nOperation ID: getAccessRegistrySummary\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Onchain%20Data/getAccessRegistrySummary'

  static enableJsonFlag = false

  static flags = {
    'base-asset-id': Flags.string({
      description: 'The blockchain base assetId',
      required: true,
    }),
    'access-registry-address': Flags.string({
      description: 'The access registry address',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/onchain_data/base_asset_id/{baseAssetId}/access_registry_address/{accessRegistryAddress}/summary'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetAccessRegistrySummary)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['baseAssetId'] = String(flags['base-asset-id'])
    pathParams['accessRegistryAddress'] = String(flags['access-registry-address'])


    const result = await this.makeRequest(
      'GET',
      '/v1/onchain_data/base_asset_id/{baseAssetId}/access_registry_address/{accessRegistryAddress}/summary',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
