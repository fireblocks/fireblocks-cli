import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetNotifications extends FireblocksBaseCommand {
  static summary = 'Get all notifications by webhook id'

  static description = 'Get all notifications by webhook id (paginated)\n\nOperation ID: getNotifications\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Webhooks%20V2/getNotifications'

  static enableJsonFlag = false

  static flags = {
    'webhook-id': Flags.string({
      description: 'The webhookId parameter',
      required: true,
    }),
    'order': Flags.string({
      description: 'ASC / DESC ordering (default DESC)',
      default: 'DESC',
      options: ['ASC', 'DESC'],
    }),
    'sort-by': Flags.string({
      description: 'Sort by field',
      default: 'updatedAt',
      options: ['id', 'createdAt', 'updatedAt', 'status', 'eventType', 'resourceId'],
    }),
    'page-cursor': Flags.string({
      description: 'Cursor of the required page',
    }),
    'page-size': Flags.string({
      description: 'Maximum number of items in the page',
      default: '100',
    }),
    'start-time': Flags.string({
      description: 'Start time in milliseconds since epoch to filter by notifications created after this time (default 31 days ago)',
    }),
    'end-time': Flags.string({
      description: 'End time in milliseconds since epoch to filter by notifications created before this time (default current time)',
    }),
    'statuses': Flags.string({
      description: 'List of notification statuses to filter by',
    }),
    'events': Flags.string({
      description: 'List of webhook event types to filter by',
    }),
    'resource-id': Flags.string({
      description: 'Resource ID to filter by',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/webhooks/{webhookId}/notifications'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetNotifications)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['webhookId'] = String(flags['webhook-id'])

    const queryParams: Record<string, string> = {}
    if (flags['order'] !== undefined && flags['order'] !== null) {
      queryParams['order'] = String(flags['order'])
    }
    if (flags['sort-by'] !== undefined && flags['sort-by'] !== null) {
      queryParams['sortBy'] = String(flags['sort-by'])
    }
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }
    if (flags['start-time'] !== undefined && flags['start-time'] !== null) {
      queryParams['startTime'] = String(flags['start-time'])
    }
    if (flags['end-time'] !== undefined && flags['end-time'] !== null) {
      queryParams['endTime'] = String(flags['end-time'])
    }
    if (flags['statuses'] !== undefined && flags['statuses'] !== null) {
      queryParams['statuses'] = String(flags['statuses'])
    }
    if (flags['events'] !== undefined && flags['events'] !== null) {
      queryParams['events'] = String(flags['events'])
    }
    if (flags['resource-id'] !== undefined && flags['resource-id'] !== null) {
      queryParams['resourceId'] = String(flags['resource-id'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/webhooks/{webhookId}/notifications',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
