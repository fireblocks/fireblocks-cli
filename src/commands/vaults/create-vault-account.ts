import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateVaultAccount extends FireblocksBaseCommand {
  static summary = 'Create a new vault account'

  static description = 'Creates a new vault account with the requested name.\n**Note: ** Vault account names should consist of ASCII characters only.\nLearn more about Fireblocks Vault Accounts in the following [guide](https://developers.fireblocks.com/reference/create-vault-account).\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: createVaultAccount\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/createVaultAccount'

  static enableJsonFlag = false

  static flags = {
    data: Flags.string({
      description: 'JSON request body',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/vault/accounts'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateVaultAccount)

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



    await this.confirmOrAbort('POST', '/v1/vault/accounts')

    const result = await this.makeRequest(
      'POST',
      '/v1/vault/accounts',
      {
        body,
        headers,
      },
    )

    return result
  }
}
