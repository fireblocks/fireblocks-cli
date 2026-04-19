import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class UpdateDraft extends FireblocksBaseCommand {
  static summary = 'Update the draft with a new set of rules by policy types'

  static description = 'Update the draft and return its validation for specific policy types. \n**Note:** These endpoints are currently in beta and might be subject to changes.\n\nOperation ID: updateDraft\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Policy%20Editor%20V2/updateDraft'

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
  static path = '/v1/policy/draft'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(UpdateDraft)

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



    await this.confirmOrAbort('PUT', '/v1/policy/draft')

    const result = await this.makeRequest(
      'PUT',
      '/v1/policy/draft',
      {
        body,
        headers,
      },
    )

    return result
  }
}
