import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetAuditLogs extends FireblocksBaseCommand {
  static summary = 'Get audit logs'

  static description = 'Get Audit logs for the last Day/Week.\n\n- Please note that this endpoint is available only for API keys with Admin/Non Signing Admin permissions.\nEndpoint Permission: Admin, Non-Signing Admin.\n\nOperation ID: getAuditLogs\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Audit%20Logs/getAuditLogs'

  static enableJsonFlag = false

  static flags = {
    'time-period': Flags.string({
      description: 'The last time period to fetch audit logs',
      options: ['DAY', 'WEEK'],
    }),
    'cursor': Flags.string({
      description: 'The next id to start fetch audit logs from',
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
    if (flags['time-period'] !== undefined && flags['time-period'] !== null) {
      queryParams['timePeriod'] = String(flags['time-period'])
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
