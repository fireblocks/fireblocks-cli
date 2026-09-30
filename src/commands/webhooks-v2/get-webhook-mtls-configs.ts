import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetWebhookMtlsConfigs extends FireblocksBaseCommand {
  static summary = 'List the uploaded mTLS configurations'

  static description = 'Lists the workspace\'s mTLS configurations, newest first. Pass \`ids\` to ask about\nparticular ones instead — useful for resolving the \`webhookMtlsId\` values on a set of\nwebhooks in one call.\n\nOperation ID: getWebhookMtlsConfigs\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Webhooks%20V2/getWebhookMtlsConfigs'

  static enableJsonFlag = false

  static flags = {
    'ids': Flags.string({
      description: 'Return only the configurations with these ids, instead of all of them. Repeat the parameter for each id. An id belonging to another workspace, or to nothing, is left out of the response rather than failing the request.',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/webhooks_settings/mtls'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetWebhookMtlsConfigs)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['ids'] !== undefined && flags['ids'] !== null) {
      queryParams['ids'] = String(flags['ids'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/webhooks_settings/mtls',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
