import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateLegacyAddress extends FireblocksBaseCommand {
  static summary = 'Convert a segwit address to legacy format'

  static description = 'Converts an existing segwit address to the legacy format.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: createLegacyAddress\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/createLegacyAddress'

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
      description: 'The segwit address to translate',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/vault/accounts/{vaultAccountId}/{assetId}/addresses/{addressId}/create_legacy'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateLegacyAddress)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['vaultAccountId'] = String(flags['vault-account-id'])
    pathParams['assetId'] = String(flags['asset-id'])
    pathParams['addressId'] = String(flags['address-id'])


    await this.confirmOrAbort('POST', '/v1/vault/accounts/{vaultAccountId}/{assetId}/addresses/{addressId}/create_legacy')

    const result = await this.makeRequest(
      'POST',
      '/v1/vault/accounts/{vaultAccountId}/{assetId}/addresses/{addressId}/create_legacy',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
