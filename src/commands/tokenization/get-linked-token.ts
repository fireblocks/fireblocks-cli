import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetLinkedToken extends FireblocksBaseCommand {
  static summary = 'Return a linked token'

  static description = 'Return a linked token, with its status and metadata.\n\nOperation ID: getLinkedToken\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tokenization/getLinkedToken'

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
  static path = '/v1/tokenization/tokens/{id}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetLinkedToken)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['id'] = String(flags['id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/tokenization/tokens/{id}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
