import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetConnectedAccountRates extends FireblocksBaseCommand {
  static summary = 'Get exchange rates for an account'

  static description = 'Retrieve current exchange rates for converting between specific assets in a connected account.\n\n**Note:** This endpoint is currently in beta and might be subject to changes.\n\nOperation ID: getConnectedAccountRates\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Connected%20Accounts/getConnectedAccountRates'

  static enableJsonFlag = false

  static flags = {
    'account-id': Flags.string({
      description: 'The ID of the account to fetch rates for.',
      required: true,
    }),
    'base-asset-id': Flags.string({
      description: 'The ID of the asset to fetch rates for.',
      required: true,
    }),
    'quote-asset-id': Flags.string({
      description: 'The ID of the asset to get the rates nominally.',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/connected_accounts/{accountId}/rates'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetConnectedAccountRates)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['accountId'] = String(flags['account-id'])

    const queryParams: Record<string, string> = {}
    if (flags['base-asset-id'] !== undefined && flags['base-asset-id'] !== null) {
      queryParams['baseAssetId'] = String(flags['base-asset-id'])
    }
    if (flags['quote-asset-id'] !== undefined && flags['quote-asset-id'] !== null) {
      queryParams['quoteAssetId'] = String(flags['quote-asset-id'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/connected_accounts/{accountId}/rates',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
