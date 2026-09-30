import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetWebhookMtlsConfig extends FireblocksBaseCommand {
  static summary = 'Get an mTLS configuration by id'

  static description = 'Retrieve one stored mTLS configuration by its id.\n\nOperation ID: getWebhookMtlsConfig\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Webhooks%20V2/getWebhookMtlsConfig'

  static enableJsonFlag = false

  static flags = {
    'webhook-mtls-id': Flags.string({
      description: 'The unique identifier of the mTLS configuration',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/webhooks_settings/mtls/{webhookMtlsId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetWebhookMtlsConfig)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['webhookMtlsId'] = String(flags['webhook-mtls-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/webhooks_settings/mtls/{webhookMtlsId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
