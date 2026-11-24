import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateWebhookCustomHeaders extends FireblocksBaseCommand {
  static summary = 'Create a custom headers set'

  static description = 'Creates a reusable set of custom HTTP headers. Attach it to a webhook by passing the returned id as that webhook\'s \`webhookCustomHeadersId\`, to send the headers with that webhook\'s notifications, or to OAuth credentials as their \`webhookCustomHeadersId\`, to send them on the token request to your authorization server. Several webhooks and OAuth credentials may share one set, so changing it covers all of them at once. Header values are write-only and are never returned.\n\nOne set of rules applies to every use of a set, whether a webhook or OAuth credentials attach it: a value is a string or an array of strings (one header line per element), except \`Cookie\` and \`Authorization\`, which take a single string. Where Fireblocks sends its own \`Authorization\` header (an OAuth bearer token on a delivery, \`client_secret_basic\` on a token request), a custom \`Authorization\` header is not sent. Attaching a set checks only that it exists in your workspace.\n\n**Endpoint Permissions:** Owner, Admin, Non-Signing Admin.\n\nOperation ID: createWebhookCustomHeaders\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Webhooks%20V2/createWebhookCustomHeaders'

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
  static path = '/v1/webhooks_settings/custom_headers'
  static operationId = 'createWebhookCustomHeaders'
  static isEa = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateWebhookCustomHeaders)

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



    await this.confirmOrAbort('POST', '/v1/webhooks_settings/custom_headers')

    const result = await this.makeRequest(
      'POST',
      '/v1/webhooks_settings/custom_headers',
      {
        body,
        headers,
      },
    )

    return result
  }
}
