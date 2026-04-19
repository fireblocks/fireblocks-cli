import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetEmbeddedWalletAddresses extends FireblocksBaseCommand {
  static summary = 'Retrieve asset addresses'

  static description = 'Get the addresses of a specific asset, under a specific account, under a specific Non Custodial Wallet\n\nOperation ID: GetEmbeddedWalletAddresses\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Embedded%20Wallets/GetEmbeddedWalletAddresses'

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
    'page-cursor': Flags.string({
      description: 'Cursor to the next page',
    }),
    'page-size': Flags.string({
      description: 'Items per page',
    }),
    'sort': Flags.string({
      description: 'Sort by address',
      default: 'createdAt',
      options: ['address', 'createdAt'],
    }),
    'order': Flags.string({
      description: 'Is the order ascending or descending',
      default: 'ASC',
      options: ['DESC', 'ASC'],
    }),
    'enabled': Flags.boolean({
      description: 'Enabled',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/ncw/wallets/{walletId}/accounts/{accountId}/assets/{assetId}/addresses'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetEmbeddedWalletAddresses)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['walletId'] = String(flags['wallet-id'])
    pathParams['accountId'] = String(flags['account-id'])
    pathParams['assetId'] = String(flags['asset-id'])

    const queryParams: Record<string, string> = {}
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }
    if (flags['sort'] !== undefined && flags['sort'] !== null) {
      queryParams['sort'] = String(flags['sort'])
    }
    if (flags['order'] !== undefined && flags['order'] !== null) {
      queryParams['order'] = String(flags['order'])
    }
    if (flags['enabled'] !== undefined && flags['enabled'] !== null) {
      queryParams['enabled'] = String(flags['enabled'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/ncw/wallets/{walletId}/accounts/{accountId}/assets/{assetId}/addresses',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
