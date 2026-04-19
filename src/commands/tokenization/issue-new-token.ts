import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class IssueNewToken extends FireblocksBaseCommand {
  static summary = 'Issue a new token'

  static description = 'Facilitates the creation of a new token, supporting both EVM-based and Stellar/Ripple platforms. For EVM, it deploys the corresponding contract template to the blockchain and links the token to the workspace. For Stellar/Ripple, it links a newly created token directly to the workspace without deploying a contract. Returns the token link with status "PENDING" until the token is deployed or "SUCCESS" if no deployment is needed.\nEndpoint Permission: Owner, Admin, Non-Signing Admin, Signer, and Editor.\n\nOperation ID: issueNewToken\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tokenization/issueNewToken'

  static enableJsonFlag = false

  static flags = {
    data: Flags.string({
      description: 'JSON request body',
      required: true,
    }),
  }

  static method = 'POST'
  static path = '/v1/tokenization/tokens'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(IssueNewToken)

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



    await this.confirmOrAbort('POST', '/v1/tokenization/tokens')

    const result = await this.makeRequest(
      'POST',
      '/v1/tokenization/tokens',
      {
        body,
        headers,
      },
    )

    return result
  }
}
