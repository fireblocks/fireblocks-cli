import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetExternalWallets extends FireblocksBaseCommand {
  static summary = 'List external wallets'

  static description = 'Gets a list of external wallets under the workspace.\n\nExternal Wallet is a whitelisted address of a wallet that belongs to your users/counterparties.\n\n- You cannot see the balance of the external wallet.\n- You cannot initiate transactions from an external wallet as the source via Fireblocks.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nOperation ID: getExternalWallets\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/External%20wallets/getExternalWallets'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/external_wallets'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetExternalWallets)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/external_wallets',
      {
        headers,
      },
    )

    return result
  }
}
