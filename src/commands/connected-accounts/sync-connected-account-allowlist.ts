import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class SyncConnectedAccountAllowlist extends FireblocksBaseCommand {
  static summary = 'Sync allowlist for connected account'

  static description = 'Triggers an on-demand sync from the exchange, bypassing the cache and fetching live data immediately.\n\n**Rate limit:** 1 request per minute per connected account.\n\n**Note:** This endpoint is currently in beta and might be subject to changes. Currently supports CoinbaseExchange/Binance accounts only.\n\nOperation ID: syncConnectedAccountAllowlist\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Connected%20Accounts/syncConnectedAccountAllowlist'

  static enableJsonFlag = false

  static flags = {
    'account-id': Flags.string({
      description: 'The connected account identifier',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/connected_accounts/{accountId}/allowlist/sync'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(SyncConnectedAccountAllowlist)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['accountId'] = String(flags['account-id'])


    await this.confirmOrAbort('POST', '/v1/connected_accounts/{accountId}/allowlist/sync')

    const result = await this.makeRequest(
      'POST',
      '/v1/connected_accounts/{accountId}/allowlist/sync',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
