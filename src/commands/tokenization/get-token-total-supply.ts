import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetTokenTotalSupply extends FireblocksBaseCommand {
  static summary = 'Get historical total supply for a token'

  static description = 'Returns paginated total supply history for the token contract with optional time-range filtering and binning.\n\nOperation ID: getTokenTotalSupply\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tokenization/getTokenTotalSupply'

  static enableJsonFlag = false

  static flags = {
    'id': Flags.string({
      description: 'The token link id',
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
      default: 'DAY',
      options: ['HOUR', 'DAY', 'WEEK', 'MONTH'],
    }),
    'page-cursor': Flags.string({
      description: 'Page cursor to get the next page',
    }),
    'page-size': Flags.integer({
      description: 'Number of items per page (max 100), requesting more than 100 will return 100 items',
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
  static path = '/v1/tokenization/tokens/{id}/total_supply'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetTokenTotalSupply)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['id'] = String(flags['id'])

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
      '/v1/tokenization/tokens/{id}/total_supply',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
