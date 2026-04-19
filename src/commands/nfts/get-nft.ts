import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetNFT extends FireblocksBaseCommand {
  static summary = 'List token data by ID'

  static description = 'Returns the requested token data.\n\nOperation ID: getNFT\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/NFTs/getNFT'

  static enableJsonFlag = false

  static flags = {
    'id': Flags.string({
      description: 'NFT ID',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/nfts/tokens/{id}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetNFT)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['id'] = String(flags['id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/nfts/tokens/{id}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
