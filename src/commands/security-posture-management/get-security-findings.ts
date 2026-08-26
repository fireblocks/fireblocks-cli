import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetSecurityFindings extends FireblocksBaseCommand {
  static summary = 'Get FSPM security findings'

  static description = 'Returns a paginated list of FSPM security findings for the workspace.\nEndpoint Roles: Security Admin, Security Auditor.\n\nOperation ID: getSecurityFindings\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Security%20Posture%20Management/getSecurityFindings'

  static enableJsonFlag = false

  static flags = {
    'page-cursor': Flags.string({
      description: 'Cursor indicating the page position. Omit to fetch the first page.',
    }),
    'page-size': Flags.integer({
      description: 'Number of results per page',
      default: 10,
    }),
    'severity': Flags.string({
      description: 'Filter by severity level',
      options: ['INFO', 'LOW', 'MEDIUM', 'HIGH'],
    }),
    'category': Flags.string({
      description: 'Filter by finding category',
      options: ['USER_MANAGEMENT', 'APPROVAL_GROUP_MANAGEMENT', 'POLICY_ENGINE_UTILIZATION', 'WORKSPACE_CONFIGURATION', 'DEFI_ACCESS', 'FLEET_MANAGEMENT'],
    }),
    'status': Flags.string({
      description: 'Filter by finding status',
      options: ['OPEN', 'ACCEPTED', 'RESOLVED'],
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/security/fspm/findings'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetSecurityFindings)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }
    if (flags['severity'] !== undefined && flags['severity'] !== null) {
      queryParams['severity'] = String(flags['severity'])
    }
    if (flags['category'] !== undefined && flags['category'] !== null) {
      queryParams['category'] = String(flags['category'])
    }
    if (flags['status'] !== undefined && flags['status'] !== null) {
      queryParams['status'] = String(flags['status'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/security/fspm/findings',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
