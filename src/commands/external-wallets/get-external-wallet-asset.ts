import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetExternalWalletAsset extends FireblocksBaseCommand {
  static summary = 'Get an asset from an external wallet'

  static description = 'Returns an external wallet by wallet ID and asset ID. External Wallet is a whitelisted address of a wallet that belongs to your users/counterparties. Endpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nOperation ID: getExternalWalletAsset\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/External%20wallets/getExternalWalletAsset'

  static enableJsonFlag = false

  static flags = {
    'wallet-id': Flags.string({
      description: 'The ID of the wallet',
      required: true,
    }),
    'asset-id': Flags.string({
      description: 'The ID of the asset to return',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/external_wallets/{walletId}/{assetId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetExternalWalletAsset)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['walletId'] = String(flags['wallet-id'])
    pathParams['assetId'] = String(flags['asset-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/external_wallets/{walletId}/{assetId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
