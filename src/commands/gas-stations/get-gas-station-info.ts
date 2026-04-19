import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetGasStationInfo extends FireblocksBaseCommand {
  static summary = 'Get gas station settings'

  static description = 'Returns gas station settings and ETH balance.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: getGasStationInfo\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Gas%20stations/getGasStationInfo'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/gas_station'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetGasStationInfo)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/gas_station',
      {
        headers,
      },
    )

    return result
  }
}
