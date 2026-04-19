import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class AddEmbeddedWalletAsset extends FireblocksBaseCommand {
  static summary = 'Add asset to account'

  static description = 'Get the addresses of a specific asset, under a specific account, under a specific Non Custodial Wallet\n\nOperation ID: AddEmbeddedWalletAsset\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Embedded%20Wallets/AddEmbeddedWalletAsset'

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

  static method = 'POST'
  static path = '/v1/ncw/wallets/{walletId}/accounts/{accountId}/assets/{assetId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(AddEmbeddedWalletAsset)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['walletId'] = String(flags['wallet-id'])
    pathParams['accountId'] = String(flags['account-id'])
    pathParams['assetId'] = String(flags['asset-id'])


    await this.confirmOrAbort('POST', '/v1/ncw/wallets/{walletId}/accounts/{accountId}/assets/{assetId}')

    const result = await this.makeRequest(
      'POST',
      '/v1/ncw/wallets/{walletId}/accounts/{accountId}/assets/{assetId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
