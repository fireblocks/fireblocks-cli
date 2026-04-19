import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class IssueTokenMultiChain extends FireblocksBaseCommand {
  static summary = 'Issue a token on one or more blockchains'

  static description = 'Facilitates the creation of a new token on one or more blockchains.\n\nOperation ID: issueTokenMultiChain\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tokenization/issueTokenMultiChain'

  static enableJsonFlag = false

  static flags = {
    data: Flags.string({
      description: 'JSON request body',
      required: true,
    }),
  }

  static method = 'POST'
  static path = '/v1/tokenization/multichain/tokens'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(IssueTokenMultiChain)

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



    await this.confirmOrAbort('POST', '/v1/tokenization/multichain/tokens')

    const result = await this.makeRequest(
      'POST',
      '/v1/tokenization/multichain/tokens',
      {
        body,
        headers,
      },
    )

    return result
  }
}
