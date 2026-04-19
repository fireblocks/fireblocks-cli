import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetInternalWallet extends FireblocksBaseCommand {
  static summary = 'Get assets for internal wallet'

  static description = 'Returns information for an internal wallet.\n\nOperation ID: getInternalWallet\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Internal%20wallets/getInternalWallet'

  static enableJsonFlag = false

  static flags = {
    'wallet-id': Flags.string({
      description: 'The ID of the wallet to return',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/internal_wallets/{walletId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetInternalWallet)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['walletId'] = String(flags['wallet-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/internal_wallets/{walletId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
