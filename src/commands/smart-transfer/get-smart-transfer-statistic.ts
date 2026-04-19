import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetSmartTransferStatistic extends FireblocksBaseCommand {
  static summary = 'Get smart transfers statistic'

  static description = 'Get smart transfer statistic\n\nOperation ID: getSmartTransferStatistic\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Smart%20Transfer/getSmartTransferStatistic'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/smart_transfers/statistic'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetSmartTransferStatistic)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/smart_transfers/statistic',
      {
        headers,
      },
    )

    return result
  }
}
