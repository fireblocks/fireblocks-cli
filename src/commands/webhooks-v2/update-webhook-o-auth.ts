import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class UpdateWebhookOAuth extends FireblocksBaseCommand {
  static summary = 'Update OAuth credentials'

  static description = 'Updates only the fields present in the request; anything omitted is left as it is. Sending \`clientSecret\` on its own rotates the secret for every webhook using these credentials.\n\n\`customJwtClaims\`, \`customBodyParams\` and \`customHeaders\` are all merged key by key rather than replaced, the same way a webhook\'s own \`customHeaders\` behaves: a key sent with a value is added or overwritten, a key sent with a \`null\` value is deleted, and a key you omit is left alone. Since a \`null\` inside a map is the delete mechanism, none of the three accepts \`null\` for the whole field — \`customJwtClaims: null\`, \`customBodyParams: null\` or \`customHeaders: null\` is rejected with a \`400\` rather than ignored. Clear a map by listing each of its keys with a \`null\` value. Because \`null\` is spent on deletion, a claim cannot be set to JSON \`null\` either, on this endpoint or on create. \`mtlsClientSignedCert\` is a scalar rather than a map, so \`null\` there does remove it.\n\n**Endpoint Permissions:** Owner, Admin, Non-Signing Admin.\n\nOperation ID: updateWebhookOAuth\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Webhooks%20V2/updateWebhookOAuth'

  static enableJsonFlag = false

  static flags = {
    'webhook-oauth-id': Flags.string({
      description: 'The unique identifier of the OAuth credentials',
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
  static path = '/v1/webhooks_settings/oauth/{webhookOauthId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(UpdateWebhookOAuth)

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
    pathParams['webhookOauthId'] = String(flags['webhook-oauth-id'])


    await this.confirmOrAbort('PATCH', '/v1/webhooks_settings/oauth/{webhookOauthId}')

    const result = await this.makeRequest(
      'PATCH',
      '/v1/webhooks_settings/oauth/{webhookOauthId}',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
