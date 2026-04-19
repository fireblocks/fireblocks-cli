import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetEmbeddedWallets extends FireblocksBaseCommand {
  static summary = 'List wallets'

  static description = 'Get all Non Custodial Wallets\n\nOperation ID: GetEmbeddedWallets\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Embedded%20Wallets/GetEmbeddedWallets'

  static enableJsonFlag = false

  static flags = {
    'page-cursor': Flags.string({
      description: 'Next page cursor to fetch',
    }),
    'page-size': Flags.string({
      description: 'Items per page',
      default: '200',
    }),
    'sort': Flags.string({
      description: 'Field(s) to use for sorting',
      default: 'createdAt',
      options: ['createdAt'],
    }),
    'order': Flags.string({
      description: 'Is the order ascending or descending',
      default: 'ASC',
      options: ['ASC', 'DESC'],
    }),
    'enabled': Flags.boolean({
      description: 'Enabled Wallets',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/ncw/wallets'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetEmbeddedWallets)


    const headers: Record<string, string> = {}


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
      '/v1/ncw/wallets',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
