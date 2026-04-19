import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetApiUsers extends FireblocksBaseCommand {
  static summary = 'Get API Keys'

  static description = 'List all API keys in your workspace.\n- Please note that this endpoint is available only for API keys with Admin/Non Signing Admin permissions.\nEndpoint Permission: Admin, Non-Signing Admin.\n\nOperation ID: getApiUsers\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Api%20User/getApiUsers'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/management/api_users'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetApiUsers)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/management/api_users',
      {
        headers,
      },
    )

    return result
  }
}
