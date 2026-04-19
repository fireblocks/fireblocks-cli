import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetFiatAccount extends FireblocksBaseCommand {
  static summary = 'Find a specific fiat account'

  static description = 'Returns a fiat account by ID.\nEndpoint Permission: Admin, Non-Signing Admin.\n\nOperation ID: getFiatAccount\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Fiat%20accounts/getFiatAccount'

  static enableJsonFlag = false

  static flags = {
    'account-id': Flags.string({
      description: 'The ID of the fiat account to return',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/fiat_accounts/{accountId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetFiatAccount)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['accountId'] = String(flags['account-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/fiat_accounts/{accountId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
