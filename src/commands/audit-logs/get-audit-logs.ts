import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetAuditLogs extends FireblocksBaseCommand {
  static summary = 'Get audit logs'

  static description = 'Retrieve audit log events for the workspace with optional filtering, date range, sorting, and cursor-based pagination.\n\nFilters within the same field are combined as OR (e.g. category=Administration&category=Security returns events in either category). Filters across different fields are combined as AND.\n\n**Deprecated parameters:** \`timePeriod\` and \`cursor\` remain functional for backward compatibility but new integrations should use \`startTime\`/\`endTime\` and \`pageCursor\` instead.\n\nEndpoint Permission: Admin, Non-Signing Admin, Auditor, Security Admin, Security Auditor.\n\nOperation ID: getAuditLogs\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Audit%20Logs/getAuditLogs'

  static enableJsonFlag = false

  static flags = {
    'start-time': Flags.integer({
      description: 'Start of date range as epoch time in milliseconds. Takes precedence over timePeriod when provided. Must be no more than 1 year before the current time.',
    }),
    'end-time': Flags.integer({
      description: 'End of date range as epoch time in milliseconds. Must be after startTime. Defaults to now when omitted.',
    }),
    'time-period': Flags.string({
      description: 'Deprecated. Use startTime/endTime instead. Ignored when startTime is provided. Defaults to DAY when neither timePeriod nor startTime is supplied.',
      options: ['DAY', 'WEEK'],
    }),
    'category': Flags.string({
      description: 'Filter by event category. Repeat the parameter for multiple values (OR logic within field).',
    }),
    'subject': Flags.string({
      description: 'Filter by event subject. Repeat the parameter for multiple values.',
    }),
    'event': Flags.string({
      description: 'Filter by event type. Repeat the parameter for multiple values.',
    }),
    'user': Flags.string({
      description: 'Filter by user name. Repeat the parameter for multiple values.',
    }),
    'user-id': Flags.string({
      description: 'Filter by user ID. Repeat the parameter for multiple values.',
    }),
    'order': Flags.string({
      description: 'Sort direction. Defaults to DESC.',
      default: 'DESC',
      options: ['ASC', 'DESC'],
    }),
    'page-size': Flags.integer({
      description: 'Number of results per page. Maximum 500. Defaults to 200.',
      default: 200,
    }),
    'page-cursor': Flags.string({
      description: 'Cursor returned from the previous response to fetch the next page.',
    }),
    'cursor': Flags.string({
      description: 'Deprecated. Use pageCursor instead.',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/management/audit_logs'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetAuditLogs)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['start-time'] !== undefined && flags['start-time'] !== null) {
      queryParams['startTime'] = String(flags['start-time'])
    }
    if (flags['end-time'] !== undefined && flags['end-time'] !== null) {
      queryParams['endTime'] = String(flags['end-time'])
    }
    if (flags['time-period'] !== undefined && flags['time-period'] !== null) {
      queryParams['timePeriod'] = String(flags['time-period'])
    }
    if (flags['category'] !== undefined && flags['category'] !== null) {
      queryParams['category'] = String(flags['category'])
    }
    if (flags['subject'] !== undefined && flags['subject'] !== null) {
      queryParams['subject'] = String(flags['subject'])
    }
    if (flags['event'] !== undefined && flags['event'] !== null) {
      queryParams['event'] = String(flags['event'])
    }
    if (flags['user'] !== undefined && flags['user'] !== null) {
      queryParams['user'] = String(flags['user'])
    }
    if (flags['user-id'] !== undefined && flags['user-id'] !== null) {
      queryParams['userId'] = String(flags['user-id'])
    }
    if (flags['order'] !== undefined && flags['order'] !== null) {
      queryParams['order'] = String(flags['order'])
    }
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }
    if (flags['cursor'] !== undefined && flags['cursor'] !== null) {
      queryParams['cursor'] = String(flags['cursor'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/management/audit_logs',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
