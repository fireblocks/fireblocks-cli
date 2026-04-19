import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class SetVaultAccountCustomerRefId extends FireblocksBaseCommand {
  static summary = 'Set an AML/KYT ID for a vault account'

  static description = 'Assigns an AML/KYT customer reference ID for the vault account. Learn more about Fireblocks AML management in the following [guide](https://developers.fireblocks.com/docs/define-aml-policies). Endpoint Permission: Admin, Non-Signing Admin.\n\nOperation ID: setVaultAccountCustomerRefId\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/setVaultAccountCustomerRefId'

  static enableJsonFlag = false

  static flags = {
    'vault-account-id': Flags.string({
      description: 'The vault account ID',
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

  static method = 'POST'
  static path = '/v1/vault/accounts/{vaultAccountId}/set_customer_ref_id'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(SetVaultAccountCustomerRefId)

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


    await this.confirmOrAbort('POST', '/v1/vault/accounts/{vaultAccountId}/set_customer_ref_id')

    const result = await this.makeRequest(
      'POST',
      '/v1/vault/accounts/{vaultAccountId}/set_customer_ref_id',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
