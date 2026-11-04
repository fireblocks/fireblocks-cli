import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class UnpairCosignerApiUser extends FireblocksBaseCommand {
  static summary = 'Unpair API user'

  static description = 'Unpair an API user from a cosigner\nEndpoint Permission: Admin and Non-Signing Admin.\n\nOperation ID: unpairCosignerApiUser\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Cosigners/unpairCosignerApiUser'

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

  static method = 'DELETE'
  static path = '/v1/cosigners/{cosignerId}/api_users/{apiUserId}'
  static operationId = 'unpairCosignerApiUser'
  static isEa = false
  static responseHeaders: string[] = ["X-Request-ID","Location"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(UnpairCosignerApiUser)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['cosignerId'] = String(flags['cosigner-id'])
    pathParams['apiUserId'] = String(flags['api-user-id'])


    await this.confirmOrAbort('DELETE', '/v1/cosigners/{cosignerId}/api_users/{apiUserId}')

    const result = await this.makeRequest(
      'DELETE',
      '/v1/cosigners/{cosignerId}/api_users/{apiUserId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
