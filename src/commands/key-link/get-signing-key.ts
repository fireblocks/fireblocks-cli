import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetSigningKey extends FireblocksBaseCommand {
  static summary = 'Get a signing key by \`keyId\`'

  static description = 'Returns a signing key if it exists, identified by the specified \`keyId\`.\n\nOperation ID: getSigningKey\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Key%20Link/getSigningKey'

  static enableJsonFlag = false

  static flags = {
    'key-id': Flags.string({
      description: 'The unique identifier for the signing key provided by Fireblocks',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/key_link/signing_keys/{keyId}'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetSigningKey)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['keyId'] = String(flags['key-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/key_link/signing_keys/{keyId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
