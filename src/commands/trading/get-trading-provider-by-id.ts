import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetTradingProviderById extends FireblocksBaseCommand {
  static summary = 'Get trading provider by ID'

  static description = 'Retrieve a single provider by ID.\n\n**Note:** These endpoints are currently in beta and might be subject to changes. If you want to participate and learn more about the Fireblocks Trading, please contact your Fireblocks Customer Success Manager or send an email to CSM@fireblocks.com.\n\n**Endpoint Permission:** Owner, Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nFor detailed information about error codes and troubleshooting, please refer to our [API Error Codes documentation](https://developers.fireblocks.com/reference/api-error-codes).\n\nOperation ID: getTradingProviderById\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Trading/getTradingProviderById'

  static enableJsonFlag = false

  static flags = {
    'provider-id': Flags.string({
      description: 'The unique identifier of the provider.',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/trading/providers/{providerId}'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetTradingProviderById)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['providerId'] = String(flags['provider-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/trading/providers/{providerId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
