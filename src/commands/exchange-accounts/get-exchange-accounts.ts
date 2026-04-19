import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetExchangeAccounts extends FireblocksBaseCommand {
  static summary = 'List exchange accounts'

  static description = 'DEPRECATED - Please use the \`/exchange_accounts/paged\` endpoint.\nEndpoint Permission: Admin, Non-Signing Admin.\n\nOperation ID: getExchangeAccounts\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Exchange%20accounts/getExchangeAccounts'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/exchange_accounts'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetExchangeAccounts)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/exchange_accounts',
      {
        headers,
      },
    )

    return result
  }
}
