import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class ActivateBlockchainLinkChain extends FireblocksBaseCommand {
  static summary = 'Activate a blockchain (triggers activation workflow)'

  static description = 'Starts the asynchronous activation workflow for the blockchain identified by its ID, transitioning it towards the ACTIVATED state.\n\nOperation ID: activateBlockchainLinkChain\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Blockchain%20link/activateBlockchainLinkChain'

  static enableJsonFlag = false

  static flags = {
    'blockchain-id': Flags.string({
      description: 'Required blockchain ID to activate',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/blockchain_link/blockchains/{blockchainId}/activate'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(ActivateBlockchainLinkChain)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['blockchainId'] = String(flags['blockchain-id'])


    await this.confirmOrAbort('POST', '/v1/blockchain_link/blockchains/{blockchainId}/activate')

    const result = await this.makeRequest(
      'POST',
      '/v1/blockchain_link/blockchains/{blockchainId}/activate',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
