import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetCosignerApiUser extends FireblocksBaseCommand {
  static summary = 'Get API user'

  static description = 'Get an API user by ID.\nEndpoint Permission: Admin and Non-Signing Admin.\n\nOperation ID: getCosignerApiUser\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Cosigners/getCosignerApiUser'

  static enableJsonFlag = false

  static flags = {
    'cosigner-id': Flags.string({
      description: 'The unique identifier of the cosigner',
      required: true,
    }),
    'api-user-id': Flags.string({
      description: 'The unique identifier of the API user',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/cosigners/{cosignerId}/api_users/{apiUserId}'
  static operationId = 'getCosignerApiUser'
  static isEa = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetCosignerApiUser)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['cosignerId'] = String(flags['cosigner-id'])
    pathParams['apiUserId'] = String(flags['api-user-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/cosigners/{cosignerId}/api_users/{apiUserId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
