import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetConnectedAccountAllowlistEntry extends FireblocksBaseCommand {
  static summary = 'Get a single allowlist entry for a connected account'

  static description = 'Retrieves a single allowlist entry by its Fireblocks identifier for a specified connected account.\n\n**Note:** This endpoint is currently in beta and might be subject to changes. Currently supports CoinbaseExchange/Binance accounts only.\n\nOperation ID: getConnectedAccountAllowlistEntry\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Connected%20Accounts/getConnectedAccountAllowlistEntry'

  static enableJsonFlag = false

  static flags = {
    'account-id': Flags.string({
      description: 'The connected account identifier',
      required: true,
    }),
    'allowlist-id': Flags.string({
      description: 'The Fireblocks allowlist entry identifier',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/connected_accounts/{accountId}/allowlist/{allowlistId}'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetConnectedAccountAllowlistEntry)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['accountId'] = String(flags['account-id'])
    pathParams['allowlistId'] = String(flags['allowlist-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/connected_accounts/{accountId}/allowlist/{allowlistId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
