import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class DeleteWebhook extends FireblocksBaseCommand {
  static summary = 'Delete webhook'

  static description = 'Delete a webhook by its id\n\nEndpoint Permission: Owner, Admin, Non-Signing Admin.\n\nOperation ID: deleteWebhook\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Webhooks%20V2/deleteWebhook'

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

  static method = 'DELETE'
  static path = '/v1/webhooks/{webhookId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(DeleteWebhook)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['webhookId'] = String(flags['webhook-id'])


    await this.confirmOrAbort('DELETE', '/v1/webhooks/{webhookId}')

    const result = await this.makeRequest(
      'DELETE',
      '/v1/webhooks/{webhookId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
