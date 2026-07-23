import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class DisableUsdcGatewayDepositAutomationScheduleBeta extends FireblocksBaseCommand {
  static summary = 'Stop a USDC Gateway deposit automation\'s schedule'

  static description = 'Stops the schedule for an existing deposit automation. The automation itself stays configured, only its schedule stops. Turn it back on later with PATCH, without setting up the automation again from scratch.\n**Note:** This endpoint is currently in beta and might be subject to changes.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver.\n\nOperation ID: disableUsdcGatewayDepositAutomationScheduleBeta\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/disableUsdcGatewayDepositAutomationScheduleBeta'

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
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'DELETE'
  static path = '/v1/vault/accounts/{vaultAccountId}/virtual_asset_wallet/usdc_gateway/deposit_automation/{automationId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(DisableUsdcGatewayDepositAutomationScheduleBeta)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['vaultAccountId'] = String(flags['vault-account-id'])
    pathParams['automationId'] = String(flags['automation-id'])


    await this.confirmOrAbort('DELETE', '/v1/vault/accounts/{vaultAccountId}/virtual_asset_wallet/usdc_gateway/deposit_automation/{automationId}')

    const result = await this.makeRequest(
      'DELETE',
      '/v1/vault/accounts/{vaultAccountId}/virtual_asset_wallet/usdc_gateway/deposit_automation/{automationId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
