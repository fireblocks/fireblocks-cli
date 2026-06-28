import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetConnectedAccountAllowlist extends FireblocksBaseCommand {
  static summary = 'Get allowlist for connected account'

  static description = 'Retrieves the address allowlist for a specified connected account.\n\n**Note:** This endpoint is currently in beta and might be subject to changes. Currently supports CoinbaseExchange/Binance accounts only.\n\nOperation ID: getConnectedAccountAllowlist\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Connected%20Accounts/getConnectedAccountAllowlist'

  static enableJsonFlag = false

  static flags = {
    'account-id': Flags.string({
      description: 'The connected account identifier',
      required: true,
    }),
    'status': Flags.string({
      description: 'Filter by allowlist entry status',
    }),
    'asset-id': Flags.string({
      description: 'Filter by Fireblocks asset ID.\n\nSee [List assets](https://developers.fireblocks.com/reference/listassets) for the canonical list of Fireblocks asset IDs.\n',
    }),
    'network-id': Flags.string({
      description: 'Filter by Fireblocks network ID.\n\nSee [List blockchains](https://developers.fireblocks.com/reference/listblockchains) for the canonical list of Fireblocks blockchain identifiers.\n',
    }),
    'address': Flags.string({
      description: 'Filter by specific address',
    }),
    'page-cursor': Flags.string({
      description: 'Pagination cursor for next page',
    }),
    'page-size': Flags.integer({
      description: 'Maximum number of entries to return',
    }),
    'sort-by': Flags.string({
      description: 'Field to sort results by.',
      default: 'addedAt',
      options: ['addedAt', 'lastSyncedAt'],
    }),
    'order': Flags.string({
      description: 'Sort order (ASC or DESC).',
      default: 'DESC',
      options: ['ASC', 'DESC'],
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/connected_accounts/{accountId}/allowlist'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetConnectedAccountAllowlist)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['accountId'] = String(flags['account-id'])

    const queryParams: Record<string, string> = {}
    if (flags['status'] !== undefined && flags['status'] !== null) {
      queryParams['status'] = String(flags['status'])
    }
    if (flags['asset-id'] !== undefined && flags['asset-id'] !== null) {
      queryParams['assetId'] = String(flags['asset-id'])
    }
    if (flags['network-id'] !== undefined && flags['network-id'] !== null) {
      queryParams['networkId'] = String(flags['network-id'])
    }
    if (flags['address'] !== undefined && flags['address'] !== null) {
      queryParams['address'] = String(flags['address'])
    }
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }
    if (flags['sort-by'] !== undefined && flags['sort-by'] !== null) {
      queryParams['sortBy'] = String(flags['sort-by'])
    }
    if (flags['order'] !== undefined && flags['order'] !== null) {
      queryParams['order'] = String(flags['order'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/connected_accounts/{accountId}/allowlist',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
