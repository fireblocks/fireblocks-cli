import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetConnectedAccounts extends FireblocksBaseCommand {
  static summary = 'Get connected accounts'

  static description = 'Returns all connected accounts.\n\n**Note:** This endpoint is currently in beta and might be subject to changes.\n\nOperation ID: getConnectedAccounts\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Connected%20Accounts/getConnectedAccounts'

  static enableJsonFlag = false

  static flags = {
    'main-accounts': Flags.boolean({
      description: 'Whether to include only main accounts in the response.',
      default: false,
    }),
    'page-size': Flags.integer({
      description: 'Page size for pagination.',
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
  static path = '/v1/connected_accounts'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetConnectedAccounts)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['main-accounts'] !== undefined && flags['main-accounts'] !== null) {
      queryParams['mainAccounts'] = String(flags['main-accounts'])
    }
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/connected_accounts',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
