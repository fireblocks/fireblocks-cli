import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateEmbeddedWallet extends FireblocksBaseCommand {
  static summary = 'Create a new wallet'

  static description = 'Create new Non Custodial Wallet\n\nOperation ID: CreateEmbeddedWallet\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Embedded%20Wallets/CreateEmbeddedWallet'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/ncw/wallets'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateEmbeddedWallet)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }



    await this.confirmOrAbort('POST', '/v1/ncw/wallets')

    const result = await this.makeRequest(
      'POST',
      '/v1/ncw/wallets',
      {
        headers,
      },
    )

    return result
  }
}
