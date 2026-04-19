import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetNetwork extends FireblocksBaseCommand {
  static summary = 'Get a network connection'

  static description = 'Gets a network connection by ID.\n\nOperation ID: getNetwork\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Network%20connections/getNetwork'

  static enableJsonFlag = false

  static flags = {
    'connection-id': Flags.string({
      description: 'The ID of the connection',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/network_connections/{connectionId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetNetwork)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['connectionId'] = String(flags['connection-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/network_connections/{connectionId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
