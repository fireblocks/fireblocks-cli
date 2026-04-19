import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetContractBalanceHistory extends FireblocksBaseCommand {
  static summary = 'Get historical balance data for a specific account in a contract'

  static description = 'Returns the paginated balance history of the specified account in a contract with optional date range and interval filtering.\n\nOperation ID: getContractBalanceHistory\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Onchain%20Data/getContractBalanceHistory'

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
      description: 'The account address to get balance history for',
      required: true,
    }),
    'start-date': Flags.string({
      description: 'Start date of the time range in ISO 8601 format',
    }),
    'end-date': Flags.string({
      description: 'End date of the time range in ISO 8601 format',
    }),
    'interval': Flags.string({
      description: 'Time interval for grouping data',
      default: 'day',
      options: ['hour', 'day', 'week', 'month'],
    }),
    'page-cursor': Flags.string({
      description: 'Page cursor to get the next page"',
    }),
    'page-size': Flags.integer({
      description: 'Number of items per page (max 100), requesting more then 100 will return 100 items',
    }),
    'sort-by': Flags.string({
      description: 'Sorting field (enum). Sorting only supported by \'blockTimestamp\'',
      default: 'blockTimestamp',
      options: ['blockTimestamp'],
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
  static path = '/v1/onchain_data/base_asset_id/{baseAssetId}/contract_address/{contractAddress}/account_address/{accountAddress}/balance_history'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetContractBalanceHistory)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['baseAssetId'] = String(flags['base-asset-id'])
    pathParams['contractAddress'] = String(flags['contract-address'])
    pathParams['accountAddress'] = String(flags['account-address'])

    const queryParams: Record<string, string> = {}
    if (flags['start-date'] !== undefined && flags['start-date'] !== null) {
      queryParams['startDate'] = String(flags['start-date'])
    }
    if (flags['end-date'] !== undefined && flags['end-date'] !== null) {
      queryParams['endDate'] = String(flags['end-date'])
    }
    if (flags['interval'] !== undefined && flags['interval'] !== null) {
      queryParams['interval'] = String(flags['interval'])
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
      '/v1/onchain_data/base_asset_id/{baseAssetId}/contract_address/{contractAddress}/account_address/{accountAddress}/balance_history',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
