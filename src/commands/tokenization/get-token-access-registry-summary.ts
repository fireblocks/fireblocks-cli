import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetTokenAccessRegistrySummary extends FireblocksBaseCommand {
  static summary = 'Get summary of an access registry'

  static description = 'Returns a summary of the current state of the access registry.\n\nOperation ID: getTokenAccessRegistrySummary\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tokenization/getTokenAccessRegistrySummary'

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
  static path = '/v1/tokenization/access_registries/{id}/summary'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetTokenAccessRegistrySummary)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['id'] = String(flags['id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/tokenization/access_registries/{id}/summary',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
