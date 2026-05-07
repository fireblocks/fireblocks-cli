import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class ActivateCircleGatewayWalletBeta extends FireblocksBaseCommand {
  static summary = 'Activate a Circle Gateway wallet'

  static description = 'Activates the Circle Gateway wallet associated with the given vault account. If the wallet does not yet exist it is created in an activated state.\n\n **Note:** This endpoint is currently in beta and might be subject to changes.\n\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver.\n\nOperation ID: activateCircleGatewayWalletBeta\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/activateCircleGatewayWalletBeta'

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

  static method = 'POST'
  static path = '/v1/vault/accounts/{vaultAccountId}/circle_gateway/activate'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(ActivateCircleGatewayWalletBeta)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['vaultAccountId'] = String(flags['vault-account-id'])


    await this.confirmOrAbort('POST', '/v1/vault/accounts/{vaultAccountId}/circle_gateway/activate')

    const result = await this.makeRequest(
      'POST',
      '/v1/vault/accounts/{vaultAccountId}/circle_gateway/activate',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
