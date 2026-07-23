import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetUtxos extends FireblocksBaseCommand {
  static summary = 'List unspent outputs (UTXOs)'

  static description = 'Returns a paginated list of unspent transaction outputs (UTXOs) for a UTXO-based asset in a vault account, with optional filters for labels, statuses, amounts, and more.\n**Note:** These endpoints are currently in beta and might be subject to changes.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nOperation ID: getUtxos\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/UTXO%20Management/getUtxos'

  static enableJsonFlag = false

  static flags = {
    'vault-account-id': Flags.string({
      description: 'The ID of the vault account',
      required: true,
    }),
    'asset-id': Flags.string({
      description: 'The ID of the asset',
      required: true,
    }),
    'page-cursor': Flags.string({
      description: 'Cursor for the next page of results',
    }),
    'page-size': Flags.integer({
      description: 'Number of results per page (max 250, default 50)',
      default: 50,
    }),
    'sort': Flags.string({
      description: 'Field to sort by',
      options: ['AMOUNT', 'CONFIRMATIONS'],
    }),
    'order': Flags.string({
      description: 'Sort order',
      options: ['ASC', 'DESC'],
    }),
    'include-all-labels': Flags.string({
      description: 'Only return UTXOs that have ALL of these labels (AND logic).',
    }),
    'include-any-labels': Flags.string({
      description: 'Return UTXOs that have ANY of these labels (OR logic).',
    }),
    'exclude-any-labels': Flags.string({
      description: 'Exclude UTXOs that have ANY of these labels.',
    }),
    'include-statuses': Flags.string({
      description: 'Filter by UTXO statuses to include.',
    }),
    'address': Flags.string({
      description: 'Filter by address',
    }),
    'tx-hash': Flags.string({
      description: 'Filter by the on-chain hash of the transaction that created the UTXOs. Returns all UTXOs originating from that transaction.',
    }),
    'tx-id': Flags.string({
      description: 'Filter by the Fireblocks transaction ID that created the UTXOs.',
    }),
    'min-amount': Flags.string({
      description: 'Minimum amount filter',
    }),
    'max-amount': Flags.string({
      description: 'Maximum amount filter',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/utxo_management/{vaultAccountId}/{assetId}/unspent_outputs'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetUtxos)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['vaultAccountId'] = String(flags['vault-account-id'])
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
    if (flags['include-all-labels'] !== undefined && flags['include-all-labels'] !== null) {
      queryParams['includeAllLabels'] = String(flags['include-all-labels'])
    }
    if (flags['include-any-labels'] !== undefined && flags['include-any-labels'] !== null) {
      queryParams['includeAnyLabels'] = String(flags['include-any-labels'])
    }
    if (flags['exclude-any-labels'] !== undefined && flags['exclude-any-labels'] !== null) {
      queryParams['excludeAnyLabels'] = String(flags['exclude-any-labels'])
    }
    if (flags['include-statuses'] !== undefined && flags['include-statuses'] !== null) {
      queryParams['includeStatuses'] = String(flags['include-statuses'])
    }
    if (flags['address'] !== undefined && flags['address'] !== null) {
      queryParams['address'] = String(flags['address'])
    }
    if (flags['tx-hash'] !== undefined && flags['tx-hash'] !== null) {
      queryParams['txHash'] = String(flags['tx-hash'])
    }
    if (flags['tx-id'] !== undefined && flags['tx-id'] !== null) {
      queryParams['txId'] = String(flags['tx-id'])
    }
    if (flags['min-amount'] !== undefined && flags['min-amount'] !== null) {
      queryParams['minAmount'] = String(flags['min-amount'])
    }
    if (flags['max-amount'] !== undefined && flags['max-amount'] !== null) {
      queryParams['maxAmount'] = String(flags['max-amount'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/utxo_management/{vaultAccountId}/{assetId}/unspent_outputs',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
