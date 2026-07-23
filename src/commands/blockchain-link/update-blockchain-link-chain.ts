import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class UpdateBlockchainLinkChain extends FireblocksBaseCommand {
  static summary = 'Update a blockchain'

  static description = 'Updates the declared properties of an existing blockchain identified by its ID. Only the fields supplied in the request are modified.\n\nOperation ID: updateBlockchainLinkChain\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Blockchain%20link/updateBlockchainLinkChain'

  static enableJsonFlag = false

  static flags = {
    'blockchain-id': Flags.string({
      description: 'ID of the blockchain to update (supplied as a path parameter).',
      required: true,
    }),
    data: Flags.string({
      description: 'JSON request body',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'PUT'
  static path = '/v1/blockchain_link/blockchains/{blockchainId}'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(UpdateBlockchainLinkChain)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')

    let body: Record<string, unknown> | undefined
    if (flags.data) {
      try {
        const parsed = JSON.parse(flags.data)
        if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
          this.error('--data must be a JSON object (e.g., \'{"key": "value"}\')')
        }
        body = parsed as Record<string, unknown>
      } catch {
        this.error('Invalid JSON in --data flag. Ensure the value is valid JSON.')
      }
    }

    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['blockchainId'] = String(flags['blockchain-id'])


    await this.confirmOrAbort('PUT', '/v1/blockchain_link/blockchains/{blockchainId}')

    const result = await this.makeRequest(
      'PUT',
      '/v1/blockchain_link/blockchains/{blockchainId}',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
