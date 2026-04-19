import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class DeleteExternalWallet extends FireblocksBaseCommand {
  static summary = 'Delete an external wallet'

  static description = 'Deletes an external wallet by ID. External Wallet is a whitelisted address of a wallet that belongs to your users/counterparties. Endpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: deleteExternalWallet\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/External%20wallets/deleteExternalWallet'

  static enableJsonFlag = false

  static flags = {
    'wallet-id': Flags.string({
      description: 'The ID of the wallet to delete',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'DELETE'
  static path = '/v1/external_wallets/{walletId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(DeleteExternalWallet)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['walletId'] = String(flags['wallet-id'])


    await this.confirmOrAbort('DELETE', '/v1/external_wallets/{walletId}')

    const result = await this.makeRequest(
      'DELETE',
      '/v1/external_wallets/{walletId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
