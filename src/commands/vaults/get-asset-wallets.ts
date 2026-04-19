import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetAssetWallets extends FireblocksBaseCommand {
  static summary = 'Get vault wallets (Paginated)'

  static description = 'Get all vault wallets of the vault accounts in your workspace. \nA vault wallet is an asset in a vault account. \n\nThis method allows fast traversal of all account balances.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nOperation ID: getAssetWallets\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/getAssetWallets'

  static enableJsonFlag = false

  static flags = {
    'total-amount-larger-than': Flags.string({
      description: 'When specified, only vault wallets with total balance greater than this amount are returned.',
    }),
    'asset-id': Flags.string({
      description: 'When specified, only vault wallets with the specified ID are returned.',
    }),
    'order-by': Flags.string({
      description: 'The orderBy parameter',
      default: 'DESC',
      options: ['ASC', 'DESC'],
    }),
    'before': Flags.string({
      description: 'Fetches the next paginated response before this element. \nThis element is a cursor and is returned at the response of the previous page.\n',
    }),
    'after': Flags.string({
      description: 'Fetches the next paginated response after this element. This element is a cursor and is returned at the response of the previous page.',
    }),
    'limit': Flags.string({
      description: 'The maximum number of vault wallets in a single response. \n\nThe default is 200 and the maximum is 1000.\n',
      default: '200',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/vault/asset_wallets'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetAssetWallets)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['total-amount-larger-than'] !== undefined && flags['total-amount-larger-than'] !== null) {
      queryParams['totalAmountLargerThan'] = String(flags['total-amount-larger-than'])
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

    const result = await this.makeRequest(
      'GET',
      '/v1/vault/asset_wallets',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
