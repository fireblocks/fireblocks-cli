import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetOtaStatus extends FireblocksBaseCommand {
  static summary = 'Returns current OTA status'

  static description = 'Returns current OTA status\n\nOperation ID: getOtaStatus\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/OTA/getOtaStatus'

  static enableJsonFlag = false

  static flags = {
  }

  static method = 'GET'
  static path = '/v1/management/ota'
  static isBeta = true

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetOtaStatus)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/management/ota',
      {
        headers,
      },
    )

    return result
  }
}
