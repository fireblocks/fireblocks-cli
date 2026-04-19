import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetVaultAccountAssetAddresses extends FireblocksBaseCommand {
  static summary = 'Get asset addresses'

  static description = 'DEPRECATED!\n\n- If your application logic or scripts rely on the deprecated endpoint, you should update to account for GET/V1/vault/accounts/{vaultAccountId}/{assetId}/addresses_paginated before Mar 31,2024.\n- All workspaces created after Mar 31,2024. will have it disabled. If it is disabled for your workspace and you attempt to use it, you will receive the following error message: "This endpoint is unavailable.\n- Please use the GET /v1/vault/accounts/{vaultAccountId}/{assetId}/addresses_paginated endpoint to return all the wallet addresses associated with the specified vault account and asset in a paginated list.\n\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nOperation ID: getVaultAccountAssetAddresses\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/getVaultAccountAssetAddresses'

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
  static path = '/v1/vault/accounts/{vaultAccountId}/{assetId}/addresses'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetVaultAccountAssetAddresses)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['vaultAccountId'] = String(flags['vault-account-id'])
    pathParams['assetId'] = String(flags['asset-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/vault/accounts/{vaultAccountId}/{assetId}/addresses',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
