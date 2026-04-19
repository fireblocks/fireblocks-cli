import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class AddExchangeAccount extends FireblocksBaseCommand {
  static summary = 'Add an exchange account'

  static description = 'Add an exchange account to exchanges. \n\nNote: This endpoint currently only supports the following exchanges \`INDEPENDENT_RESERVE\`,\`BIT\`, \`BITHUMB\`, \`BITSO\`, \`CRYPTOCOM\`, \`BYBIT_V2\`, \`WHITEBIT\`, \`HITBTC\`, \`GEMINI\`, \`HUOBI\`, \`GATEIO\`, \`COINHAKO\`, \`BULLISH\`, \`BITGET\`, and \`LUNO\`\n\nTo add an exchange account, please use the following [guide](https://developers.fireblocks.com/docs/add-an-exchange-account).\n\nOperation ID: addExchangeAccount\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Exchange%20accounts/addExchangeAccount'

  static enableJsonFlag = false

  static flags = {
    data: Flags.string({
      description: 'JSON request body',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/exchange_accounts'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(AddExchangeAccount)

    let body: Record<string, unknown> | undefined
    if (flags.data) {
      try {
        const parsed = JSON.parse(flags.data)
        if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
          this.error('--data must be a JSON object (e.g., \'{"key": "value"}\')')
        }
        body = parsed as Record<string, unknown>
      } catch {
        this.error('Invalid JSON in --data flag. Ensure the value is valid JSON.')
      }
    }

    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }



    await this.confirmOrAbort('POST', '/v1/exchange_accounts')

    const result = await this.makeRequest(
      'POST',
      '/v1/exchange_accounts',
      {
        body,
        headers,
      },
    )

    return result
  }
}
