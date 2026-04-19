import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetCosigners extends FireblocksBaseCommand {
  static summary = 'Get all cosigners'

  static description = 'Get all workspace cosigners (paginated).\n**Note:** These endpoints are currently in beta and might be subject to changes.\nEndpoint Permission: Admin and Non-Signing Admin.\n\nOperation ID: getCosigners\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Cosigners/getCosigners'

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
  static path = '/v1/cosigners'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetCosigners)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


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
      '/v1/cosigners',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
