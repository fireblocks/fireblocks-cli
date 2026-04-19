import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class ResendNotificationById extends FireblocksBaseCommand {
  static summary = 'Resend notification by id'

  static description = 'Resend notification by ID\n\nEndpoint Permission: Owner, Admin, Non-Signing Admin, Editor, Signer.\n\nOperation ID: resendNotificationById\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Webhooks%20V2/resendNotificationById'

  static enableJsonFlag = false

  static flags = {
    'webhook-id': Flags.string({
      description: 'The ID of the webhook',
      required: true,
    }),
    'notification-id': Flags.string({
      description: 'The ID of the notification',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/webhooks/{webhookId}/notifications/{notificationId}/resend'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(ResendNotificationById)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['webhookId'] = String(flags['webhook-id'])
    pathParams['notificationId'] = String(flags['notification-id'])


    await this.confirmOrAbort('POST', '/v1/webhooks/{webhookId}/notifications/{notificationId}/resend')

    const result = await this.makeRequest(
      'POST',
      '/v1/webhooks/{webhookId}/notifications/{notificationId}/resend',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
