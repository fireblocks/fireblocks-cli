import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class UnlinkCollection extends FireblocksBaseCommand {
  static summary = 'Delete a collection link'

  static description = 'Delete a collection link\n\nOperation ID: unlinkCollection\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tokenization/unlinkCollection'

  static enableJsonFlag = false

  static flags = {
    'id': Flags.string({
      description: 'The token link id',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'DELETE'
  static path = '/v1/tokenization/collections/{id}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(UnlinkCollection)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['id'] = String(flags['id'])


    await this.confirmOrAbort('DELETE', '/v1/tokenization/collections/{id}')

    const result = await this.makeRequest(
      'DELETE',
      '/v1/tokenization/collections/{id}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
