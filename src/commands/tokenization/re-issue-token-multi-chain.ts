import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class ReIssueTokenMultiChain extends FireblocksBaseCommand {
  static summary = 'Reissue a multichain token'

  static description = 'Reissue a multichain token. This endpoint allows you to reissue a token on one or more blockchains. The token must be initially issued using the issueTokenMultiChain endpoint.\n\nOperation ID: reIssueTokenMultiChain\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tokenization/reIssueTokenMultiChain'

  static enableJsonFlag = false

  static flags = {
    'token-link-id': Flags.string({
      description: 'The ID of the token link',
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

  static method = 'POST'
  static path = '/v1/tokenization/multichain/reissue/token/{tokenLinkId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(ReIssueTokenMultiChain)

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
    pathParams['tokenLinkId'] = String(flags['token-link-id'])


    await this.confirmOrAbort('POST', '/v1/tokenization/multichain/reissue/token/{tokenLinkId}')

    const result = await this.makeRequest(
      'POST',
      '/v1/tokenization/multichain/reissue/token/{tokenLinkId}',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
