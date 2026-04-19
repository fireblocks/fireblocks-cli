import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class ListOwnedCollections extends FireblocksBaseCommand {
  static summary = 'List owned collections (paginated)'

  static description = 'Returns all collections in your workspace\n\nOperation ID: listOwnedCollections\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/NFTs/listOwnedCollections'

  static enableJsonFlag = false

  static flags = {
    'ncw-id': Flags.string({
      description: 'Tenant\'s Non-Custodial Wallet ID',
    }),
    'wallet-type': Flags.string({
      description: 'Wallet type, it can be \`VAULT_ACCOUNT\` or \`END_USER_WALLET\`',
      default: 'VAULT_ACCOUNT',
      options: ['VAULT_ACCOUNT', 'END_USER_WALLET'],
    }),
    'search': Flags.string({
      description: 'Search owned collections. Possible criteria for search: collection name, collection contract address.',
    }),
    'page-cursor': Flags.string({
      description: 'Page cursor to fetch',
    }),
    'page-size': Flags.string({
      description: 'Items per page (max 100)',
    }),
    'sort': Flags.string({
      description: 'Sort by param, it can be one param or a list of params separated by comma',
    }),
    'order': Flags.string({
      description: 'Order direction, it can be \`ASC\` for ascending or \`DESC\` for descending',
      default: 'ASC',
      options: ['DESC', 'ASC'],
    }),
    'status': Flags.string({
      description: 'Token ownership status',
      default: 'LISTED',
      options: ['LISTED', 'ARCHIVED'],
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/nfts/ownership/collections'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(ListOwnedCollections)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['ncw-id'] !== undefined && flags['ncw-id'] !== null) {
      queryParams['ncwId'] = String(flags['ncw-id'])
    }
    if (flags['wallet-type'] !== undefined && flags['wallet-type'] !== null) {
      queryParams['walletType'] = String(flags['wallet-type'])
    }
    if (flags['search'] !== undefined && flags['search'] !== null) {
      queryParams['search'] = String(flags['search'])
    }
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
    if (flags['status'] !== undefined && flags['status'] !== null) {
      queryParams['status'] = String(flags['status'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/nfts/ownership/collections',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
