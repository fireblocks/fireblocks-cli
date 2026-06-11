import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetTokenRbac extends FireblocksBaseCommand {
  static summary = 'Get active RBAC roles for a token'

  static description = 'Returns a list of currently active roles for the token contract.\n\nOperation ID: getTokenRbac\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tokenization/getTokenRbac'

  static enableJsonFlag = false

  static flags = {
    'id': Flags.string({
      description: 'The token link id',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/tokenization/tokens/{id}/rbac'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetTokenRbac)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['id'] = String(flags['id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/tokenization/tokens/{id}/rbac',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
