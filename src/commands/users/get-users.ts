import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetUsers extends FireblocksBaseCommand {
  static summary = 'List users'

  static description = 'List all users for the workspace.\n\nPlease note that this endpoint is available only for API keys with Admin permissions.\n\nOperation ID: getUsers\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Users/getUsers'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/users'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetUsers)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/users',
      {
        headers,
      },
    )

    return result
  }
}
