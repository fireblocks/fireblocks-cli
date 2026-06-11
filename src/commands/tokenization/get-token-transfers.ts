import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetTokenTransfers extends FireblocksBaseCommand {
  static summary = 'Get onchain transfers for a token'

  static description = 'Returns a paginated list of ERC20 transfer events for the token contract, optionally filtered by date range.\n\nOperation ID: getTokenTransfers\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tokenization/getTokenTransfers'

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
    'page-cursor': Flags.string({
      description: 'Page cursor to get the next page',
    }),
    'page-size': Flags.integer({
      description: 'Number of items per page (max 100), requesting more than 100 will return 100 items',
    }),
    'sort-by': Flags.string({
      description: 'Sorting field for transfers',
      default: 'blockTimeStamp',
      options: ['blockTimeStamp'],
    }),
    'order': Flags.string({
      description: 'ASC / DESC ordering (default DESC)',
      default: 'DESC',
      options: ['ASC', 'DESC'],
    }),
    'sender': Flags.string({
      description: 'Filter transfers by sender address',
    }),
    'receiver': Flags.string({
      description: 'Filter transfers by receiver address',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/tokenization/tokens/{id}/transfers'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetTokenTransfers)


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
    if (flags['sender'] !== undefined && flags['sender'] !== null) {
      queryParams['sender'] = String(flags['sender'])
    }
    if (flags['receiver'] !== undefined && flags['receiver'] !== null) {
      queryParams['receiver'] = String(flags['receiver'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/tokenization/tokens/{id}/transfers',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
