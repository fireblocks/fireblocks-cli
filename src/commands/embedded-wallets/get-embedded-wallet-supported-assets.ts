import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetEmbeddedWalletSupportedAssets extends FireblocksBaseCommand {
  static summary = 'Retrieve supported assets'

  static description = 'Get all the available supported assets for the Non-Custodial Wallet\n\nOperation ID: GetEmbeddedWalletSupportedAssets\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Embedded%20Wallets/GetEmbeddedWalletSupportedAssets'

  static enableJsonFlag = false

  static flags = {
    'page-cursor': Flags.string({
      description: 'Next page cursor to fetch',
    }),
    'page-size': Flags.string({
      description: 'Items per page',
      default: '200',
    }),
    'only-base-assets': Flags.boolean({
      description: 'Only base assets',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/ncw/wallets/supported_assets'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetEmbeddedWalletSupportedAssets)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }
    if (flags['only-base-assets'] !== undefined && flags['only-base-assets'] !== null) {
      queryParams['onlyBaseAssets'] = String(flags['only-base-assets'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/ncw/wallets/supported_assets',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
