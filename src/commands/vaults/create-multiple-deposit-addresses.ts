import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateMultipleDepositAddresses extends FireblocksBaseCommand {
  static summary = 'Bulk creation of new deposit addresses'

  static description = '**For UTXO blockchains only.**\n\nCreate multiple deposit addresses by running an async job.\n- The target Vault account should already have a UTXO asset wallet with a permanent address.\n- Limited to a maximum of 10,000 addresses per operation. Use multiple operations for the same Vault account/permanent address if needed.\n\n**Endpoint Permissions:** Admin, Non-Signing Admin.\n\nOperation ID: createMultipleDepositAddresses\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/createMultipleDepositAddresses'

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
  static path = '/v1/vault/accounts/addresses/bulk'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateMultipleDepositAddresses)

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



    await this.confirmOrAbort('POST', '/v1/vault/accounts/addresses/bulk')

    const result = await this.makeRequest(
      'POST',
      '/v1/vault/accounts/addresses/bulk',
      {
        body,
        headers,
      },
    )

    return result
  }
}
