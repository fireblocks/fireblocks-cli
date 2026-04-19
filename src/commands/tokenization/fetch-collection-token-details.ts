import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class FetchCollectionTokenDetails extends FireblocksBaseCommand {
  static summary = 'Get collection token details'

  static description = 'Get collection token details by id\n\nOperation ID: fetchCollectionTokenDetails\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tokenization/fetchCollectionTokenDetails'

  static enableJsonFlag = false

  static flags = {
    'id': Flags.string({
      description: 'The collection link id',
      required: true,
    }),
    'token-id': Flags.string({
      description: 'The tokenId as it appears on the blockchain',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/tokenization/collections/{id}/tokens/{tokenId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(FetchCollectionTokenDetails)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['id'] = String(flags['id'])
    pathParams['tokenId'] = String(flags['token-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/tokenization/collections/{id}/tokens/{tokenId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
