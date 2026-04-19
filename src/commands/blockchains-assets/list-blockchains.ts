import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class ListBlockchains extends FireblocksBaseCommand {
  static summary = 'List blockchains'

  static description = 'Returns all blockchains supported by Fireblocks.\n\nOperation ID: listBlockchains\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Blockchains%20%26%20assets/listBlockchains'

  static enableJsonFlag = false

  static flags = {
    'protocol': Flags.string({
      description: 'Blockchain protocol',
    }),
    'deprecated': Flags.boolean({
      description: 'Is blockchain deprecated',
    }),
    'test': Flags.boolean({
      description: 'Is test blockchain',
    }),
    'ids': Flags.string({
      description: 'A list of blockchain IDs (max 100)',
    }),
    'page-cursor': Flags.string({
      description: 'Page cursor to fetch',
    }),
    'page-size': Flags.string({
      description: 'Items per page (max 500)',
      default: '500',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/blockchains'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(ListBlockchains)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['protocol'] !== undefined && flags['protocol'] !== null) {
      queryParams['protocol'] = String(flags['protocol'])
    }
    if (flags['deprecated'] !== undefined && flags['deprecated'] !== null) {
      queryParams['deprecated'] = String(flags['deprecated'])
    }
    if (flags['test'] !== undefined && flags['test'] !== null) {
      queryParams['test'] = String(flags['test'])
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
      '/v1/blockchains',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
