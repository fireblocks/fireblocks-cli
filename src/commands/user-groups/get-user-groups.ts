import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetUserGroups extends FireblocksBaseCommand {
  static summary = 'List user groups'

  static description = 'Get all user groups in your workspace\n\n- Please note that this endpoint is available only for API keys with Admin/Non Signing Admin permissions.\nEndpoint Permission: Admin, Non-Signing Admin.\n\nOperation ID: getUserGroups\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/User%20groups/getUserGroups'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/management/user_groups'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetUserGroups)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/management/user_groups',
      {
        headers,
      },
    )

    return result
  }
}
