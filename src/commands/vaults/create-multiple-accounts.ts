import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateMultipleAccounts extends FireblocksBaseCommand {
  static summary = 'Bulk creation of new vault accounts'

  static description = 'Create multiple vault accounts by running an async job.      \n- The HBAR, TON, SUI, TERRA, ALGO, and DOT blockchains are not supported.\n- These endpoints are currently in beta and might be subject to changes.\n- Limited to a maximum of 10,000 accounts per operation.\n\n**Endpoint Permissions:** Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: createMultipleAccounts\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/createMultipleAccounts'

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
  static path = '/v1/vault/accounts/bulk'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateMultipleAccounts)

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



    await this.confirmOrAbort('POST', '/v1/vault/accounts/bulk')

    const result = await this.makeRequest(
      'POST',
      '/v1/vault/accounts/bulk',
      {
        body,
        headers,
      },
    )

    return result
  }
}
