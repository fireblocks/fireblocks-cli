import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetAccessRegistryCurrentState extends FireblocksBaseCommand {
  static summary = 'Get the current state of addresses in an access registry'

  static description = 'Returns the current state of addresses in the specified access registry. Only addresses that are currently active (added but not removed) are included.\n\nOperation ID: getAccessRegistryCurrentState\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Onchain%20Data/getAccessRegistryCurrentState'

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
    'page-cursor': Flags.string({
      description: 'Page cursor to get the next page"',
    }),
    'page-size': Flags.integer({
      description: 'Number of items per page (max 100), requesting more then 100 will return 100 items',
    }),
    'sort-by': Flags.string({
      description: 'Sorting field (enum).',
      default: 'dateAdded',
      options: ['dateAdded', 'address'],
    }),
    'order': Flags.string({
      description: 'ASC / DESC ordering (default DESC)',
      default: 'DESC',
      options: ['ASC', 'DESC'],
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/onchain_data/base_asset_id/{baseAssetId}/access_registry_address/{accessRegistryAddress}/list'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetAccessRegistryCurrentState)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['baseAssetId'] = String(flags['base-asset-id'])
    pathParams['accessRegistryAddress'] = String(flags['access-registry-address'])

    const queryParams: Record<string, string> = {}
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }
    if (flags['sort-by'] !== undefined && flags['sort-by'] !== null) {
      queryParams['sortBy'] = String(flags['sort-by'])
    }
    if (flags['order'] !== undefined && flags['order'] !== null) {
      queryParams['order'] = String(flags['order'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/onchain_data/base_asset_id/{baseAssetId}/access_registry_address/{accessRegistryAddress}/list',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
