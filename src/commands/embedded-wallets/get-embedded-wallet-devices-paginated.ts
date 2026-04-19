import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetEmbeddedWalletDevicesPaginated extends FireblocksBaseCommand {
  static summary = 'Get registered devices - paginated'

  static description = 'Get a paginated list of registered devices for a specific Non Custodial Wallet\n\nOperation ID: getEmbeddedWalletDevicesPaginated\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Embedded%20Wallets/getEmbeddedWalletDevicesPaginated'

  static enableJsonFlag = false

  static flags = {
    'wallet-id': Flags.string({
      description: 'Wallet Id',
      required: true,
    }),
    'sort': Flags.string({
      description: 'Sort by fields',
      default: 'createdAt',
    }),
    'page-cursor': Flags.string({
      description: 'Cursor to the next page',
    }),
    'page-size': Flags.string({
      description: 'Amount of results to return in the next page',
      default: '200',
    }),
    'order': Flags.string({
      description: 'Is the order ascending or descending',
      default: 'ASC',
      options: ['ASC', 'DESC'],
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/ncw/wallets/{walletId}/devices_paginated'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetEmbeddedWalletDevicesPaginated)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['walletId'] = String(flags['wallet-id'])

    const queryParams: Record<string, string> = {}
    if (flags['sort'] !== undefined && flags['sort'] !== null) {
      queryParams['sort'] = String(flags['sort'])
    }
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }
    if (flags['order'] !== undefined && flags['order'] !== null) {
      queryParams['order'] = String(flags['order'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/ncw/wallets/{walletId}/devices_paginated',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
