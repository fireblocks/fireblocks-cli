import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetTokenAccessRegistryAddresses extends FireblocksBaseCommand {
  static summary = 'Get current state of addresses in an access registry'

  static description = 'Returns the currently active addresses in the access registry (added but not removed).\n\nOperation ID: getTokenAccessRegistryAddresses\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tokenization/getTokenAccessRegistryAddresses'

  static enableJsonFlag = false

  static flags = {
    'id': Flags.string({
      description: 'The token link id',
      required: true,
    }),
    'page-cursor': Flags.string({
      description: 'Page cursor to get the next page',
    }),
    'page-size': Flags.integer({
      description: 'Number of items per page (max 100), requesting more than 100 will return 100 items',
    }),
    'sort-by': Flags.string({
      description: 'Sorting field (enum).',
      default: 'dateAdded',
      options: ['dateAdded', 'address'],
    }),
    'order': Flags.string({
      description: 'ASC / DESC ordering (default DESC)',
      default: 'DESC',
      options: ['ASC', 'DESC'],
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/tokenization/access_registries/{id}/addresses'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetTokenAccessRegistryAddresses)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['id'] = String(flags['id'])

    const queryParams: Record<string, string> = {}
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
      '/v1/tokenization/access_registries/{id}/addresses',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
