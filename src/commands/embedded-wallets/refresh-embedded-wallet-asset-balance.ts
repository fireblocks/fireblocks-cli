import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class RefreshEmbeddedWalletAssetBalance extends FireblocksBaseCommand {
  static summary = 'Refresh asset balance'

  static description = 'Refresh the balance of an asset in a specific account\n\nOperation ID: RefreshEmbeddedWalletAssetBalance\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Embedded%20Wallets/RefreshEmbeddedWalletAssetBalance'

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

  static method = 'PUT'
  static path = '/v1/ncw/wallets/{walletId}/accounts/{accountId}/assets/{assetId}/balance'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(RefreshEmbeddedWalletAssetBalance)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['walletId'] = String(flags['wallet-id'])
    pathParams['accountId'] = String(flags['account-id'])
    pathParams['assetId'] = String(flags['asset-id'])


    await this.confirmOrAbort('PUT', '/v1/ncw/wallets/{walletId}/accounts/{accountId}/assets/{assetId}/balance')

    const result = await this.makeRequest(
      'PUT',
      '/v1/ncw/wallets/{walletId}/accounts/{accountId}/assets/{assetId}/balance',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
