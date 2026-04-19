import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class ResendNotificationsByResourceId extends FireblocksBaseCommand {
  static summary = 'Resend notifications by resource Id'

  static description = 'Resend notifications by resource Id\n\nEndpoint Permission: Owner, Admin, Non-Signing Admin, Editor, Signer.\n\nOperation ID: resendNotificationsByResourceId\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Webhooks%20V2/resendNotificationsByResourceId'

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
  static path = '/v1/webhooks/{webhookId}/notifications/resend_by_resource'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(ResendNotificationsByResourceId)

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


    await this.confirmOrAbort('POST', '/v1/webhooks/{webhookId}/notifications/resend_by_resource')

    const result = await this.makeRequest(
      'POST',
      '/v1/webhooks/{webhookId}/notifications/resend_by_resource',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
