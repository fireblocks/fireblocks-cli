import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetChains extends FireblocksBaseCommand {
  static summary = 'List supported staking chains'

  static description = 'Returns an alphabetical list of blockchains supported for staking by the current workspace context.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: getChains\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Staking/getChains'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/staking/chains'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetChains)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/staking/chains',
      {
        headers,
      },
    )

    return result
  }
}
