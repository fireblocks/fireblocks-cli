import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class DeleteWebhookCustomHeaders extends FireblocksBaseCommand {
  static summary = 'Delete a custom headers set'

  static description = 'Deletes a custom headers set. By default the delete is refused while the set is still in use: if any webhook or OAuth credentials use it, nothing is deleted and the request fails with \`409 Conflict\`, naming the reason and listing the ids of the webhooks and OAuth credentials using it. This protects a shared set from being removed out from under the things that depend on it.\n\nPass \`forceDelete=true\` to delete anyway. That detaches everything using the set — it clears each webhook\'s and each OAuth credential set\'s \`webhookCustomHeadersId\`, it does **not** delete the webhook or the credentials — then deletes the set and returns the deleted resource together with \`detachedWebhookIds\` and \`detachedWebhookOauthIds\`. A detached webhook stops sending these headers with its notifications, and detached OAuth credentials stop sending them on the token request.\n\nWhen nothing uses the set the delete succeeds either way, and both lists come back empty.\n\n**Endpoint Permissions:** Owner, Admin, Non-Signing Admin.\n\nOperation ID: deleteWebhookCustomHeaders\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Webhooks%20V2/deleteWebhookCustomHeaders'

  static enableJsonFlag = false

  static flags = {
    'webhook-custom-headers-id': Flags.string({
      description: 'The unique identifier of the custom headers set',
      required: true,
    }),
    'force-delete': Flags.boolean({
      description: 'Delete the set even while webhooks or OAuth credentials still use it, detaching them instead of refusing. Leave it unset, or \`false\`, to get a \`409 Conflict\` whenever anything still uses the set.',
      default: false,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'DELETE'
  static path = '/v1/webhooks_settings/custom_headers/{webhookCustomHeadersId}'
  static operationId = 'deleteWebhookCustomHeaders'
  static isEa = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(DeleteWebhookCustomHeaders)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['webhookCustomHeadersId'] = String(flags['webhook-custom-headers-id'])

    const queryParams: Record<string, string> = {}
    if (flags['force-delete'] !== undefined && flags['force-delete'] !== null) {
      queryParams['forceDelete'] = String(flags['force-delete'])
    }

    await this.confirmOrAbort('DELETE', '/v1/webhooks_settings/custom_headers/{webhookCustomHeadersId}')

    const result = await this.makeRequest(
      'DELETE',
      '/v1/webhooks_settings/custom_headers/{webhookCustomHeadersId}',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
