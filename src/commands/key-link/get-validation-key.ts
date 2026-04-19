import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetValidationKey extends FireblocksBaseCommand {
  static summary = 'Get a validation key by \`keyId\`'

  static description = 'Returns a validation key if it exists, identified by the specified \`keyId\`.\n\nOperation ID: getValidationKey\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Key%20Link/getValidationKey'

  static enableJsonFlag = false

  static flags = {
    'key-id': Flags.string({
      description: 'The keyId parameter',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/key_link/validation_keys/{keyId}'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetValidationKey)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['keyId'] = String(flags['key-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/key_link/validation_keys/{keyId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
