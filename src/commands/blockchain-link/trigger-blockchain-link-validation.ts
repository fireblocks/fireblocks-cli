import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class TriggerBlockchainLinkValidation extends FireblocksBaseCommand {
  static summary = 'Trigger validation workflow'

  static description = 'Starts the asynchronous validation workflow for a blockchain and its associated validation session.\n\nOperation ID: triggerBlockchainLinkValidation\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Blockchain%20link/triggerBlockchainLinkValidation'

  static enableJsonFlag = false

  static flags = {
    'blockchain-id': Flags.string({
      description: 'ID of the blockchain to validate.',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/blockchain_link/blockchains/{blockchainId}/validate'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(TriggerBlockchainLinkValidation)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['blockchainId'] = String(flags['blockchain-id'])


    await this.confirmOrAbort('POST', '/v1/blockchain_link/blockchains/{blockchainId}/validate')

    const result = await this.makeRequest(
      'POST',
      '/v1/blockchain_link/blockchains/{blockchainId}/validate',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
