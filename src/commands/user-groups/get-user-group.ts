import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetUserGroup extends FireblocksBaseCommand {
  static summary = 'Get user group'

  static description = 'Get a user group by ID.\n\n**Note**:\n- This endpoint is now in Beta, disabled for general availability at this time.\n- Please note that this endpoint is available only for API keys with Admin permissions.\n\nOperation ID: getUserGroup\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/User%20groups/getUserGroup'

  static enableJsonFlag = false

  static flags = {
    'group-id': Flags.string({
      description: 'The ID of the user group',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/management/user_groups/{groupId}'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetUserGroup)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['groupId'] = String(flags['group-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/management/user_groups/{groupId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
