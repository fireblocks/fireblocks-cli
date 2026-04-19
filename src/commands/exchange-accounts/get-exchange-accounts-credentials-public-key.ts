import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetExchangeAccountsCredentialsPublicKey extends FireblocksBaseCommand {
  static summary = 'Get public key to encrypt exchange credentials'

  static description = 'Return public key\n\nOperation ID: getExchangeAccountsCredentialsPublicKey\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Exchange%20accounts/getExchangeAccountsCredentialsPublicKey'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/exchange_accounts/credentials_public_key'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetExchangeAccountsCredentialsPublicKey)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/exchange_accounts/credentials_public_key',
      {
        headers,
      },
    )

    return result
  }
}
