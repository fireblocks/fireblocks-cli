import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class UpdateWebhook extends FireblocksBaseCommand {
  static summary = 'Update webhook'

  static description = 'Update a webhook by its id\n\nEndpoint Permission: Owner, Admin, Non-Signing Admin.\n\nOperation ID: updateWebhook\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Webhooks%20V2/updateWebhook'

  static enableJsonFlag = false

  static flags = {
    'webhook-id': Flags.string({
      description: 'The unique identifier of the webhook',
      required: true,
    }),
    data: Flags.string({
      description: 'JSON request body',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'PATCH'
  static path = '/v1/webhooks/{webhookId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(UpdateWebhook)

    let body: Record<string, unknown> | undefined
    if (flags.data) {
      try {
        const parsed = JSON.parse(flags.data)
        if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
          this.error('--data must be a JSON object (e.g., \'{"key": "value"}\')')
        }
        body = parsed as Record<string, unknown>
      } catch {
        this.error('Invalid JSON in --data flag. Ensure the value is valid JSON.')
      }
    }

    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['webhookId'] = String(flags['webhook-id'])


    await this.confirmOrAbort('PATCH', '/v1/webhooks/{webhookId}')

    const result = await this.makeRequest(
      'PATCH',
      '/v1/webhooks/{webhookId}',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
