import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetPagedVaultAccounts extends FireblocksBaseCommand {
  static summary = 'Get vault accounts (Paginated)'

  static description = 'Gets all vault accounts in your workspace. This endpoint returns a limited amount of results with a quick response time.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nOperation ID: getPagedVaultAccounts\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/getPagedVaultAccounts'

  static enableJsonFlag = false

  static flags = {
    'name-prefix': Flags.string({
      description: 'The namePrefix parameter',
    }),
    'name-suffix': Flags.string({
      description: 'The nameSuffix parameter',
    }),
    'min-amount-threshold': Flags.string({
      description: 'Specifying minAmountThreshold will filter accounts whose total balance is greater than this value; otherwise, it returns all accounts. The amount set in this parameter represents the native asset amount, not its USD value.',
    }),
    'asset-id': Flags.string({
      description: 'The assetId parameter',
    }),
    'order-by': Flags.string({
      description: 'The orderBy parameter',
      default: 'DESC',
      options: ['ASC', 'DESC'],
    }),
    'before': Flags.string({
      description: 'The before parameter',
    }),
    'after': Flags.string({
      description: 'The after parameter',
    }),
    'limit': Flags.string({
      description: 'The limit parameter',
      default: '200',
    }),
    'tag-ids': Flags.string({
      description: 'DEPRECATED - use includeTagIds instead',
    }),
    'include-tag-ids': Flags.string({
      description: 'List of tag IDs to include. Vault accounts with any of these tags will be included',
    }),
    'exclude-tag-ids': Flags.string({
      description: 'List of tag IDs to exclude. Vault accounts with any of these tags will be filtered out',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/vault/accounts_paged'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetPagedVaultAccounts)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['name-prefix'] !== undefined && flags['name-prefix'] !== null) {
      queryParams['namePrefix'] = String(flags['name-prefix'])
    }
    if (flags['name-suffix'] !== undefined && flags['name-suffix'] !== null) {
      queryParams['nameSuffix'] = String(flags['name-suffix'])
    }
    if (flags['min-amount-threshold'] !== undefined && flags['min-amount-threshold'] !== null) {
      queryParams['minAmountThreshold'] = String(flags['min-amount-threshold'])
    }
    if (flags['asset-id'] !== undefined && flags['asset-id'] !== null) {
      queryParams['assetId'] = String(flags['asset-id'])
    }
    if (flags['order-by'] !== undefined && flags['order-by'] !== null) {
      queryParams['orderBy'] = String(flags['order-by'])
    }
    if (flags['before'] !== undefined && flags['before'] !== null) {
      queryParams['before'] = String(flags['before'])
    }
    if (flags['after'] !== undefined && flags['after'] !== null) {
      queryParams['after'] = String(flags['after'])
    }
    if (flags['limit'] !== undefined && flags['limit'] !== null) {
      queryParams['limit'] = String(flags['limit'])
    }
    if (flags['tag-ids'] !== undefined && flags['tag-ids'] !== null) {
      queryParams['tagIds'] = String(flags['tag-ids'])
    }
    if (flags['include-tag-ids'] !== undefined && flags['include-tag-ids'] !== null) {
      queryParams['includeTagIds'] = String(flags['include-tag-ids'])
    }
    if (flags['exclude-tag-ids'] !== undefined && flags['exclude-tag-ids'] !== null) {
      queryParams['excludeTagIds'] = String(flags['exclude-tag-ids'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/vault/accounts_paged',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
