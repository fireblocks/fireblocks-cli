import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetCosignerApiUsers extends FireblocksBaseCommand {
  static summary = 'Get all API users'

  static description = 'Get all cosigner paired API users (paginated).\nEndpoint Permission: Admin and Non-Signing Admin.\n\nOperation ID: getCosignerApiUsers\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Cosigners/getCosignerApiUsers'

  static enableJsonFlag = false

  static flags = {
    'cosigner-id': Flags.string({
      description: 'The unique identifier of the cosigner',
      required: true,
    }),
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
  static path = '/v1/cosigners/{cosignerId}/api_users'
  static operationId = 'getCosignerApiUsers'
  static isEa = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetCosignerApiUsers)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['cosignerId'] = String(flags['cosigner-id'])

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
      '/v1/cosigners/{cosignerId}/api_users',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
