import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetVaultBalanceByAsset extends FireblocksBaseCommand {
  static summary = 'Get vault balance by an asset'

  static description = 'Get the total balance of an asset across all the vault accounts.\n\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nOperation ID: getVaultBalanceByAsset\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/getVaultBalanceByAsset'

  static enableJsonFlag = false

  static flags = {
    'asset-id': Flags.string({
      description: 'The assetId parameter',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/vault/assets/{assetId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetVaultBalanceByAsset)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['assetId'] = String(flags['asset-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/vault/assets/{assetId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
