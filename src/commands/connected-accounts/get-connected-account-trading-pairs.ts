import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetConnectedAccountTradingPairs extends FireblocksBaseCommand {
  static summary = 'Get supported trading pairs for an account'

  static description = 'Retrieve all asset trading pairs supported by a specific connected account, including the pair type (\`quote\`, \`market\`, \`onOffRamp\`).\n\n**Note:** This endpoint is currently in beta and might be subject to changes.\n\nOperation ID: getConnectedAccountTradingPairs\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Connected%20Accounts/getConnectedAccountTradingPairs'

  static enableJsonFlag = false

  static flags = {
    'account-id': Flags.string({
      description: 'The ID of the account to fetch supported pairs for.',
      required: true,
    }),
    'page-size': Flags.integer({
      description: 'Page size for pagination.',
      default: 100,
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
  static path = '/v1/connected_accounts/{accountId}/manifest/capabilities/trading/pairs'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetConnectedAccountTradingPairs)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['accountId'] = String(flags['account-id'])

    const queryParams: Record<string, string> = {}
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/connected_accounts/{accountId}/manifest/capabilities/trading/pairs',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
