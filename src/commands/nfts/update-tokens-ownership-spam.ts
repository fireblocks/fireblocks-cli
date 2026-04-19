import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class UpdateTokensOwnershipSpam extends FireblocksBaseCommand {
  static summary = 'Update tokens ownership spam property'

  static description = 'Updates tokens spam property for a tenant\'s token ownerships, in all tenant vaults.\n\nOperation ID: updateTokensOwnershipSpam\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/NFTs/updateTokensOwnershipSpam'

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

  static method = 'PUT'
  static path = '/v1/nfts/ownership/tokens/spam'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(UpdateTokensOwnershipSpam)

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



    await this.confirmOrAbort('PUT', '/v1/nfts/ownership/tokens/spam')

    const result = await this.makeRequest(
      'PUT',
      '/v1/nfts/ownership/tokens/spam',
      {
        body,
        headers,
      },
    )

    return result
  }
}
