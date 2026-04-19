import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class ActivateAssetForVaultAccount extends FireblocksBaseCommand {
  static summary = 'Activate a wallet in a vault account'

  static description = 'Initiates activation for a wallet in a vault account. \nActivation is required for tokens that need an on-chain transaction for creation (XLM tokens, SOL tokens etc).\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: activateAssetForVaultAccount\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/activateAssetForVaultAccount'

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
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/vault/accounts/{vaultAccountId}/{assetId}/activate'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(ActivateAssetForVaultAccount)


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

    await this.confirmOrAbort('POST', '/v1/vault/accounts/{vaultAccountId}/{assetId}/activate')

    const result = await this.makeRequest(
      'POST',
      '/v1/vault/accounts/{vaultAccountId}/{assetId}/activate',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
