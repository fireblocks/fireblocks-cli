import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class DeleteInternalWallet extends FireblocksBaseCommand {
  static summary = 'Delete an internal wallet'

  static description = 'Deletes an internal wallet by ID.\n\nOperation ID: deleteInternalWallet\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Internal%20wallets/deleteInternalWallet'

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
  static path = '/v1/internal_wallets/{walletId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(DeleteInternalWallet)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['walletId'] = String(flags['wallet-id'])


    await this.confirmOrAbort('DELETE', '/v1/internal_wallets/{walletId}')

    const result = await this.makeRequest(
      'DELETE',
      '/v1/internal_wallets/{walletId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
