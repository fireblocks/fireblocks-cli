import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class RefreshNFTMetadata extends FireblocksBaseCommand {
  static summary = 'Refresh token metadata'

  static description = 'Updates the latest token metadata.\n\nOperation ID: refreshNFTMetadata\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/NFTs/refreshNFTMetadata'

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

  static method = 'PUT'
  static path = '/v1/nfts/tokens/{id}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(RefreshNFTMetadata)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['id'] = String(flags['id'])


    await this.confirmOrAbort('PUT', '/v1/nfts/tokens/{id}')

    const result = await this.makeRequest(
      'PUT',
      '/v1/nfts/tokens/{id}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
