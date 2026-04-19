import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetContractTemplates extends FireblocksBaseCommand {
  static summary = 'List all contract templates'

  static description = 'Return minimal representation of all the contract templates available for the workspace.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nOperation ID: getContractTemplates\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Contract%20Templates/getContractTemplates'

  static enableJsonFlag = false

  static flags = {
    'limit': Flags.string({
      description: 'Items per page (max 100)',
      default: '100',
    }),
    'offset': Flags.string({
      description: 'Paging offset',
      default: '0',
    }),
    'page-cursor': Flags.string({
      description: 'Page cursor to get the next page',
    }),
    'page-size': Flags.string({
      description: 'Number of items per page, requesting more then max will return max items',
    }),
    'type': Flags.string({
      description: 'The type of the contract templates you wish to retrieve. Can accept one type, more or none',
      options: ['FUNGIBLE_TOKEN', 'NON_FUNGIBLE_TOKEN', 'TOKEN_UTILITY'],
    }),
    'initialization-phase': Flags.string({
      description: 'For standalone contracts use ON_DEPLOYMENT and for contracts that are behind proxies use POST_DEPLOYMENT',
      options: ['ON_DEPLOYMENT', 'POST_DEPLOYMENT'],
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/tokenization/templates'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetContractTemplates)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['limit'] !== undefined && flags['limit'] !== null) {
      queryParams['limit'] = String(flags['limit'])
    }
    if (flags['offset'] !== undefined && flags['offset'] !== null) {
      queryParams['offset'] = String(flags['offset'])
    }
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }
    if (flags['type'] !== undefined && flags['type'] !== null) {
      queryParams['type'] = String(flags['type'])
    }
    if (flags['initialization-phase'] !== undefined && flags['initialization-phase'] !== null) {
      queryParams['initializationPhase'] = String(flags['initialization-phase'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/tokenization/templates',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
