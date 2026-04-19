import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetSupportedAssets extends FireblocksBaseCommand {
  static summary = 'List assets (Legacy)'

  static description = '**This legacy endpoint has not been deprecated but it should not be used in your operations. Instead, use the new [List assets](https://developers.fireblocks.com/reference/listassets) endpoint for better performance and to retrieve more detailed asset information.**\n\nRetrieves all assets supported by Fireblocks in your workspace.\n\n**Endpoint Permissions:** Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: getSupportedAssets\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Blockchains%20%26%20assets/getSupportedAssets'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/supported_assets'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetSupportedAssets)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/supported_assets',
      {
        headers,
      },
    )

    return result
  }
}
