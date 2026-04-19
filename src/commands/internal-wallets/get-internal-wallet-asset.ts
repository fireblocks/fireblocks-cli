import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetInternalWalletAsset extends FireblocksBaseCommand {
  static summary = 'Get an asset from an internal wallet'

  static description = 'Returns information for an asset in an internal wallet.\n\nOperation ID: getInternalWalletAsset\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Internal%20wallets/getInternalWalletAsset'

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
  static path = '/v1/internal_wallets/{walletId}/{assetId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetInternalWalletAsset)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['walletId'] = String(flags['wallet-id'])
    pathParams['assetId'] = String(flags['asset-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/internal_wallets/{walletId}/{assetId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
