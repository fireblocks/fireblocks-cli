import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetTransactions extends FireblocksBaseCommand {
  static summary = 'Get transaction history'

  static description = 'Get the transaction history for your workspace.\n\n**Endpoint Permissions:** Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nOperation ID: getTransactions\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Transactions/getTransactions'

  static enableJsonFlag = false

  static flags = {
    'next': Flags.string({
      description: 'Cursor returned in next-page header that can be used to fetch the next page of results',
    }),
    'prev': Flags.string({
      description: 'Cursor returned in prev-page header that can be used to fetch the previous page of results',
    }),
    'before': Flags.string({
      description: 'Unix timestamp in milliseconds. Returns only transactions created before the specified date.\nProvides an explicit end time. If not provided, default value will be applied, and may change over time. \nThe current default value is the past 90 days.\n',
    }),
    'after': Flags.string({
      description: 'Unix timestamp in milliseconds. Returns only transactions created after the specified date.\nProvides an explicit start time. If not provided, default value will be applied, and may change over time. \nThe current default value is the past 90 days.\n',
    }),
    'status': Flags.string({
      description: 'You can filter by one of the statuses.',
    }),
    'order-by': Flags.string({
      description: 'The field to order the results by.\n\n**Note:** Ordering by a field that is not \`createdAt\` may result in transactions that receive updates as you request the next or previous pages of results, resulting in missing those transactions.\n',
      options: ['createdAt', 'lastUpdated'],
    }),
    'sort': Flags.string({
      description: 'The direction to order the results by',
      options: ['ASC', 'DESC'],
    }),
    'limit': Flags.integer({
      description: 'Limits the number of results. If not provided, a limit of 200 will be used. The maximum allowed limit is 500',
      default: 200,
    }),
    'source-type': Flags.string({
      description: 'The source type of the transaction',
      options: ['VAULT_ACCOUNT', 'EXCHANGE_ACCOUNT', 'INTERNAL_WALLET', 'EXTERNAL_WALLET', 'CONTRACT', 'FIAT_ACCOUNT', 'NETWORK_CONNECTION', 'COMPOUND', 'UNKNOWN', 'GAS_STATION', 'END_USER_WALLET'],
    }),
    'source-id': Flags.string({
      description: 'The source ID of the transaction',
    }),
    'dest-type': Flags.string({
      description: 'The destination type of the transaction',
      options: ['VAULT_ACCOUNT', 'EXCHANGE_ACCOUNT', 'INTERNAL_WALLET', 'EXTERNAL_WALLET', 'CONTRACT', 'FIAT_ACCOUNT', 'NETWORK_CONNECTION', 'COMPOUND', 'ONE_TIME_ADDRESS', 'END_USER_WALLET'],
    }),
    'dest-id': Flags.string({
      description: 'The destination ID of the transaction',
    }),
    'assets': Flags.string({
      description: 'A list of assets to filter by, seperated by commas',
    }),
    'tx-hash': Flags.string({
      description: 'Returns only results with a specified txHash',
    }),
    'source-wallet-id': Flags.string({
      description: 'Returns only results where the source is a specific end user wallet',
    }),
    'dest-wallet-id': Flags.string({
      description: 'Returns only results where the destination is a specific end user wallet',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/transactions'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID","next-page","prev-page"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetTransactions)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['next'] !== undefined && flags['next'] !== null) {
      queryParams['next'] = String(flags['next'])
    }
    if (flags['prev'] !== undefined && flags['prev'] !== null) {
      queryParams['prev'] = String(flags['prev'])
    }
    if (flags['before'] !== undefined && flags['before'] !== null) {
      queryParams['before'] = String(flags['before'])
    }
    if (flags['after'] !== undefined && flags['after'] !== null) {
      queryParams['after'] = String(flags['after'])
    }
    if (flags['status'] !== undefined && flags['status'] !== null) {
      queryParams['status'] = String(flags['status'])
    }
    if (flags['order-by'] !== undefined && flags['order-by'] !== null) {
      queryParams['orderBy'] = String(flags['order-by'])
    }
    if (flags['sort'] !== undefined && flags['sort'] !== null) {
      queryParams['sort'] = String(flags['sort'])
    }
    if (flags['limit'] !== undefined && flags['limit'] !== null) {
      queryParams['limit'] = String(flags['limit'])
    }
    if (flags['source-type'] !== undefined && flags['source-type'] !== null) {
      queryParams['sourceType'] = String(flags['source-type'])
    }
    if (flags['source-id'] !== undefined && flags['source-id'] !== null) {
      queryParams['sourceId'] = String(flags['source-id'])
    }
    if (flags['dest-type'] !== undefined && flags['dest-type'] !== null) {
      queryParams['destType'] = String(flags['dest-type'])
    }
    if (flags['dest-id'] !== undefined && flags['dest-id'] !== null) {
      queryParams['destId'] = String(flags['dest-id'])
    }
    if (flags['assets'] !== undefined && flags['assets'] !== null) {
      queryParams['assets'] = String(flags['assets'])
    }
    if (flags['tx-hash'] !== undefined && flags['tx-hash'] !== null) {
      queryParams['txHash'] = String(flags['tx-hash'])
    }
    if (flags['source-wallet-id'] !== undefined && flags['source-wallet-id'] !== null) {
      queryParams['sourceWalletId'] = String(flags['source-wallet-id'])
    }
    if (flags['dest-wallet-id'] !== undefined && flags['dest-wallet-id'] !== null) {
      queryParams['destWalletId'] = String(flags['dest-wallet-id'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/transactions',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
