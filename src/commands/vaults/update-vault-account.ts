import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class UpdateVaultAccount extends FireblocksBaseCommand {
  static summary = 'Rename a vault account'

  static description = 'Renames the requested vault account.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver.\n\nOperation ID: updateVaultAccount\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/updateVaultAccount'

  static enableJsonFlag = false

  static flags = {
    'vault-account-id': Flags.string({
      description: 'The ID of the vault account to edit',
      required: true,
    }),
    data: Flags.string({
      description: 'JSON request body',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'PUT'
  static path = '/v1/vault/accounts/{vaultAccountId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(UpdateVaultAccount)

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


    await this.confirmOrAbort('PUT', '/v1/vault/accounts/{vaultAccountId}')

    const result = await this.makeRequest(
      'PUT',
      '/v1/vault/accounts/{vaultAccountId}',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
