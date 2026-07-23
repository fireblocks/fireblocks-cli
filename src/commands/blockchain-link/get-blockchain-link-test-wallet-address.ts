import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetBlockchainLinkTestWalletAddress extends FireblocksBaseCommand {
  static summary = 'Get the test wallet address'

  static description = 'Returns the Ethereum address derived from the configured external wallet private key, used by the UI for test transfers. tenant_id is derived from the JWT token context.\n\nOperation ID: getBlockchainLinkTestWalletAddress\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Blockchain%20link/getBlockchainLinkTestWalletAddress'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/blockchain_link/blockchains/test_wallet_address'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetBlockchainLinkTestWalletAddress)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/blockchain_link/blockchains/test_wallet_address',
      {
        headers,
      },
    )

    return result
  }
}
