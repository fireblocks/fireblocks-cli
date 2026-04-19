import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetVaultAccountAsset extends FireblocksBaseCommand {
  static summary = 'Get the asset balance for a vault account'

  static description = 'Returns a specific vault wallet balance information for a specific asset.\n\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor,\n  Viewer.\n\nOperation ID: getVaultAccountAsset\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/getVaultAccountAsset'

  static enableJsonFlag = false

  static flags = {
    'vault-account-id': Flags.string({
      description: 'The ID of the vault account to return',
      required: true,
    }),
    'asset-id': Flags.string({
      description: 'The ID of the asset',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/vault/accounts/{vaultAccountId}/{assetId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetVaultAccountAsset)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['vaultAccountId'] = String(flags['vault-account-id'])
    pathParams['assetId'] = String(flags['asset-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/vault/accounts/{vaultAccountId}/{assetId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
