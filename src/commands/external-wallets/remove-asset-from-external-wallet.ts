import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class RemoveAssetFromExternalWallet extends FireblocksBaseCommand {
  static summary = 'Delete an asset from an external wallet'

  static description = 'Deletes an external wallet asset by ID. Endpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: removeAssetFromExternalWallet\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/External%20wallets/removeAssetFromExternalWallet'

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
  static path = '/v1/external_wallets/{walletId}/{assetId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(RemoveAssetFromExternalWallet)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['walletId'] = String(flags['wallet-id'])
    pathParams['assetId'] = String(flags['asset-id'])


    await this.confirmOrAbort('DELETE', '/v1/external_wallets/{walletId}/{assetId}')

    const result = await this.makeRequest(
      'DELETE',
      '/v1/external_wallets/{walletId}/{assetId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
