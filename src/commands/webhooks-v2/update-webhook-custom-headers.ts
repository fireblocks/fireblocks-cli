import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class UpdateWebhookCustomHeaders extends FireblocksBaseCommand {
  static summary = 'Update a custom headers set'

  static description = 'Updates only the fields present in the request; anything omitted is left as it is. \`headers\` is merged name by name rather than replaced: a header sent with a value is added or overwritten, a header sent as \`null\` is deleted, and a header you omit is left alone. The change applies to every webhook and OAuth credential set that uses the set.\n\nA change that would leave the set with no headers is refused with a \`400\` — delete the set instead. Where Fireblocks sends its own \`Authorization\` header, a custom \`Authorization\` header is not sent: on a webhook that has OAuth credentials attached (the OAuth bearer token), and on the token request of OAuth credentials that use \`client_secret_basic\`.\n\n**Endpoint Permissions:** Owner, Admin, Non-Signing Admin.\n\nOperation ID: updateWebhookCustomHeaders\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Webhooks%20V2/updateWebhookCustomHeaders'

  static enableJsonFlag = false

  static flags = {
    'webhook-custom-headers-id': Flags.string({
      description: 'The unique identifier of the custom headers set',
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

  static method = 'PATCH'
  static path = '/v1/webhooks_settings/custom_headers/{webhookCustomHeadersId}'
  static operationId = 'updateWebhookCustomHeaders'
  static isEa = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(UpdateWebhookCustomHeaders)

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

    const pathParams: Record<string, string> = {}
    pathParams['webhookCustomHeadersId'] = String(flags['webhook-custom-headers-id'])


    await this.confirmOrAbort('PATCH', '/v1/webhooks_settings/custom_headers/{webhookCustomHeadersId}')

    const result = await this.makeRequest(
      'PATCH',
      '/v1/webhooks_settings/custom_headers/{webhookCustomHeadersId}',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
