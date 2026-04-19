import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class DeleteNetworkId extends FireblocksBaseCommand {
  static summary = 'Delete specific network ID.'

  static description = 'Deletes a network by its ID.\n\nOperation ID: deleteNetworkId\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Network%20connections/deleteNetworkId'

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

  static method = 'DELETE'
  static path = '/v1/network_ids/{networkId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(DeleteNetworkId)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['networkId'] = String(flags['network-id'])


    await this.confirmOrAbort('DELETE', '/v1/network_ids/{networkId}')

    const result = await this.makeRequest(
      'DELETE',
      '/v1/network_ids/{networkId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
