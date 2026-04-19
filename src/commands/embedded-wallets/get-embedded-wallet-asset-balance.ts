import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetEmbeddedWalletAssetBalance extends FireblocksBaseCommand {
  static summary = 'Retrieve asset balance'

  static description = 'Get balance for specific asset, under a specific account\n\nOperation ID: GetEmbeddedWalletAssetBalance\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Embedded%20Wallets/GetEmbeddedWalletAssetBalance'

  static enableJsonFlag = false

  static flags = {
    'wallet-id': Flags.string({
      description: 'Wallet Id',
      required: true,
    }),
    'account-id': Flags.string({
      description: 'The ID of the account',
      required: true,
    }),
    'asset-id': Flags.string({
      description: 'The ID of the asset',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/ncw/wallets/{walletId}/accounts/{accountId}/assets/{assetId}/balance'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetEmbeddedWalletAssetBalance)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['walletId'] = String(flags['wallet-id'])
    pathParams['accountId'] = String(flags['account-id'])
    pathParams['assetId'] = String(flags['asset-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/ncw/wallets/{walletId}/accounts/{accountId}/assets/{assetId}/balance',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
