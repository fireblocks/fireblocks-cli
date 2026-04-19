import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetInternalWalletAssetsPaginated extends FireblocksBaseCommand {
  static summary = 'List assets in an internal wallet (Paginated)'

  static description = 'Returns a paginated response of assets in an internal wallet.\n\nOperation ID: getInternalWalletAssetsPaginated\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Internal%20wallets/getInternalWalletAssetsPaginated'

  static enableJsonFlag = false

  static flags = {
    'wallet-id': Flags.string({
      description: 'The ID of the internal wallet to return assets for',
      required: true,
    }),
    'page-size': Flags.string({
      description: 'The pageSize parameter',
      default: '50',
    }),
    'page-cursor': Flags.string({
      description: 'The pageCursor parameter',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/internal_wallets/{walletId}/assets'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetInternalWalletAssetsPaginated)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['walletId'] = String(flags['wallet-id'])

    const queryParams: Record<string, string> = {}
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/internal_wallets/{walletId}/assets',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
