import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class ResendFailedNotifications extends FireblocksBaseCommand {
  static summary = 'Resend failed notifications'

  static description = 'Resend all failed notifications for a webhook in the last 24 hours\n\nEndpoint Permission: Owner, Admin, Non-Signing Admin, Editor, Signer.\n\nOperation ID: resendFailedNotifications\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Webhooks%20V2/resendFailedNotifications'

  static enableJsonFlag = false

  static flags = {
    'webhook-id': Flags.string({
      description: 'The ID of the webhook',
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

  static method = 'POST'
  static path = '/v1/webhooks/{webhookId}/notifications/resend_failed'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID","Location"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(ResendFailedNotifications)

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
    pathParams['webhookId'] = String(flags['webhook-id'])


    await this.confirmOrAbort('POST', '/v1/webhooks/{webhookId}/notifications/resend_failed')

    const result = await this.makeRequest(
      'POST',
      '/v1/webhooks/{webhookId}/notifications/resend_failed',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
