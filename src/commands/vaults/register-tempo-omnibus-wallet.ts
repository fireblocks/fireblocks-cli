import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class RegisterTempoOmnibusWallet extends FireblocksBaseCommand {
  static summary = 'Register a Tempo omnibus wallet'

  static description = 'Registers a Tempo omnibus wallet for the requested vault account.\nTriggering this flow requires the vault account to hold PATH_USD with a balance sufficient to cover the gas fee.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: registerTempoOmnibusWallet\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/registerTempoOmnibusWallet'

  static enableJsonFlag = false

  static flags = {
    'vault-account-id': Flags.string({
      description: 'The ID of the vault account for which to register the Tempo wallet.',
      required: true,
    }),
    'asset-id': Flags.string({
      description: 'The Tempo network asset to register for the vault account.',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/vault/accounts/{vaultAccountId}/{assetId}/omnibus/tempo/register'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(RegisterTempoOmnibusWallet)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['vaultAccountId'] = String(flags['vault-account-id'])
    pathParams['assetId'] = String(flags['asset-id'])


    await this.confirmOrAbort('POST', '/v1/vault/accounts/{vaultAccountId}/{assetId}/omnibus/tempo/register')

    const result = await this.makeRequest(
      'POST',
      '/v1/vault/accounts/{vaultAccountId}/{assetId}/omnibus/tempo/register',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
