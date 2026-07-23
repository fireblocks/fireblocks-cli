import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetBlockchainLinkChain extends FireblocksBaseCommand {
  static summary = 'Get a blockchain by ID'

  static description = 'Returns a single blockchain owned by the tenant, identified by its ID.\n\nOperation ID: getBlockchainLinkChain\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Blockchain%20link/getBlockchainLinkChain'

  static enableJsonFlag = false

  static flags = {
    'blockchain-id': Flags.string({
      description: 'ID of the blockchain to retrieve (supplied as a path parameter).',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/blockchain_link/blockchains/{blockchainId}'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetBlockchainLinkChain)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['blockchainId'] = String(flags['blockchain-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/blockchain_link/blockchains/{blockchainId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
