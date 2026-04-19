import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class DeleteTag extends FireblocksBaseCommand {
  static summary = 'Delete a tag'

  static description = 'Delete the specified tag.\nEndpoint Permission: For protected tags: Owner, Admin, Non-Signing Admin. For non protected tags: Owner, Admin, Non-Signing Admin, Signer, Editor, Approver.\n\nOperation ID: deleteTag\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tags/deleteTag'

  static enableJsonFlag = false

  static flags = {
    'tag-id': Flags.string({
      description: 'The ID of the tag to retrieve',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'DELETE'
  static path = '/v1/tags/{tagId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(DeleteTag)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['tagId'] = String(flags['tag-id'])


    await this.confirmOrAbort('DELETE', '/v1/tags/{tagId}')

    const result = await this.makeRequest(
      'DELETE',
      '/v1/tags/{tagId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
