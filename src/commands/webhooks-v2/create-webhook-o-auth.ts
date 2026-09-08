import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateWebhookOAuth extends FireblocksBaseCommand {
  static summary = 'Create OAuth credentials'

  static description = 'Creates a reusable OAuth client credential set. Attach it to a webhook by passing the returned id as that webhook\'s \`webhookOauthId\`. Several webhooks may share one credential set, so rotating its client secret covers all of them at once. The client secret is write-only and is never returned.\n\n**Endpoint Permissions:** Owner, Admin, Non-Signing Admin.\n\nOperation ID: createWebhookOAuth\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Webhooks%20V2/createWebhookOAuth'

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
  static path = '/v1/webhooks_settings/oauth'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateWebhookOAuth)

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



    await this.confirmOrAbort('POST', '/v1/webhooks_settings/oauth')

    const result = await this.makeRequest(
      'POST',
      '/v1/webhooks_settings/oauth',
      {
        body,
        headers,
      },
    )

    return result
  }
}
