import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetTradingProviders extends FireblocksBaseCommand {
  static summary = 'Get providers'

  static description = 'Retrieve a list of all available external providers supporting trading activities through the platform.\n\n**Note:** These endpoints are currently in beta and might be subject to changes. If you want to participate and learn more about the Fireblocks Trading, please contact your Fireblocks Customer Success Manager or send an email to CSM@fireblocks.com.\n\n**Endpoint Permission:** Owner, Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nFor detailed information about error codes and troubleshooting, please refer to our [API Error Codes documentation](https://developers.fireblocks.com/reference/api-error-codes).\n\nOperation ID: getTradingProviders\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Trading/getTradingProviders'

  static enableJsonFlag = false

  static flags = {
    'page-size': Flags.integer({
      description: 'Page size for pagination.',
      default: 20,
    }),
    'page-cursor': Flags.string({
      description: 'Page cursor for pagination.',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/trading/providers'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetTradingProviders)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/trading/providers',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
