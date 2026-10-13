import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetTradingProviderById extends FireblocksBaseCommand {
  static summary = 'Get trading provider by ID'

  static description = 'Retrieve a single provider by ID.\n\n**Endpoint Permission:** Owner, Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nFor detailed information about error codes and troubleshooting, please refer to our [API Error Codes documentation](https://developers.fireblocks.com/reference/api-error-codes).\n\nOperation ID: getTradingProviderById\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Trading/getTradingProviderById'

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
  static operationId = 'getTradingProviderById'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetTradingProviderById)


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
