import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetEmbeddedWalletAccount extends FireblocksBaseCommand {
  static summary = 'Get a account'

  static description = 'Get a specific account under a specific Non Custodial Wallet\n\nOperation ID: GetEmbeddedWalletAccount\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Embedded%20Wallets/GetEmbeddedWalletAccount'

  static enableJsonFlag = false

  static flags = {
    'wallet-id': Flags.string({
      description: 'WalletId',
      required: true,
    }),
    'account-id': Flags.string({
      description: 'The ID of the account',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/ncw/wallets/{walletId}/accounts/{accountId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetEmbeddedWalletAccount)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['walletId'] = String(flags['wallet-id'])
    pathParams['accountId'] = String(flags['account-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/ncw/wallets/{walletId}/accounts/{accountId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
