import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetLinkedTokensCount extends FireblocksBaseCommand {
  static summary = 'Get the total count of linked tokens'

  static description = 'Get the total count of linked tokens\n\nOperation ID: getLinkedTokensCount\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tokenization/getLinkedTokensCount'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/tokenization/tokens/count'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetLinkedTokensCount)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/tokenization/tokens/count',
      {
        headers,
      },
    )

    return result
  }
}
