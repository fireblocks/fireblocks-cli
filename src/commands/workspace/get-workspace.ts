import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetWorkspace extends FireblocksBaseCommand {
  static summary = 'Get workspace'

  static description = 'Returns the workspace ID and name for the authenticated user.\n\nOperation ID: getWorkspace\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Workspace/getWorkspace'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/workspace'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetWorkspace)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/workspace',
      {
        headers,
      },
    )

    return result
  }
}
