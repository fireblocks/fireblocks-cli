import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetOnchainTransactions extends FireblocksBaseCommand {
  static summary = 'Fetch onchain transactions for a contract'

  static description = 'Returns a paginated list of onchain transactions for the specified contract address and base asset ID, optionally filtered by date range.\n\nOperation ID: getOnchainTransactions\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Onchain%20Data/getOnchainTransactions'

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
    'start-date': Flags.string({
      description: 'Start date of the time range in ISO 8601 format',
    }),
    'end-date': Flags.string({
      description: 'End date of the time range in ISO 8601 format',
    }),
    'page-cursor': Flags.string({
      description: 'Page cursor to get the next page"',
    }),
    'page-size': Flags.integer({
      description: 'Number of items per page (max 100), requesting more then 100 will return 100 items',
    }),
    'sort-by': Flags.string({
      description: 'Sorting field (enum).',
      default: 'blockTimestamp',
      options: ['blockTimestamp', 'blockNumber', 'transactionHash'],
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
  static path = '/v1/onchain_data/base_asset_id/{baseAssetId}/contract_address/{contractAddress}/transactions'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetOnchainTransactions)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['baseAssetId'] = String(flags['base-asset-id'])
    pathParams['contractAddress'] = String(flags['contract-address'])

    const queryParams: Record<string, string> = {}
    if (flags['start-date'] !== undefined && flags['start-date'] !== null) {
      queryParams['startDate'] = String(flags['start-date'])
    }
    if (flags['end-date'] !== undefined && flags['end-date'] !== null) {
      queryParams['endDate'] = String(flags['end-date'])
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
      '/v1/onchain_data/base_asset_id/{baseAssetId}/contract_address/{contractAddress}/transactions',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
