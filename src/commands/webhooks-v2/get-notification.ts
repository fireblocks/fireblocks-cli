import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetNotification extends FireblocksBaseCommand {
  static summary = 'Get notification by id'

  static description = 'Get notification by id\n\nOperation ID: getNotification\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Webhooks%20V2/getNotification'

  static enableJsonFlag = false

  static flags = {
    'include-data': Flags.boolean({
      description: 'Include the data of the notification',
    }),
    'webhook-id': Flags.string({
      description: 'The ID of the webhook to fetch',
      required: true,
    }),
    'notification-id': Flags.string({
      description: 'The ID of the notification to fetch',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/webhooks/{webhookId}/notifications/{notificationId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetNotification)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['webhookId'] = String(flags['webhook-id'])
    pathParams['notificationId'] = String(flags['notification-id'])

    const queryParams: Record<string, string> = {}
    if (flags['include-data'] !== undefined && flags['include-data'] !== null) {
      queryParams['includeData'] = String(flags['include-data'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/webhooks/{webhookId}/notifications/{notificationId}',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
