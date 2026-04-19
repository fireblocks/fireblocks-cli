import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CheckThirdPartyRouting extends FireblocksBaseCommand {
  static summary = 'Retrieve third-party network routing validation'

  static description = 'The Fireblocks Network allows for flexibility around incoming deposits. A receiver can receive network deposits to locations other than Fireblocks. This endpoint validates whether future transactions are routed to the displayed recipient or to a 3rd party.\n\nOperation ID: checkThirdPartyRouting\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Network%20connections/checkThirdPartyRouting'

  static enableJsonFlag = false

  static flags = {
    'connection-id': Flags.string({
      description: 'The ID of the network connection',
      required: true,
    }),
    'asset-type': Flags.string({
      description: 'The destination asset type',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/network_connections/{connectionId}/is_third_party_routing/{assetType}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CheckThirdPartyRouting)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['connectionId'] = String(flags['connection-id'])
    pathParams['assetType'] = String(flags['asset-type'])


    const result = await this.makeRequest(
      'GET',
      '/v1/network_connections/{connectionId}/is_third_party_routing/{assetType}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
