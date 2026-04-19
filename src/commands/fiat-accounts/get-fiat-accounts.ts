import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetFiatAccounts extends FireblocksBaseCommand {
  static summary = 'List fiat accounts'

  static description = 'Returns all fiat accounts.\nEndpoint Permission: Admin, Non-Signing Admin.\n\nOperation ID: getFiatAccounts\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Fiat%20accounts/getFiatAccounts'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/fiat_accounts'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetFiatAccounts)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/fiat_accounts',
      {
        headers,
      },
    )

    return result
  }
}
