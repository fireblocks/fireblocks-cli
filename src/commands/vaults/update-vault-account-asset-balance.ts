import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class UpdateVaultAccountAssetBalance extends FireblocksBaseCommand {
  static summary = 'Refresh asset balance data'

  static description = 'Updates the balance of a specific asset in a vault account.\n\nThis API endpoint is subject to a strict rate limit.\nShould be used by clients in very specific scenarios.\n\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: updateVaultAccountAssetBalance\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/updateVaultAccountAssetBalance'

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

  static method = 'POST'
  static path = '/v1/vault/accounts/{vaultAccountId}/{assetId}/balance'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(UpdateVaultAccountAssetBalance)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['vaultAccountId'] = String(flags['vault-account-id'])
    pathParams['assetId'] = String(flags['asset-id'])


    await this.confirmOrAbort('POST', '/v1/vault/accounts/{vaultAccountId}/{assetId}/balance')

    const result = await this.makeRequest(
      'POST',
      '/v1/vault/accounts/{vaultAccountId}/{assetId}/balance',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
