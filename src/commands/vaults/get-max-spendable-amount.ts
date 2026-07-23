import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetMaxSpendableAmount extends FireblocksBaseCommand {
  static summary = 'Get max spendable amount in a transaction'

  static description = '**UTXO assets only.**\n\nRetrieve the maximum amount of the specified asset that can be spent in a single transaction from the specified vault account.\n\n**Endpoint Permissions:** Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nOperation ID: getMaxSpendableAmount\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/getMaxSpendableAmount'

  static enableJsonFlag = false

  static flags = {
    'vault-account-id': Flags.string({
      description: 'The ID of the vault account, or \'default\' for the default vault account',
      required: true,
    }),
    'asset-id': Flags.string({
      description: 'The ID of the asset',
      required: true,
    }),
    'manual-signging': Flags.boolean({
      description: 'False by default. The maximum number of inputs depends if the transaction will be signed by an automated co-signer server or on a mobile device.',
    }),
    'include-all-labels': Flags.string({
      description: 'Only include UTXOs that have ALL of these labels (AND logic). Requires the UTXO Manager. This feature is currently in beta and might be subject to changes.',
    }),
    'include-any-labels': Flags.string({
      description: 'Only include UTXOs that have ANY of these labels (OR logic). Requires the UTXO Manager. This feature is currently in beta and might be subject to changes.',
    }),
    'exclude-any-labels': Flags.string({
      description: 'Exclude UTXOs that have ANY of these labels. Requires the UTXO Manager. This feature is currently in beta and might be subject to changes.',
    }),
    'address': Flags.string({
      description: 'Only include UTXOs from this specific address. Requires the UTXO Manager. This feature is currently in beta and might be subject to changes.',
    }),
    'min-amount': Flags.string({
      description: 'Minimum UTXO amount in the asset\'s base unit. Requires the UTXO Manager. This feature is currently in beta and might be subject to changes.',
    }),
    'max-amount': Flags.string({
      description: 'Maximum UTXO amount in the asset\'s base unit. Requires the UTXO Manager. This feature is currently in beta and might be subject to changes.',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/vault/accounts/{vaultAccountId}/{assetId}/max_spendable_amount'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetMaxSpendableAmount)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['vaultAccountId'] = String(flags['vault-account-id'])
    pathParams['assetId'] = String(flags['asset-id'])

    const queryParams: Record<string, string> = {}
    if (flags['manual-signging'] !== undefined && flags['manual-signging'] !== null) {
      queryParams['manualSignging'] = String(flags['manual-signging'])
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
    if (flags['address'] !== undefined && flags['address'] !== null) {
      queryParams['address'] = String(flags['address'])
    }
    if (flags['min-amount'] !== undefined && flags['min-amount'] !== null) {
      queryParams['minAmount'] = String(flags['min-amount'])
    }
    if (flags['max-amount'] !== undefined && flags['max-amount'] !== null) {
      queryParams['maxAmount'] = String(flags['max-amount'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/vault/accounts/{vaultAccountId}/{assetId}/max_spendable_amount',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
