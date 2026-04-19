import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetNetworkIds extends FireblocksBaseCommand {
  static summary = 'Get all network IDs'

  static description = 'Retrieves a list of all local and discoverable remote network IDs.\n\nOperation ID: getNetworkIds\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Network%20connections/getNetworkIds'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/network_ids'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetNetworkIds)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/network_ids',
      {
        headers,
      },
    )

    return result
  }
}
