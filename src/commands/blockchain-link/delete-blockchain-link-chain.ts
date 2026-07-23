import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class DeleteBlockchainLinkChain extends FireblocksBaseCommand {
  static summary = 'Delete a blockchain'

  static description = 'Permanently removes a blockchain identified by its ID. The blockchain must not be in an active lifecycle state.\n\nOperation ID: deleteBlockchainLinkChain\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Blockchain%20link/deleteBlockchainLinkChain'

  static enableJsonFlag = false

  static flags = {
    'blockchain-id': Flags.string({
      description: 'tenant_id is extracted from JWT token context',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'DELETE'
  static path = '/v1/blockchain_link/blockchains/{blockchainId}'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(DeleteBlockchainLinkChain)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['blockchainId'] = String(flags['blockchain-id'])


    await this.confirmOrAbort('DELETE', '/v1/blockchain_link/blockchains/{blockchainId}')

    const result = await this.makeRequest(
      'DELETE',
      '/v1/blockchain_link/blockchains/{blockchainId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
