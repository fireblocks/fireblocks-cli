import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetSecurityFindingById extends FireblocksBaseCommand {
  static summary = 'Get a FSPM security finding by ID'

  static description = 'Returns a single FSPM security finding for the workspace, redacted to the public field set.\nEndpoint Roles: Security Admin, Security Auditor.\n\nOperation ID: getSecurityFindingById\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Security%20Posture%20Management/getSecurityFindingById'

  static enableJsonFlag = false

  static flags = {
    'id': Flags.string({
      description: 'Unique identifier of the finding',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/security/fspm/findings/{id}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetSecurityFindingById)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['id'] = String(flags['id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/security/fspm/findings/{id}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
