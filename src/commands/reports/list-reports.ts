import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class ListReports extends FireblocksBaseCommand {
  static summary = 'List reports'

  static description = 'Returns a paginated list of report jobs scoped to the calling tenant.\n\n**Note:** Download URLs are not included in list responses. Call \`GET /v1/reports/{reportId}\` to\nobtain a fresh signed download URL for a specific completed report.\n\n**Note:** These endpoints are currently in beta and might be subject to changes.\n\nEndpoint Permission: Viewer and above.\n\nOperation ID: listReports\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Reports/listReports'

  static enableJsonFlag = false

  static flags = {
    'page-cursor': Flags.string({
      description: 'Opaque cursor returned from a previous list call',
    }),
    'page-size': Flags.integer({
      description: 'Maximum number of items per page',
      default: 20,
    }),
    'sort-by': Flags.string({
      description: 'Field to sort by',
      default: 'createdAt',
      options: ['createdAt', 'completedAt'],
    }),
    'order': Flags.string({
      description: 'Sort direction',
      default: 'DESC',
      options: ['ASC', 'DESC'],
    }),
    'status': Flags.string({
      description: 'Filter by lifecycle status. Repeat the parameter to filter on multiple statuses (e.g., ?status=QUEUED&status=PROCESSING).',
    }),
    'report-type': Flags.string({
      description: 'Filter by report type. Repeat the parameter to filter on multiple types.',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/reports'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(ListReports)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}


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
    if (flags['status'] !== undefined && flags['status'] !== null) {
      queryParams['status'] = String(flags['status'])
    }
    if (flags['report-type'] !== undefined && flags['report-type'] !== null) {
      queryParams['reportType'] = String(flags['report-type'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/reports',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
