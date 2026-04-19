import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetProviders extends FireblocksBaseCommand {
  static summary = 'List staking providers'

  static description = 'Returns all available staking providers with metadata such as name, ID, and supported chains.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: getProviders\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Staking/getProviders'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/staking/providers'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetProviders)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/staking/providers',
      {
        headers,
      },
    )

    return result
  }
}
