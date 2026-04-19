import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetLatestBalancesForContract extends FireblocksBaseCommand {
  static summary = 'Get latest balances for all addresses holding tokens from a contract'

  static description = 'Returns the latest balance for each unique address with support for numeric balance sorting. The \`prev\` cursor is reserved for future support.\n\nOperation ID: getLatestBalancesForContract\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Onchain%20Data/getLatestBalancesForContract'

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
    'account-address': Flags.string({
      description: 'Optional filter to get balance for a specific account address',
    }),
    'page-cursor': Flags.string({
      description: 'Page cursor to get the next page"',
    }),
    'page-size': Flags.integer({
      description: 'Number of items per page (max 100), requesting more then 100 will return 100 items',
    }),
    'sort-by': Flags.string({
      description: 'Sorting field for balances',
      default: 'blockTimestamp',
      options: ['accountAddress', 'blockTimestamp'],
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
  static path = '/v1/onchain_data/base_asset_id/{baseAssetId}/contract_address/{contractAddress}/balances'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetLatestBalancesForContract)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['baseAssetId'] = String(flags['base-asset-id'])
    pathParams['contractAddress'] = String(flags['contract-address'])

    const queryParams: Record<string, string> = {}
    if (flags['account-address'] !== undefined && flags['account-address'] !== null) {
      queryParams['accountAddress'] = String(flags['account-address'])
    }
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
      '/v1/onchain_data/base_asset_id/{baseAssetId}/contract_address/{contractAddress}/balances',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
