import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetEarnPositions extends FireblocksBaseCommand {
  static summary = 'Get list of earn positions'

  static description = 'Get list of earn positions for accounts tracked for this workspace. \nOptional query parameters filter by chain, provider, and pagination.\n\n**Note:** This endpoint is currently in beta and might be subject to changes.\n\nOperation ID: getEarnPositions\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Earn/getEarnPositions'

  static enableJsonFlag = false

  static flags = {
    'chain-id': Flags.integer({
      description: 'The chainId parameter',
    }),
    'provider-id': Flags.string({
      description: 'The providerId parameter',
      options: ['MORPHO', 'AAVE'],
    }),
    'page-cursor': Flags.string({
      description: 'Cursor for the next or previous page of results.',
    }),
    'page-size': Flags.integer({
      description: 'Number of items per page.',
      default: 100,
    }),
    'sort-by': Flags.string({
      description: 'Field to sort results by.',
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
  static path = '/v1/earn/positions'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetEarnPositions)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['chain-id'] !== undefined && flags['chain-id'] !== null) {
      queryParams['chainId'] = String(flags['chain-id'])
    }
    if (flags['provider-id'] !== undefined && flags['provider-id'] !== null) {
      queryParams['providerId'] = String(flags['provider-id'])
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
      '/v1/earn/positions',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
