import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetVASPs extends FireblocksBaseCommand {
  static summary = 'Get All VASPs'

  static description = 'Get All VASPs.\n\nReturns a list of VASPs. VASPs can be searched and sorted.\n\nOperation ID: getVASPs\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Travel%20Rule/getVASPs'

  static enableJsonFlag = false

  static flags = {
    'order': Flags.string({
      description: 'Field to order by',
      options: ['ASC', 'DESC'],
    }),
    'page-size': Flags.string({
      description: 'Records per page',
      default: '500',
    }),
    'fields': Flags.string({
      description: 'CSV of fields to return (all, "blank" or see list of all field names below)',
    }),
    'search': Flags.string({
      description: 'Search query',
    }),
    'review-value': Flags.string({
      description: 'Filter by the VASP\'s review status. Possible values include: "TRUSTED", "BLOCKED", "MANUAL", or "NULL". When provided, only VASPs that match the specified reviewValue will be returned (i.e., VASPs that have already been reviewed to this status).',
      options: ['TRUSTED', 'BLOCKED', 'MANUAL', 'null'],
    }),
    'page-cursor': Flags.string({
      description: 'Cursor for pagination. When provided, the response will include the next page of results.',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/screening/travel_rule/vasp'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetVASPs)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['order'] !== undefined && flags['order'] !== null) {
      queryParams['order'] = String(flags['order'])
    }
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }
    if (flags['fields'] !== undefined && flags['fields'] !== null) {
      queryParams['fields'] = String(flags['fields'])
    }
    if (flags['search'] !== undefined && flags['search'] !== null) {
      queryParams['search'] = String(flags['search'])
    }
    if (flags['review-value'] !== undefined && flags['review-value'] !== null) {
      queryParams['reviewValue'] = String(flags['review-value'])
    }
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/screening/travel_rule/vasp',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
