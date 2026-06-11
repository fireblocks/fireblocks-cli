import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetTokenBalances extends FireblocksBaseCommand {
  static summary = 'Get latest balances for all holders of a token'

  static description = 'Returns the latest balance for each unique address holding this token.\n\nOperation ID: getTokenBalances\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tokenization/getTokenBalances'

  static enableJsonFlag = false

  static flags = {
    'id': Flags.string({
      description: 'The token link id',
      required: true,
    }),
    'page-cursor': Flags.string({
      description: 'Page cursor to get the next page',
    }),
    'page-size': Flags.integer({
      description: 'Number of items per page (max 100), requesting more than 100 will return 100 items',
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
  static path = '/v1/tokenization/tokens/{id}/balances'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetTokenBalances)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['id'] = String(flags['id'])

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
      '/v1/tokenization/tokens/{id}/balances',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
