import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetWebhookOAuths extends FireblocksBaseCommand {
  static summary = 'Get all OAuth credentials'

  static description = 'Lists every OAuth credential set for the workspace. Client secrets are never returned.\n\nOperation ID: getWebhookOAuths\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Webhooks%20V2/getWebhookOAuths'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/webhooks_settings/oauth'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetWebhookOAuths)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/webhooks_settings/oauth',
      {
        headers,
      },
    )

    return result
  }
}
