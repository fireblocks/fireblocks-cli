import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class UpdateVaultAccountAssetAddress extends FireblocksBaseCommand {
  static summary = 'Update address description'

  static description = 'Updates the description of an existing address of an asset in a vault account.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: updateVaultAccountAssetAddress\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/updateVaultAccountAssetAddress'

  static enableJsonFlag = false

  static flags = {
    'vault-account-id': Flags.string({
      description: 'The ID of the vault account',
      required: true,
    }),
    'asset-id': Flags.string({
      description: 'The ID of the asset',
      required: true,
    }),
    'address-id': Flags.string({
      description: 'The address for which to add a description. For XRP, use <address>:<tag>, for all other assets, use only the address',
      required: true,
    }),
    data: Flags.string({
      description: 'JSON request body',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'PUT'
  static path = '/v1/vault/accounts/{vaultAccountId}/{assetId}/addresses/{addressId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(UpdateVaultAccountAssetAddress)

    let body: Record<string, unknown> | undefined
    if (flags.data) {
      try {
        const parsed = JSON.parse(flags.data)
        if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
          this.error('--data must be a JSON object (e.g., \'{"key": "value"}\')')
        }
        body = parsed as Record<string, unknown>
      } catch {
        this.error('Invalid JSON in --data flag. Ensure the value is valid JSON.')
      }
    }

    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['vaultAccountId'] = String(flags['vault-account-id'])
    pathParams['assetId'] = String(flags['asset-id'])
    pathParams['addressId'] = String(flags['address-id'])


    await this.confirmOrAbort('PUT', '/v1/vault/accounts/{vaultAccountId}/{assetId}/addresses/{addressId}')

    const result = await this.makeRequest(
      'PUT',
      '/v1/vault/accounts/{vaultAccountId}/{assetId}/addresses/{addressId}',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
