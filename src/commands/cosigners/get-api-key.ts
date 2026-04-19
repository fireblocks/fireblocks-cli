import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetApiKey extends FireblocksBaseCommand {
  static summary = 'Get API key'

  static description = 'Get an API key by ID.\n**Note:** These endpoints are currently in beta and might be subject to changes.\nEndpoint Permission: Admin and Non-Signing Admin.\n\nOperation ID: getApiKey\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Cosigners/getApiKey'

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

  static method = 'GET'
  static path = '/v1/cosigners/{cosignerId}/api_keys/{apiKeyId}'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetApiKey)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['cosignerId'] = String(flags['cosigner-id'])
    pathParams['apiKeyId'] = String(flags['api-key-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/cosigners/{cosignerId}/api_keys/{apiKeyId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
