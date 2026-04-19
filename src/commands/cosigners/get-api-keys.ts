import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetApiKeys extends FireblocksBaseCommand {
  static summary = 'Get all API keys'

  static description = 'Get all cosigner paired API keys (paginated).\n**Note:** These endpoints are currently in beta and might be subject to changes.\nEndpoint Permission: Admin and Non-Signing Admin.\n\nOperation ID: getApiKeys\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Cosigners/getApiKeys'

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
  static path = '/v1/cosigners/{cosignerId}/api_keys'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetApiKeys)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


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
      '/v1/cosigners/{cosignerId}/api_keys',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
