import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetExchangeAccountAsset extends FireblocksBaseCommand {
  static summary = 'Get an asset for an exchange account'

  static description = 'Returns an asset for an exchange account.\nEndpoint Permission: Admin, Non-Signing Admin.\n\nOperation ID: getExchangeAccountAsset\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Exchange%20accounts/getExchangeAccountAsset'

  static enableJsonFlag = false

  static flags = {
    'exchange-account-id': Flags.string({
      description: 'The ID of the exchange account to return',
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
  static path = '/v1/exchange_accounts/{exchangeAccountId}/{assetId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetExchangeAccountAsset)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['exchangeAccountId'] = String(flags['exchange-account-id'])
    pathParams['assetId'] = String(flags['asset-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/exchange_accounts/{exchangeAccountId}/{assetId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
