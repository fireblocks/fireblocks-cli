import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetScreeningFullDetails extends FireblocksBaseCommand {
  static summary = 'Provides all the compliance details for the given screened transaction.'

  static description = 'Provides all the compliance details for the given screened transaction.\n\nOperation ID: getScreeningFullDetails\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/getScreeningFullDetails'

  static enableJsonFlag = false

  static flags = {
    'tx-id': Flags.string({
      description: 'Fireblocks transaction ID of the screened transaction',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/screening/transaction/{txId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetScreeningFullDetails)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['txId'] = String(flags['tx-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/screening/transaction/{txId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
