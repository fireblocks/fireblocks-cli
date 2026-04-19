import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetOffExchangeCollateralAccounts extends FireblocksBaseCommand {
  static summary = 'Find a specific collateral exchange account'

  static description = 'Returns a collateral account by mainExchangeAccountId.\nLearn more about Fireblocks Off Exchange in the following [guide](https://developers.fireblocks.com/docs/off-exchange).\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: getOffExchangeCollateralAccounts\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Off%20exchanges/getOffExchangeCollateralAccounts'

  static enableJsonFlag = false

  static flags = {
    'main-exchange-account-id': Flags.string({
      description: 'The id of the main exchange account for which the requested collateral account is associated with',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/off_exchange/collateral_accounts/{mainExchangeAccountId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetOffExchangeCollateralAccounts)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['mainExchangeAccountId'] = String(flags['main-exchange-account-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/off_exchange/collateral_accounts/{mainExchangeAccountId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
