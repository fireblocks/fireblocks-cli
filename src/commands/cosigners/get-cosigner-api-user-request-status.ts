import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetCosignerApiUserRequestStatus extends FireblocksBaseCommand {
  static summary = 'Get API user request status'

  static description = 'Get the status of an asynchronous request\nEndpoint Permission: Admin and Non-Signing Admin.\n\nOperation ID: getCosignerApiUserRequestStatus\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Cosigners/getCosignerApiUserRequestStatus'

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
    'request-id': Flags.string({
      description: 'The requestId parameter',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/cosigners/{cosignerId}/api_users/{apiUserId}/{requestId}'
  static operationId = 'getCosignerApiUserRequestStatus'
  static isEa = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetCosignerApiUserRequestStatus)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['cosignerId'] = String(flags['cosigner-id'])
    pathParams['apiUserId'] = String(flags['api-user-id'])
    pathParams['requestId'] = String(flags['request-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/cosigners/{cosignerId}/api_users/{apiUserId}/{requestId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
