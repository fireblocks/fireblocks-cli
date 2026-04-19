import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateEmbeddedWalletAccount extends FireblocksBaseCommand {
  static summary = 'Create a new account'

  static description = 'Create a new account under a specific Non Custodial Wallet\n\nOperation ID: CreateEmbeddedWalletAccount\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Embedded%20Wallets/CreateEmbeddedWalletAccount'

  static enableJsonFlag = false

  static flags = {
    'wallet-id': Flags.string({
      description: 'Wallet Id',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/ncw/wallets/{walletId}/accounts'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateEmbeddedWalletAccount)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['walletId'] = String(flags['wallet-id'])


    await this.confirmOrAbort('POST', '/v1/ncw/wallets/{walletId}/accounts')

    const result = await this.makeRequest(
      'POST',
      '/v1/ncw/wallets/{walletId}/accounts',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
