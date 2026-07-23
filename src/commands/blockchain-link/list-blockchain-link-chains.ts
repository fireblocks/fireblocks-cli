import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class ListBlockchainLinkChains extends FireblocksBaseCommand {
  static summary = 'List blockchains with pagination and filtering'

  static description = 'Returns the tenant\'s blockchains, paginated and filterable by state, network environment, and free-text search, with configurable sorting.\n\nOperation ID: listBlockchainLinkChains\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Blockchain%20link/listBlockchainLinkChains'

  static enableJsonFlag = false

  static flags = {
    'page-cursor': Flags.string({
      description: 'tenant_id is extracted from JWT token context. Opaque cursor for the requested page. Currently encodes the 1-based page number as a decimal string ("1", "2", ...); treat as opaque on the client. Absent = first page.',
    }),
    'page-size': Flags.string({
      description: 'Maximum number of items per page. Default 20, clamped to [1, 1000].',
      default: '20',
    }),
    'search': Flags.string({
      description: 'Free-text search across chain and symbol name.',
    }),
    'status': Flags.string({
      description: 'Include filter (repeated query params).',
    }),
    'blockchain-env': Flags.string({
      description: 'Filter by network.',
    }),
    'sort-by': Flags.string({
      description: 'Sort field. Default: createdAt.',
    }),
    'order': Flags.string({
      description: 'Sort order. Default: DESC.',
      default: 'DESC',
      options: ['ASC', 'DESC'],
    }),
    'status-exclude': Flags.string({
      description: 'Exclude filter (repeated query params).',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/blockchain_link/blockchains'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(ListBlockchainLinkChains)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }
    if (flags['search'] !== undefined && flags['search'] !== null) {
      queryParams['search'] = String(flags['search'])
    }
    if (flags['status'] !== undefined && flags['status'] !== null) {
      queryParams['status'] = String(flags['status'])
    }
    if (flags['blockchain-env'] !== undefined && flags['blockchain-env'] !== null) {
      queryParams['blockchainEnv'] = String(flags['blockchain-env'])
    }
    if (flags['sort-by'] !== undefined && flags['sort-by'] !== null) {
      queryParams['sortBy'] = String(flags['sort-by'])
    }
    if (flags['order'] !== undefined && flags['order'] !== null) {
      queryParams['order'] = String(flags['order'])
    }
    if (flags['status-exclude'] !== undefined && flags['status-exclude'] !== null) {
      queryParams['statusExclude'] = String(flags['status-exclude'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/blockchain_link/blockchains',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
