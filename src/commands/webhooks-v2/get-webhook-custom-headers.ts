import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetWebhookCustomHeaders extends FireblocksBaseCommand {
  static summary = 'Get a custom headers set by id'

  static description = 'Retrieve a custom headers set by its id. Header values are never returned, only the header names.\n\nOperation ID: getWebhookCustomHeaders\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Webhooks%20V2/getWebhookCustomHeaders'

  static enableJsonFlag = false

  static flags = {
    'webhook-custom-headers-id': Flags.string({
      description: 'The unique identifier of the custom headers set',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/webhooks_settings/custom_headers/{webhookCustomHeadersId}'
  static operationId = 'getWebhookCustomHeaders'
  static isEa = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetWebhookCustomHeaders)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['webhookCustomHeadersId'] = String(flags['webhook-custom-headers-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/webhooks_settings/custom_headers/{webhookCustomHeadersId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
