import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetBlockchainLinkBillingInfo extends FireblocksBaseCommand {
  static summary = 'Get tenant billing info'

  static description = 'Returns the tenant\'s blockchain activation limit and current usage. tenant_id is derived from the JWT token context.\n\nOperation ID: getBlockchainLinkBillingInfo\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Blockchain%20link/getBlockchainLinkBillingInfo'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/blockchain_link/blockchains/billing_info'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetBlockchainLinkBillingInfo)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/blockchain_link/blockchains/billing_info',
      {
        headers,
      },
    )

    return result
  }
}
