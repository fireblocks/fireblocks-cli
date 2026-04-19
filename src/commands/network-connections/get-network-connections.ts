import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetNetworkConnections extends FireblocksBaseCommand {
  static summary = 'List network connections'

  static description = 'Returns all network connections.\n\n**Note:** This API call is subject to Flexible Routing Schemes.\n\nYour routing policy defines how your transactions are routed.\nYou can choose 1 of the 3 different schemes mentioned below for each asset type:\n  - **None**; Defines the profile routing to no destination for that asset type. Incoming transactions to asset types routed to \`None\` will fail.\n  - **Custom**; Route to an account that you choose. If you remove the account, incoming transactions will fail until you choose another one.\n  - **Default**; Use the routing specified by the network profile the connection is connected to. This scheme is also referred to as "Profile Routing"\n\nDefault Workspace Presets:\n  - Network Profile Crypto → **Custom**\n  - Network Profile FIAT → **None**\n  - Network Connection Crypto → **Default**\n  - Network Connection FIAT → **Default**\n\nOperation ID: getNetworkConnections\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Network%20connections/getNetworkConnections'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/network_connections'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetNetworkConnections)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/network_connections',
      {
        headers,
      },
    )

    return result
  }
}
