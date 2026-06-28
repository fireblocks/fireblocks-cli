import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetPositionRelatedTransactions extends FireblocksBaseCommand {
  static summary = 'List related transactions for a position'

  static description = 'Returns enriched transaction history for a staking position with cursor-based pagination. Includes in-flight transactions with status pending. The in-flight transaction is always returned first; completed and failed history is ordered by the order parameter.\n\nOperation ID: getPositionRelatedTransactions\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Staking/getPositionRelatedTransactions'

  static enableJsonFlag = false

  static flags = {
    'id': Flags.string({
      description: 'Unique identifier of the staking position.',
      required: true,
    }),
    'page-size': Flags.integer({
      description: 'Number of results per page (minimum: 1, maximum: 100).',
      required: true,
    }),
    'page-cursor': Flags.string({
      description: 'Cursor for the next page of results. Use the value from the \'next\' field in the previous response.',
    }),
    'order': Flags.string({
      description: 'ASC / DESC ordering for completed/failed history (default DESC). The in-flight transaction is always returned first.',
      default: 'DESC',
      options: ['ASC', 'DESC'],
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/staking/positions/{id}/related_transactions'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetPositionRelatedTransactions)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['id'] = String(flags['id'])

    const queryParams: Record<string, string> = {}
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }
    if (flags['order'] !== undefined && flags['order'] !== null) {
      queryParams['order'] = String(flags['order'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/staking/positions/{id}/related_transactions',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
