import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetTokenContractSummary extends FireblocksBaseCommand {
  static summary = 'Get onchain summary for a token'

  static description = 'Returns the total number of unique holders and the total supply for the token contract.\n\nOperation ID: getTokenContractSummary\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tokenization/getTokenContractSummary'

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
  static path = '/v1/tokenization/tokens/{id}/summary'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetTokenContractSummary)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['id'] = String(flags['id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/tokenization/tokens/{id}/summary',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
