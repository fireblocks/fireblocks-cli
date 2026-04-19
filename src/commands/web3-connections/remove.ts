import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class Remove extends FireblocksBaseCommand {
  static summary = 'Remove an existing Web3 connection.'

  static description = 'Remove a Web3 connection\n\nOperation ID: remove\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Web3%20connections/remove'

  static enableJsonFlag = false

  static flags = {
    'id': Flags.string({
      description: 'The ID of the existing Web3 connection to remove.',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'DELETE'
  static path = '/v1/connections/wc/{id}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(Remove)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['id'] = String(flags['id'])


    await this.confirmOrAbort('DELETE', '/v1/connections/wc/{id}')

    const result = await this.makeRequest(
      'DELETE',
      '/v1/connections/wc/{id}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
