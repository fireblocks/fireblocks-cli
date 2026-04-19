import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class Create extends FireblocksBaseCommand {
  static summary = 'Create a new Web3 connection.'

  static description = 'Initiate a new Web3 connection.\n\n* Note: After this succeeds, make a request to \`PUT /v1/connections/wc/{id}\` (below) to approve or reject the new Web3 connection.\n\nOperation ID: create\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Web3%20connections/create'

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
  static path = '/v1/connections/wc'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(Create)

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



    await this.confirmOrAbort('POST', '/v1/connections/wc')

    const result = await this.makeRequest(
      'POST',
      '/v1/connections/wc',
      {
        body,
        headers,
      },
    )

    return result
  }
}
