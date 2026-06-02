import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetUsdcGatewayWalletInfoBeta extends FireblocksBaseCommand {
  static summary = 'Get USDC Gateway wallet info'

  static description = 'Returns the USDC Gateway wallet information associated with the given vault account.\n**Note:** This endpoint is currently in beta and might be subject to changes.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nOperation ID: getUsdcGatewayWalletInfoBeta\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/getUsdcGatewayWalletInfoBeta'

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
  static path = '/v1/vault/accounts/{vaultAccountId}/usdc_gateway'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetUsdcGatewayWalletInfoBeta)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['vaultAccountId'] = String(flags['vault-account-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/vault/accounts/{vaultAccountId}/usdc_gateway',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
