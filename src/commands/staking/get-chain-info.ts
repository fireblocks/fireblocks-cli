import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetChainInfo extends FireblocksBaseCommand {
  static summary = 'Get chain-level staking parameters'

  static description = 'Returns chain-specific staking information such as epoch/slot cadence, lockup or unbonding periods, fee/reward mechanics, and other operational constraints.\n\nOperation ID: getChainInfo\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Staking/getChainInfo'

  static enableJsonFlag = false

  static flags = {
    'chain-descriptor': Flags.string({
      description: 'Protocol identifier for the chain info staking operation (e.g., ETH/MATIC/SOL).',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/staking/chains/{chainDescriptor}/chainInfo'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetChainInfo)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['chainDescriptor'] = String(flags['chain-descriptor'])


    const result = await this.makeRequest(
      'GET',
      '/v1/staking/chains/{chainDescriptor}/chainInfo',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
