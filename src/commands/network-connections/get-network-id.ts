import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetNetworkId extends FireblocksBaseCommand {
  static summary = 'Return specific network ID.'

  static description = 'Returns specific network ID.\n\nOperation ID: getNetworkId\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Network%20connections/getNetworkId'

  static enableJsonFlag = false

  static flags = {
    'network-id': Flags.string({
      description: 'The ID of the network',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/network_ids/{networkId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetNetworkId)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['networkId'] = String(flags['network-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/network_ids/{networkId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
