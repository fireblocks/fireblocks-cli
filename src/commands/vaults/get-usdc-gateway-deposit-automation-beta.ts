import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetUsdcGatewayDepositAutomationBeta extends FireblocksBaseCommand {
  static summary = 'Read the USDC Gateway deposit automations for a vault account'

  static description = 'Returns the USDC Gateway deposit automations configured for the given vault account.\n**Note:** This endpoint is currently in beta and might be subject to changes.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nOperation ID: getUsdcGatewayDepositAutomationBeta\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/getUsdcGatewayDepositAutomationBeta'

  static enableJsonFlag = false

  static flags = {
    'vault-account-id': Flags.string({
      description: 'The ID of the vault account',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/vault/accounts/{vaultAccountId}/virtual_asset_wallet/usdc_gateway/deposit_automation'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetUsdcGatewayDepositAutomationBeta)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['vaultAccountId'] = String(flags['vault-account-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/vault/accounts/{vaultAccountId}/virtual_asset_wallet/usdc_gateway/deposit_automation',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
