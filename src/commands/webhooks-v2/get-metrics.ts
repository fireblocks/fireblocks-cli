import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetMetrics extends FireblocksBaseCommand {
  static summary = 'Get webhook metrics'

  static description = 'Get webhook metrics by webhook id and metric name\n\nOperation ID: getMetrics\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Webhooks%20V2/getMetrics'

  static enableJsonFlag = false

  static flags = {
    'webhook-id': Flags.string({
      description: 'The webhookId parameter',
      required: true,
    }),
    'metric-name': Flags.string({
      description: 'Name of the metric to retrieve',
      required: true,
      options: ['LAST_ACTIVE_HOUR_ERROR_RATE'],
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/webhooks/{webhookId}/metrics/{metricName}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetMetrics)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['webhookId'] = String(flags['webhook-id'])
    pathParams['metricName'] = String(flags['metric-name'])


    const result = await this.makeRequest(
      'GET',
      '/v1/webhooks/{webhookId}/metrics/{metricName}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
