import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetWebhookCustomHeadersList extends FireblocksBaseCommand {
  static summary = 'Get all custom headers sets'

  static description = 'Lists every custom headers set for the workspace. Header values are never returned, only the header names.\n\nOperation ID: getWebhookCustomHeadersList\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Webhooks%20V2/getWebhookCustomHeadersList'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/webhooks_settings/custom_headers'
  static operationId = 'getWebhookCustomHeadersList'
  static isEa = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetWebhookCustomHeadersList)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/webhooks_settings/custom_headers',
      {
        headers,
      },
    )

    return result
  }
}
