import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateNewCollection extends FireblocksBaseCommand {
  static summary = 'Create a new collection'

  static description = 'Create a new collection and link it as a token.\nEndpoint Permission: Owner, Admin, Non-Signing Admin, Signer, and Editor.\n\nOperation ID: createNewCollection\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tokenization/createNewCollection'

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
  static path = '/v1/tokenization/collections'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateNewCollection)

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



    await this.confirmOrAbort('POST', '/v1/tokenization/collections')

    const result = await this.makeRequest(
      'POST',
      '/v1/tokenization/collections',
      {
        body,
        headers,
      },
    )

    return result
  }
}
