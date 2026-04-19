import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetSummary extends FireblocksBaseCommand {
  static summary = 'Get positions summary'

  static description = 'Returns an aggregated cross-vault summary: active/inactive counts, total staked, and total rewards per chain.\n\nOperation ID: getSummary\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Staking/getSummary'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/staking/positions/summary'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetSummary)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/staking/positions/summary',
      {
        headers,
      },
    )

    return result
  }
}
