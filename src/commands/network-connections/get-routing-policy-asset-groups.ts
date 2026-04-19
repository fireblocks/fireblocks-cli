import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetRoutingPolicyAssetGroups extends FireblocksBaseCommand {
  static summary = 'Return all enabled routing policy asset groups'

  static description = 'Returns all enabled routing policy asset groups\n\nOperation ID: getRoutingPolicyAssetGroups\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Network%20connections/getRoutingPolicyAssetGroups'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/network_ids/routing_policy_asset_groups'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetRoutingPolicyAssetGroups)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/network_ids/routing_policy_asset_groups',
      {
        headers,
      },
    )

    return result
  }
}
