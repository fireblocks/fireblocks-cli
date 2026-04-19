import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateWebhook extends FireblocksBaseCommand {
  static summary = 'Create a new webhook'

  static description = 'Creates a new webhook, which will be triggered on the specified events\n\n**Endpoint Permissions:** Owner, Admin, Non-Signing Admin.\n\nOperation ID: createWebhook\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Webhooks%20V2/createWebhook'

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
  static path = '/v1/webhooks'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateWebhook)

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



    await this.confirmOrAbort('POST', '/v1/webhooks')

    const result = await this.makeRequest(
      'POST',
      '/v1/webhooks',
      {
        body,
        headers,
      },
    )

    return result
  }
}
