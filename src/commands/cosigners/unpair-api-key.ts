import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class UnpairApiKey extends FireblocksBaseCommand {
  static summary = 'Unpair API key'

  static description = 'Unpair an API key from a cosigner\nEndpoint Permission: Admin and Non-Signing Admin.\n\nOperation ID: unpairApiKey\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Cosigners/unpairApiKey'

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
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'DELETE'
  static path = '/v1/cosigners/{cosignerId}/api_keys/{apiKeyId}'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID","Location"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(UnpairApiKey)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['cosignerId'] = String(flags['cosigner-id'])
    pathParams['apiKeyId'] = String(flags['api-key-id'])


    await this.confirmOrAbort('DELETE', '/v1/cosigners/{cosignerId}/api_keys/{apiKeyId}')

    const result = await this.makeRequest(
      'DELETE',
      '/v1/cosigners/{cosignerId}/api_keys/{apiKeyId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
