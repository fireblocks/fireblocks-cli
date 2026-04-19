import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetLinkedCollections extends FireblocksBaseCommand {
  static summary = 'Get collections'

  static description = 'Get collections (paginated).\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nOperation ID: getLinkedCollections\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tokenization/getLinkedCollections'

  static enableJsonFlag = false

  static flags = {
    'page-cursor': Flags.string({
      description: 'Page cursor to get the next page, for example - "MjAyMy0xMi0xMyAyMDozNjowOC4zMDI=:MTEwMA=="',
    }),
    'page-size': Flags.string({
      description: 'Number of items per page (max 100), requesting more then 100 will return 100 items',
      default: '100',
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
  static path = '/v1/tokenization/collections'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetLinkedCollections)


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
      '/v1/tokenization/collections',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
