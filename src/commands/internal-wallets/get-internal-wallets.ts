import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetInternalWallets extends FireblocksBaseCommand {
  static summary = 'List internal wallets'

  static description = 'Gets a list of internal wallets.\n\nOperation ID: getInternalWallets\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Internal%20wallets/getInternalWallets'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/internal_wallets'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetInternalWallets)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/internal_wallets',
      {
        headers,
      },
    )

    return result
  }
}
