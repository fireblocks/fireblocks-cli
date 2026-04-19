import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetEmbeddedWallet extends FireblocksBaseCommand {
  static summary = 'Get a wallet'

  static description = 'Get a wallet\n\nOperation ID: GetEmbeddedWallet\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Embedded%20Wallets/GetEmbeddedWallet'

  static enableJsonFlag = false

  static flags = {
    'wallet-id': Flags.string({
      description: 'Wallet Id',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/ncw/wallets/{walletId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetEmbeddedWallet)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['walletId'] = String(flags['wallet-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/ncw/wallets/{walletId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
