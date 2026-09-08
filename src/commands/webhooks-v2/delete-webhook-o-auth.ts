import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class DeleteWebhookOAuth extends FireblocksBaseCommand {
  static summary = 'Delete OAuth credentials'

  static description = 'Deletes an OAuth credential set. By default the delete is refused while the credentials are still in use: if any webhook references them, nothing is deleted and the request fails with \`409 Conflict\`, naming the reason and listing the ids of the referencing webhooks. This protects a shared credential set from being removed out from under the webhooks that depend on it, since several webhooks may reference the same one.\n\nPass \`forceDelete=true\` to delete anyway. That detaches every referencing webhook — it clears each webhook\'s \`webhookOauthId\`, it does **not** delete the webhook — then deletes the credential set and returns the deleted resource together with \`detachedWebhookIds\`. The detached webhooks keep delivering notifications, but without an \`Authorization\` header, so their endpoints will see unauthenticated deliveries from that point on.\n\nWhen nothing references the credentials the delete succeeds either way, and \`detachedWebhookIds\` comes back empty.\n\n**Endpoint Permissions:** Owner, Admin, Non-Signing Admin.\n\nOperation ID: deleteWebhookOAuth\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Webhooks%20V2/deleteWebhookOAuth'

  static enableJsonFlag = false

  static flags = {
    'webhook-oauth-id': Flags.string({
      description: 'The unique identifier of the OAuth credentials',
      required: true,
    }),
    'force-delete': Flags.boolean({
      description: 'Delete the credentials even while webhooks still reference them, detaching those webhooks instead of refusing. Leave it unset, or \`false\`, to get a \`409 Conflict\` whenever anything still references the credentials.',
      default: false,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'DELETE'
  static path = '/v1/webhooks_settings/oauth/{webhookOauthId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(DeleteWebhookOAuth)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['webhookOauthId'] = String(flags['webhook-oauth-id'])

    const queryParams: Record<string, string> = {}
    if (flags['force-delete'] !== undefined && flags['force-delete'] !== null) {
      queryParams['forceDelete'] = String(flags['force-delete'])
    }

    await this.confirmOrAbort('DELETE', '/v1/webhooks_settings/oauth/{webhookOauthId}')

    const result = await this.makeRequest(
      'DELETE',
      '/v1/webhooks_settings/oauth/{webhookOauthId}',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
