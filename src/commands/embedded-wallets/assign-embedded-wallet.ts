import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class AssignEmbeddedWallet extends FireblocksBaseCommand {
  static summary = 'Assign a wallet'

  static description = 'Assign a specific Non Custodial Wallet to a user\n\nOperation ID: assignEmbeddedWallet\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Embedded%20Wallets/assignEmbeddedWallet'

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
  static path = '/v1/ncw/wallets/{walletId}/assign'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(AssignEmbeddedWallet)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['walletId'] = String(flags['wallet-id'])


    await this.confirmOrAbort('POST', '/v1/ncw/wallets/{walletId}/assign')

    const result = await this.makeRequest(
      'POST',
      '/v1/ncw/wallets/{walletId}/assign',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
