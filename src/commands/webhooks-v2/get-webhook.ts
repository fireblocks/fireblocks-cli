import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetWebhook extends FireblocksBaseCommand {
  static summary = 'Get webhook by id'

  static description = 'Retrieve a webhook by its id\n\nOperation ID: getWebhook\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Webhooks%20V2/getWebhook'

  static enableJsonFlag = false

  static flags = {
    'webhook-id': Flags.string({
      description: 'The unique identifier of the webhook',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/webhooks/{webhookId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetWebhook)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['webhookId'] = String(flags['webhook-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/webhooks/{webhookId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
