import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetNFTs extends FireblocksBaseCommand {
  static summary = 'List tokens by IDs'

  static description = 'Returns the requested tokens data.\n\nOperation ID: getNFTs\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/NFTs/getNFTs'

  static enableJsonFlag = false

  static flags = {
    'ids': Flags.string({
      description: 'A comma separated list of NFT IDs. Up to 100 are allowed in a single request.',
      required: true,
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
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/nfts/tokens'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetNFTs)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['ids'] !== undefined && flags['ids'] !== null) {
      queryParams['ids'] = String(flags['ids'])
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

    const result = await this.makeRequest(
      'GET',
      '/v1/nfts/tokens',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
