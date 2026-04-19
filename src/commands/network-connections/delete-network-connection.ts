import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class DeleteNetworkConnection extends FireblocksBaseCommand {
  static summary = 'Delete a network connection by ID'

  static description = 'Deletes an existing network connection specified by its connection ID.\n\nOperation ID: deleteNetworkConnection\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Network%20connections/deleteNetworkConnection'

  static enableJsonFlag = false

  static flags = {
    'connection-id': Flags.string({
      description: 'The ID of the network connection to delete',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'DELETE'
  static path = '/v1/network_connections/{connectionId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(DeleteNetworkConnection)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['connectionId'] = String(flags['connection-id'])


    await this.confirmOrAbort('DELETE', '/v1/network_connections/{connectionId}')

    const result = await this.makeRequest(
      'DELETE',
      '/v1/network_connections/{connectionId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
