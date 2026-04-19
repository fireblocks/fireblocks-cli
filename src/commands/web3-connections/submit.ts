import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class Submit extends FireblocksBaseCommand {
  static summary = 'Respond to a pending Web3 connection request.'

  static description = 'Submit a response to *approve* or *reject* an initiated Web3 connection.\n* Note: This call is used to complete your \`POST /v1/connections/wc/\` request.\n\nAfter this succeeds, your new Web3 connection is created and functioning.\n\nOperation ID: submit\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Web3%20connections/submit'

  static enableJsonFlag = false

  static flags = {
    'id': Flags.string({
      description: 'The ID of the initiated Web3 connection to approve.',
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
  static path = '/v1/connections/wc/{id}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(Submit)

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
    pathParams['id'] = String(flags['id'])


    await this.confirmOrAbort('PUT', '/v1/connections/wc/{id}')

    const result = await this.makeRequest(
      'PUT',
      '/v1/connections/wc/{id}',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
