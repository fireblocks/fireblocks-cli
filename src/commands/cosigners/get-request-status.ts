import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetRequestStatus extends FireblocksBaseCommand {
  static summary = 'Get request status'

  static description = 'Get the status of an asynchronous request\nEndpoint Permission: Admin and Non-Signing Admin.\n\nOperation ID: getRequestStatus\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Cosigners/getRequestStatus'

  static enableJsonFlag = false

  static flags = {
    'cosigner-id': Flags.string({
      description: 'The unique identifier of the cosigner',
      required: true,
    }),
    'api-key-id': Flags.string({
      description: 'The unique identifier of the API key',
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
  static path = '/v1/cosigners/{cosignerId}/api_keys/{apiKeyId}/{requestId}'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetRequestStatus)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['cosignerId'] = String(flags['cosigner-id'])
    pathParams['apiKeyId'] = String(flags['api-key-id'])
    pathParams['requestId'] = String(flags['request-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/cosigners/{cosignerId}/api_keys/{apiKeyId}/{requestId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
