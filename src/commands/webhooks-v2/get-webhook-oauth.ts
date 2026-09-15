import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetWebhookOauth extends FireblocksBaseCommand {
  static summary = 'Get OAuth credentials by id'

  static description = 'Retrieve an OAuth credential set by its id. The client secret is never returned.\n\nOperation ID: getWebhookOauth\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Webhooks%20V2/getWebhookOauth'

  static enableJsonFlag = false

  static flags = {
    'webhook-oauth-id': Flags.string({
      description: 'The unique identifier of the OAuth credentials',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/webhooks_settings/oauth/{webhookOauthId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetWebhookOauth)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['webhookOauthId'] = String(flags['webhook-oauth-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/webhooks_settings/oauth/{webhookOauthId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
