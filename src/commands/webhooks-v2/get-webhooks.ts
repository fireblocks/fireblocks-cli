import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetWebhooks extends FireblocksBaseCommand {
  static summary = 'Get all webhooks'

  static description = 'Get all webhooks (paginated).\n\nOperation ID: getWebhooks\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Webhooks%20V2/getWebhooks'

  static enableJsonFlag = false

  static flags = {
    'order': Flags.string({
      description: 'ASC / DESC ordering (default DESC)',
      default: 'DESC',
      options: ['ASC', 'DESC'],
    }),
    'page-cursor': Flags.string({
      description: 'Cursor of the required page',
    }),
    'page-size': Flags.string({
      description: 'Maximum number of items in the page',
      default: '10',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/webhooks'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetWebhooks)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['order'] !== undefined && flags['order'] !== null) {
      queryParams['order'] = String(flags['order'])
    }
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/webhooks',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
