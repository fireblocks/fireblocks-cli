import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetTag extends FireblocksBaseCommand {
  static summary = 'Get a tag'

  static description = 'Retrieve an existing tag by ID.\n\nOperation ID: getTag\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tags/getTag'

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

  static method = 'GET'
  static path = '/v1/tags/{tagId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetTag)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['tagId'] = String(flags['tag-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/tags/{tagId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
