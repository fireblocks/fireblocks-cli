import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateNetworkConnection extends FireblocksBaseCommand {
  static summary = 'Create a new network connection'

  static description = 'Initiates a new network connection.\n**Note:** This API call is subject to Flexible Routing Schemes.\n\nYour routing policy defines how your transactions are routed.\nYou can choose 1 of the 3 different schemes mentioned below for each asset type:\n  - **None**; Defines the profile routing to no destination for that asset type. Incoming transactions to asset types routed to \`None\` will fail.\n  - **Custom**; Route to an account that you choose. If you remove the account, incoming transactions will fail until you choose another one.\n  - **Default**; Use the routing specified by the network profile the connection is connected to. This scheme is also referred to as "Profile Routing"\n\nDefault Workspace Presets:\n  - Network Profile Crypto → **Custom**\n  - Network Profile FIAT → **None**\n  - Network Connection Crypto → **Default**\n  - Network Connection FIAT → **Default**\n\nSupported asset groups for routing police can be found at \`/network_ids/routing_policy_asset_groups\`\n\n    - **Note**: By default, Custom routing scheme uses (\`dstId\` = \`0\`, \`dstType\` = \`VAULT\`).\n\nOperation ID: createNetworkConnection\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Network%20connections/createNetworkConnection'

  static enableJsonFlag = false

  static flags = {
    data: Flags.string({
      description: 'JSON request body',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/network_connections'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateNetworkConnection)

    let body: Record<string, unknown> | undefined
    if (flags.data) {
      try {
        const parsed = JSON.parse(flags.data)
        if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
          this.error('--data must be a JSON object (e.g., \'{"key": "value"}\')')
        }
        body = parsed as Record<string, unknown>
      } catch {
        this.error('Invalid JSON in --data flag. Ensure the value is valid JSON.')
      }
    }

    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }



    await this.confirmOrAbort('POST', '/v1/network_connections')

    const result = await this.makeRequest(
      'POST',
      '/v1/network_connections',
      {
        body,
        headers,
      },
    )

    return result
  }
}
