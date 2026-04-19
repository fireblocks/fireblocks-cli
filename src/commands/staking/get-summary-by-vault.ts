import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetSummaryByVault extends FireblocksBaseCommand {
  static summary = 'Get positions summary by vault'

  static description = 'Returns per-vault aggregates: status breakdown, total staked, and total rewards per chain.\n\nOperation ID: getSummaryByVault\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Staking/getSummaryByVault'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/staking/positions/summary/vaults'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetSummaryByVault)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/staking/positions/summary/vaults',
      {
        headers,
      },
    )

    return result
  }
}
