import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetCollectionById extends FireblocksBaseCommand {
  static summary = 'Get a collection by id'

  static description = 'Get a collection by id\n\nOperation ID: getCollectionById\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tokenization/getCollectionById'

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

  static method = 'GET'
  static path = '/v1/tokenization/collections/{id}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetCollectionById)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['id'] = String(flags['id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/tokenization/collections/{id}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
