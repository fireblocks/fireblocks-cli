import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class DeactivateCircleGatewayWalletBeta extends FireblocksBaseCommand {
  static summary = 'Deactivate a Circle Gateway wallet'

  static description = 'Deactivates the Circle Gateway wallet associated with the given vault account.\n\n **Note:** This endpoint is currently in beta and might be subject to changes.\n\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver.\n\nOperation ID: deactivateCircleGatewayWalletBeta\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/deactivateCircleGatewayWalletBeta'

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
  static path = '/v1/vault/accounts/{vaultAccountId}/circle_gateway/deactivate'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(DeactivateCircleGatewayWalletBeta)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['vaultAccountId'] = String(flags['vault-account-id'])


    await this.confirmOrAbort('POST', '/v1/vault/accounts/{vaultAccountId}/circle_gateway/deactivate')

    const result = await this.makeRequest(
      'POST',
      '/v1/vault/accounts/{vaultAccountId}/circle_gateway/deactivate',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
