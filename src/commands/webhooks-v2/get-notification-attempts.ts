import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetNotificationAttempts extends FireblocksBaseCommand {
  static summary = 'Get notification attempts'

  static description = 'Get notification attempts by notification id\n\nOperation ID: getNotificationAttempts\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Webhooks%20V2/getNotificationAttempts'

  static enableJsonFlag = false

  static flags = {
    'webhook-id': Flags.string({
      description: 'The ID of the webhook to fetch',
      required: true,
    }),
    'notification-id': Flags.string({
      description: 'The ID of the notification to fetch',
      required: true,
    }),
    'page-cursor': Flags.string({
      description: 'Cursor of the required page',
    }),
    'page-size': Flags.string({
      description: 'Maximum number of items in the page',
      default: '10',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/webhooks/{webhookId}/notifications/{notificationId}/attempts'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetNotificationAttempts)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['webhookId'] = String(flags['webhook-id'])
    pathParams['notificationId'] = String(flags['notification-id'])

    const queryParams: Record<string, string> = {}
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/webhooks/{webhookId}/notifications/{notificationId}/attempts',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
