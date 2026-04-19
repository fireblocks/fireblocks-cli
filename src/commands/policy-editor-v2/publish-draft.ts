import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class PublishDraft extends FireblocksBaseCommand {
  static summary = 'Send publish request for a certain draft id'

  static description = 'Send publish request of certain draft id and returns the response. \n**Note:** These endpoints are currently in beta and might be subject to changes.\nIf you want to participate and learn more about the Fireblocks Policy Editor, please contact your Fireblocks Customer Success Manager or send an email to CSM@fireblocks.com.\n\nOperation ID: publishDraft\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Policy%20Editor%20V2/publishDraft'

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
  static path = '/v1/policy/draft'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(PublishDraft)

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



    await this.confirmOrAbort('POST', '/v1/policy/draft')

    const result = await this.makeRequest(
      'POST',
      '/v1/policy/draft',
      {
        body,
        headers,
      },
    )

    return result
  }
}
