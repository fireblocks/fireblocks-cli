import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetExchangeAccount extends FireblocksBaseCommand {
  static summary = 'Get a specific exchange account'

  static description = 'Returns an exchange account by ID.\nEndpoint Permission: Admin, Non-Signing Admin.\n\nOperation ID: getExchangeAccount\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Exchange%20accounts/getExchangeAccount'

  static enableJsonFlag = false

  static flags = {
    'exchange-account-id': Flags.string({
      description: 'The ID of the exchange account to return',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/exchange_accounts/{exchangeAccountId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetExchangeAccount)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['exchangeAccountId'] = String(flags['exchange-account-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/exchange_accounts/{exchangeAccountId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
