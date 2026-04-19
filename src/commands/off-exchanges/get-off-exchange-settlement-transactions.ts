import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetOffExchangeSettlementTransactions extends FireblocksBaseCommand {
  static summary = 'Get Settlements Transactions'

  static description = 'Get settlements transactions from exchange.\nLearn more about Fireblocks Off Exchange in the following [guide](https://developers.fireblocks.com/docs/off-exchange).\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: getOffExchangeSettlementTransactions\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Off%20exchanges/getOffExchangeSettlementTransactions'

  static enableJsonFlag = false

  static flags = {
    'main-exchange-account-id': Flags.string({
      description: 'The mainExchangeAccountId parameter',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/off_exchange/settlements/transactions'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetOffExchangeSettlementTransactions)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['main-exchange-account-id'] !== undefined && flags['main-exchange-account-id'] !== null) {
      queryParams['mainExchangeAccountId'] = String(flags['main-exchange-account-id'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/off_exchange/settlements/transactions',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
