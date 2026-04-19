import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class ListAssets extends FireblocksBaseCommand {
  static summary = 'List assets'

  static description = 'Retrieves a paginated list of all assets supported by Fireblocks in your workspace\n\n**Note:** We will continue to support and display the legacy ID (API ID). Since not all Fireblocks services fully support the new Assets UUID, please use only the legacy ID until further notice.\n\nOperation ID: listAssets\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Blockchains%20%26%20assets/listAssets'

  static enableJsonFlag = false

  static flags = {
    'blockchain-id': Flags.string({
      description: 'Blockchain id of the assets',
    }),
    'asset-class': Flags.string({
      description: 'Assets class',
    }),
    'symbol': Flags.string({
      description: 'Assets onchain symbol',
    }),
    'scope': Flags.string({
      description: 'Scope of the assets',
    }),
    'deprecated': Flags.boolean({
      description: 'Are assets deprecated',
    }),
    'ids': Flags.string({
      description: 'A list of asset IDs (max 100)',
    }),
    'page-cursor': Flags.string({
      description: 'Next page cursor to fetch',
    }),
    'page-size': Flags.string({
      description: 'Items per page',
      default: '500',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/assets'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(ListAssets)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }


    const queryParams: Record<string, string> = {}
    if (flags['blockchain-id'] !== undefined && flags['blockchain-id'] !== null) {
      queryParams['blockchainId'] = String(flags['blockchain-id'])
    }
    if (flags['asset-class'] !== undefined && flags['asset-class'] !== null) {
      queryParams['assetClass'] = String(flags['asset-class'])
    }
    if (flags['symbol'] !== undefined && flags['symbol'] !== null) {
      queryParams['symbol'] = String(flags['symbol'])
    }
    if (flags['scope'] !== undefined && flags['scope'] !== null) {
      queryParams['scope'] = String(flags['scope'])
    }
    if (flags['deprecated'] !== undefined && flags['deprecated'] !== null) {
      queryParams['deprecated'] = String(flags['deprecated'])
    }
    if (flags['ids'] !== undefined && flags['ids'] !== null) {
      queryParams['ids'] = String(flags['ids'])
    }
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/assets',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
