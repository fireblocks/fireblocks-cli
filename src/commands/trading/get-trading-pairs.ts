import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetTradingPairs extends FireblocksBaseCommand {
  static summary = 'Get trading pairs'

  static description = 'Retrieve the base/quote trading pairs supported by the tenant\'s trading providers. All filters are optional and combined with AND.\n\nA provider can return several rows for one pair, one per side and per connected account, each with its own \`tradeClass\`. Rows may use the wildcard \`*\` asset ID or the \`BOTH\` side and are returned unexpanded (see the \`baseAsset\`, \`side\` and \`baseChain\` filters for how they match).\n\n**Examples**\n  - Which providers support ETH/USDC: \`?baseAsset=ETH&quoteAsset=USDC\`. Add \`providerId\` to check one provider; an empty \`data\` array means it does not support the pair.\n  - All pairs of one account: \`?providerId=ACME&accountId=\`. Page through large results with \`pageSize\` and \`pageCursor\`.\n  - Everything you can buy with euro: \`?baseAsset=EUR&tradeClass=ON_RAMP\`.\n\n**Endpoint Permission:** Owner, Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nFor detailed information about error codes and troubleshooting, please refer to our [API Error Codes documentation](https://developers.fireblocks.com/reference/api-error-codes).\n\nOperation ID: getTradingPairs\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Trading/getTradingPairs'

  static enableJsonFlag = false

  static flags = {
    'base-asset': Flags.string({
      description: 'Filter by base asset ID. Also matches \`*\` rows on the chain of this asset.',
    }),
    'quote-asset': Flags.string({
      description: 'Filter by quote asset ID. Also matches \`*\` rows on the chain of this asset.',
    }),
    'base-chain': Flags.string({
      description: 'Filter by base asset blockchain \`legacyId\` (e.g. \`ETH\`, \`BASECHAIN_ETH\`, \`SOL\`). Matches both concrete-asset rows and \`*\` rows on that chain.',
    }),
    'quote-chain': Flags.string({
      description: 'Filter by quote asset blockchain \`legacyId\` (e.g. \`ETH\`, \`BASECHAIN_ETH\`, \`SOL\`). Matches both concrete-asset rows and \`*\` rows on that chain.',
    }),
    'base-rail': Flags.string({
      description: 'Filter by base asset transfer rail.',
    }),
    'quote-rail': Flags.string({
      description: 'Filter by quote asset transfer rail.',
    }),
    'side': Flags.string({
      description: 'Filter by trading side. \`BUY\` or \`SELL\` also matches rows whose side is \`BOTH\`; \`BOTH\` matches rows of any side.',
    }),
    'trade-class': Flags.string({
      description: 'Filter by trade class.',
    }),
    'provider-id': Flags.string({
      description: 'Filter by provider ID. Repeat the parameter to match any of several providers, up to 50.',
    }),
    'account-id': Flags.string({
      description: 'Filter by connected account ID. Repeat the parameter to match any of several accounts, up to 50.',
    }),
    'prefunded': Flags.boolean({
      description: 'Filter by whether the pair requires prefunding.',
    }),
    'min': Flags.string({
      description: 'An order-size filter, not a bound on the result. Only returns pairs whose own \`min\` field (the smallest base-asset amount the pair accepts) is at most this value, i.e. pairs that can serve an order of this size. For example, \`min=10\` returns pairs with a \`min\` of 10 or less.',
    }),
    'max': Flags.string({
      description: 'An order-size filter, not a bound on the result. Only returns pairs whose own \`max\` field (the largest base-asset amount the pair accepts) is at least this value. For example, \`max=1000\` returns pairs with a \`max\` of 1000 or more.',
    }),
    'page-size': Flags.integer({
      description: 'Page size for pagination.',
      default: 100,
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
  static path = '/v1/trading/pairs'
  static operationId = 'getTradingPairs'
  static isEa = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetTradingPairs)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['base-asset'] !== undefined && flags['base-asset'] !== null) {
      queryParams['baseAsset'] = String(flags['base-asset'])
    }
    if (flags['quote-asset'] !== undefined && flags['quote-asset'] !== null) {
      queryParams['quoteAsset'] = String(flags['quote-asset'])
    }
    if (flags['base-chain'] !== undefined && flags['base-chain'] !== null) {
      queryParams['baseChain'] = String(flags['base-chain'])
    }
    if (flags['quote-chain'] !== undefined && flags['quote-chain'] !== null) {
      queryParams['quoteChain'] = String(flags['quote-chain'])
    }
    if (flags['base-rail'] !== undefined && flags['base-rail'] !== null) {
      queryParams['baseRail'] = String(flags['base-rail'])
    }
    if (flags['quote-rail'] !== undefined && flags['quote-rail'] !== null) {
      queryParams['quoteRail'] = String(flags['quote-rail'])
    }
    if (flags['side'] !== undefined && flags['side'] !== null) {
      queryParams['side'] = String(flags['side'])
    }
    if (flags['trade-class'] !== undefined && flags['trade-class'] !== null) {
      queryParams['tradeClass'] = String(flags['trade-class'])
    }
    if (flags['provider-id'] !== undefined && flags['provider-id'] !== null) {
      queryParams['providerId'] = String(flags['provider-id'])
    }
    if (flags['account-id'] !== undefined && flags['account-id'] !== null) {
      queryParams['accountId'] = String(flags['account-id'])
    }
    if (flags['prefunded'] !== undefined && flags['prefunded'] !== null) {
      queryParams['prefunded'] = String(flags['prefunded'])
    }
    if (flags['min'] !== undefined && flags['min'] !== null) {
      queryParams['min'] = String(flags['min'])
    }
    if (flags['max'] !== undefined && flags['max'] !== null) {
      queryParams['max'] = String(flags['max'])
    }
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/trading/pairs',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
