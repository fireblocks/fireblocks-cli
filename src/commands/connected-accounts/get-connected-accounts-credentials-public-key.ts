import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetConnectedAccountsCredentialsPublicKey extends FireblocksBaseCommand {
  static summary = 'Get public key to encrypt connected account credentials'

  static description = 'Returns the RSA public key used to encrypt the \`creds\` field before calling \`POST /connected_accounts\`.\n\nThe key is a singleton resource scoped to the connected-accounts credentials domain — there is one per tenant context.\n\nOperation ID: getConnectedAccountsCredentialsPublicKey\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Connected%20Accounts/getConnectedAccountsCredentialsPublicKey'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/connected_accounts/credentials/public_key'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetConnectedAccountsCredentialsPublicKey)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/connected_accounts/credentials/public_key',
      {
        headers,
      },
    )

    return result
  }
}
