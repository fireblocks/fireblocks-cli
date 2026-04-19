import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class HideVaultAccount extends FireblocksBaseCommand {
  static summary = 'Hide a vault account in the console'

  static description = 'Hides the requested vault account from the web console view.\nThis operation is required when creating thousands of vault accounts to serve your end-users.\nUsed for preventing the web console to be swamped with too much vault accounts.\nLearn more in the following [guide](https://developers.fireblocks.com/docs/create-direct-custody-wallets#hiding-vault-accounts).\nNOTE: Hiding the vault account from the web console will also hide all the related transactions to/from this vault.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: hideVaultAccount\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/hideVaultAccount'

  static enableJsonFlag = false

  static flags = {
    'vault-account-id': Flags.string({
      description: 'The vault account to hide',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/vault/accounts/{vaultAccountId}/hide'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(HideVaultAccount)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['vaultAccountId'] = String(flags['vault-account-id'])


    await this.confirmOrAbort('POST', '/v1/vault/accounts/{vaultAccountId}/hide')

    const result = await this.makeRequest(
      'POST',
      '/v1/vault/accounts/{vaultAccountId}/hide',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
