import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetTokenBalanceForAccount extends FireblocksBaseCommand {
  static summary = 'Get the latest balance for a specific account'

  static description = 'Returns the latest token balance for the specified account address.\n\nOperation ID: getTokenBalanceForAccount\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tokenization/getTokenBalanceForAccount'

  static enableJsonFlag = false

  static flags = {
    'id': Flags.string({
      description: 'The token link id',
      required: true,
    }),
    'account-address': Flags.string({
      description: 'The account address to get balance history for',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/tokenization/tokens/{id}/balances/{accountAddress}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetTokenBalanceForAccount)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['id'] = String(flags['id'])
    pathParams['accountAddress'] = String(flags['account-address'])


    const result = await this.makeRequest(
      'GET',
      '/v1/tokenization/tokens/{id}/balances/{accountAddress}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
