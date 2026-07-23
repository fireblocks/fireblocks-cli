import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class SetUsdcGatewayDepositAutomationBeta extends FireblocksBaseCommand {
  static summary = 'Set up a USDC Gateway deposit automation for a vault account'

  static description = 'Turns on automatic deposits into the USDC Gateway wallet for the given vault account, on the schedule you choose. Returns an error if an automation already exists for this vault account and asset. Use PATCH to change it instead.\n**Note:** This endpoint is currently in beta and might be subject to changes.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver.\n\nOperation ID: setUsdcGatewayDepositAutomationBeta\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/setUsdcGatewayDepositAutomationBeta'

  static enableJsonFlag = false

  static flags = {
    'vault-account-id': Flags.string({
      description: 'The ID of the vault account',
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
  static path = '/v1/vault/accounts/{vaultAccountId}/virtual_asset_wallet/usdc_gateway/deposit_automation'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(SetUsdcGatewayDepositAutomationBeta)

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


    await this.confirmOrAbort('POST', '/v1/vault/accounts/{vaultAccountId}/virtual_asset_wallet/usdc_gateway/deposit_automation')

    const result = await this.makeRequest(
      'POST',
      '/v1/vault/accounts/{vaultAccountId}/virtual_asset_wallet/usdc_gateway/deposit_automation',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
