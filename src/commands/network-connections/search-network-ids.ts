import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class SearchNetworkIds extends FireblocksBaseCommand {
  static summary = 'Get both local IDs and discoverable remote IDs'

  static description = 'Retrieves a list of all local and discoverable remote network IDs. Can be filtered.\n\nOperation ID: searchNetworkIds\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Network%20connections/searchNetworkIds'

  static enableJsonFlag = false

  static flags = {
    'search': Flags.string({
      description: 'Search string - displayName networkId. Optional',
    }),
    'exclude-self': Flags.boolean({
      description: 'Exclude your networkIds. Optional, default false',
    }),
    'only-self': Flags.boolean({
      description: 'Include just your networkIds. Optional, default false',
    }),
    'exclude-connected': Flags.boolean({
      description: 'Exclude connected networkIds. Optional, default false',
    }),
    'page-cursor': Flags.string({
      description: 'ID of the record after which to fetch $limit records',
    }),
    'page-size': Flags.string({
      description: 'Number of records to fetch. By default, it is 50',
      default: '50',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/network_ids/search'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(SearchNetworkIds)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['search'] !== undefined && flags['search'] !== null) {
      queryParams['search'] = String(flags['search'])
    }
    if (flags['exclude-self'] !== undefined && flags['exclude-self'] !== null) {
      queryParams['excludeSelf'] = String(flags['exclude-self'])
    }
    if (flags['only-self'] !== undefined && flags['only-self'] !== null) {
      queryParams['onlySelf'] = String(flags['only-self'])
    }
    if (flags['exclude-connected'] !== undefined && flags['exclude-connected'] !== null) {
      queryParams['excludeConnected'] = String(flags['exclude-connected'])
    }
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/network_ids/search',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
