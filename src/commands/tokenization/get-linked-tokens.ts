import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetLinkedTokens extends FireblocksBaseCommand {
  static summary = 'List all linked tokens'

  static description = 'Return all linked tokens (paginated)\n\nOperation ID: getLinkedTokens\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tokenization/getLinkedTokens'

  static enableJsonFlag = false

  static flags = {
    'page-cursor': Flags.string({
      description: 'Page cursor to get the next page',
    }),
    'page-size': Flags.string({
      description: 'Number of items per page, requesting more then max will return max items',
    }),
    'status': Flags.string({
      description: 'A comma separated list of statuses to filter. Default is "COMPLETED"',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/tokenization/tokens'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetLinkedTokens)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }
    if (flags['status'] !== undefined && flags['status'] !== null) {
      queryParams['status'] = String(flags['status'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/tokenization/tokens',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
