import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateVaultAccountAsset extends FireblocksBaseCommand {
  static summary = 'Create a new vault wallet'

  static description = 'Creates a wallet for a specific asset in a vault account.\nLearn more about Fireblocks Vault Wallets in the following [guide](https://developers.fireblocks.com/reference/create-vault-wallet).\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: createVaultAccountAsset\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/createVaultAccountAsset'

  static enableJsonFlag = false

  static flags = {
    'vault-account-id': Flags.string({
      description: 'The ID of the vault account to return, or \'default\' for the default vault account',
      required: true,
    }),
    'asset-id': Flags.string({
      description: 'The ID of the asset',
      required: true,
    }),
    'blockchain-wallet-type': Flags.string({
      description: 'Optional immutable blockchain wallet type to store per tenant+vault',
    }),
    data: Flags.string({
      description: 'JSON request body',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/vault/accounts/{vaultAccountId}/{assetId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateVaultAccountAsset)

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

    const queryParams: Record<string, string> = {}
    if (flags['blockchain-wallet-type'] !== undefined && flags['blockchain-wallet-type'] !== null) {
      queryParams['blockchainWalletType'] = String(flags['blockchain-wallet-type'])
    }

    await this.confirmOrAbort('POST', '/v1/vault/accounts/{vaultAccountId}/{assetId}')

    const result = await this.makeRequest(
      'POST',
      '/v1/vault/accounts/{vaultAccountId}/{assetId}',
      {
        body,
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
