import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetPagedExchangeAccounts extends FireblocksBaseCommand {
  static summary = 'List connected exchange accounts'

  static description = 'Returns a list of the connected exchange accounts in your workspace. Endpoint Permission: Admin, Non-Signing Admin.\n\nOperation ID: getPagedExchangeAccounts\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Exchange%20accounts/getPagedExchangeAccounts'

  static enableJsonFlag = false

  static flags = {
    'before': Flags.string({
      description: 'The before parameter',
    }),
    'after': Flags.string({
      description: 'The after parameter',
    }),
    'limit': Flags.string({
      description: 'number of exchanges per page',
      required: true,
      default: '3',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/exchange_accounts/paged'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetPagedExchangeAccounts)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['before'] !== undefined && flags['before'] !== null) {
      queryParams['before'] = String(flags['before'])
    }
    if (flags['after'] !== undefined && flags['after'] !== null) {
      queryParams['after'] = String(flags['after'])
    }
    if (flags['limit'] !== undefined && flags['limit'] !== null) {
      queryParams['limit'] = String(flags['limit'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/exchange_accounts/paged',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
