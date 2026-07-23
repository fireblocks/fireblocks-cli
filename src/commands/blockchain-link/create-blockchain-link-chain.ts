import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateBlockchainLinkChain extends FireblocksBaseCommand {
  static summary = 'Create a new blockchain'

  static description = 'Registers a new tenant-managed blockchain from the supplied declared properties. The blockchain starts in the CREATED state and must be activated separately before it can be used.\n\nOperation ID: createBlockchainLinkChain\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Blockchain%20link/createBlockchainLinkChain'

  static enableJsonFlag = false

  static flags = {
    data: Flags.string({
      description: 'JSON request body',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/blockchain_link/blockchains'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateBlockchainLinkChain)

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



    await this.confirmOrAbort('POST', '/v1/blockchain_link/blockchains')

    const result = await this.makeRequest(
      'POST',
      '/v1/blockchain_link/blockchains',
      {
        body,
        headers,
      },
    )

    return result
  }
}
