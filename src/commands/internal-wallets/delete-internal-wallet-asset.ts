import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class DeleteInternalWalletAsset extends FireblocksBaseCommand {
  static summary = 'Delete a whitelisted address'

  static description = 'Deletes a whitelisted address (for an asset) from an internal wallet.\n\nOperation ID: deleteInternalWalletAsset\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Internal%20wallets/deleteInternalWalletAsset'

  static enableJsonFlag = false

  static flags = {
    'wallet-id': Flags.string({
      description: 'The ID of the wallet',
      required: true,
    }),
    'asset-id': Flags.string({
      description: 'The ID of the asset to delete',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'DELETE'
  static path = '/v1/internal_wallets/{walletId}/{assetId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(DeleteInternalWalletAsset)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['walletId'] = String(flags['wallet-id'])
    pathParams['assetId'] = String(flags['asset-id'])


    await this.confirmOrAbort('DELETE', '/v1/internal_wallets/{walletId}/{assetId}')

    const result = await this.makeRequest(
      'DELETE',
      '/v1/internal_wallets/{walletId}/{assetId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
