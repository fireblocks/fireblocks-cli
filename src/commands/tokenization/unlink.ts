import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class Unlink extends FireblocksBaseCommand {
  static summary = 'Unlink a token'

  static description = 'Unlink a token. The token will be unlinked from the workspace. The token will not be deleted on chain nor the refId, only the link to the workspace will be removed.\n\nOperation ID: unlink\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tokenization/unlink'

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
  static path = '/v1/tokenization/tokens/{id}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(Unlink)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['id'] = String(flags['id'])


    await this.confirmOrAbort('DELETE', '/v1/tokenization/tokens/{id}')

    const result = await this.makeRequest(
      'DELETE',
      '/v1/tokenization/tokens/{id}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
