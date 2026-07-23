import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class UpdateUsdcGatewayDepositAutomationBeta extends FireblocksBaseCommand {
  static summary = 'Change a USDC Gateway deposit automation'

  static description = 'Changes an existing USDC Gateway deposit automation for a vault account.\n**Note:** This endpoint is currently in beta and might be subject to changes.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver.\n\nOperation ID: updateUsdcGatewayDepositAutomationBeta\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/updateUsdcGatewayDepositAutomationBeta'

  static enableJsonFlag = false

  static flags = {
    'vault-account-id': Flags.string({
      description: 'The ID of the vault account',
      required: true,
    }),
    'automation-id': Flags.string({
      description: 'The ID of the deposit automation, returned when it was created or read',
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

  static method = 'PATCH'
  static path = '/v1/vault/accounts/{vaultAccountId}/virtual_asset_wallet/usdc_gateway/deposit_automation/{automationId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(UpdateUsdcGatewayDepositAutomationBeta)

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
    pathParams['automationId'] = String(flags['automation-id'])


    await this.confirmOrAbort('PATCH', '/v1/vault/accounts/{vaultAccountId}/virtual_asset_wallet/usdc_gateway/deposit_automation/{automationId}')

    const result = await this.makeRequest(
      'PATCH',
      '/v1/vault/accounts/{vaultAccountId}/virtual_asset_wallet/usdc_gateway/deposit_automation/{automationId}',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
