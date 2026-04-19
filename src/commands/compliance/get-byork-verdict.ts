import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetByorkVerdict extends FireblocksBaseCommand {
  static summary = 'Get BYORK Light verdict'

  static description = 'Returns the current BYORK verdict and status for a transaction. Status can be PRE_ACCEPTED, PENDING, RECEIVED (verdict is final but processing not yet complete), or COMPLETED. Requires BYORK Light to be enabled for the tenant. Returns 404 if no BYORK verdict is found for the transaction.\n\nOperation ID: getByorkVerdict\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/getByorkVerdict'

  static enableJsonFlag = false

  static flags = {
    'tx-id': Flags.string({
      description: 'Transaction ID',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/screening/byork/verdict'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetByorkVerdict)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['tx-id'] !== undefined && flags['tx-id'] !== null) {
      queryParams['txId'] = String(flags['tx-id'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/screening/byork/verdict',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
