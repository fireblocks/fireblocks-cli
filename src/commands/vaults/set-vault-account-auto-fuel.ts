import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class SetVaultAccountAutoFuel extends FireblocksBaseCommand {
  static summary = 'Set auto fueling to on or off'

  static description = 'Toggles the auto fueling property of the vault account to enabled or disabled.\nVault Accounts with \'autoFuel=true\' are monitored and auto fueled by the Fireblocks Gas Station.\nLearn more about the Fireblocks Gas Station in the following [guide](https://developers.fireblocks.com/docs/work-with-gas-station).\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: setVaultAccountAutoFuel\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/setVaultAccountAutoFuel'

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
  static path = '/v1/vault/accounts/{vaultAccountId}/set_auto_fuel'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(SetVaultAccountAutoFuel)

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


    await this.confirmOrAbort('POST', '/v1/vault/accounts/{vaultAccountId}/set_auto_fuel')

    const result = await this.makeRequest(
      'POST',
      '/v1/vault/accounts/{vaultAccountId}/set_auto_fuel',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
