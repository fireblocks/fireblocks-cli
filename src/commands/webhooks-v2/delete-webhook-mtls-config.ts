import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class DeleteWebhookMtlsConfig extends FireblocksBaseCommand {
  static summary = 'Delete an mTLS configuration'

  static description = 'Deletes an mTLS configuration. By default the delete is refused while the configuration is still in use: if any webhook or OAuth credentials reference it, nothing is deleted and the request fails with \`409 Conflict\`, naming the reason and listing the ids of what references it. This protects a shared configuration from being removed out from under the webhooks and token requests that depend on it.\n\nPass \`forceDelete=true\` to delete anyway. That detaches everything referencing it — it clears \`webhookMtlsId\` on each webhook and OAuth credentials, it does **not** delete them — then deletes the configuration and returns the deleted resource together with \`detachedWebhookIds\` and \`detachedWebhookOauthIds\`. Detached webhooks keep delivering notifications, and detached OAuth credentials keep requesting tokens, but without a client certificate, so an endpoint that requires mTLS will reject them from that point on.\n\nWhen nothing references the configuration the delete succeeds either way, and both lists come back empty.\n\n**Endpoint Permissions:** Owner, Admin, Non-Signing Admin.\n\nOperation ID: deleteWebhookMtlsConfig\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Webhooks%20V2/deleteWebhookMtlsConfig'

  static enableJsonFlag = false

  static flags = {
    'webhook-mtls-id': Flags.string({
      description: 'The unique identifier of the mTLS configuration',
      required: true,
    }),
    'force-delete': Flags.boolean({
      description: 'Delete the configuration even while webhooks or OAuth credentials still reference it, detaching them instead of refusing; their ids are returned in \`detachedWebhookIds\` and \`detachedWebhookOauthIds\`. Leave it unset, or \`false\`, to get a \`409 Conflict\` whenever anything still references the configuration.',
      default: false,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'DELETE'
  static path = '/v1/webhooks_settings/mtls/{webhookMtlsId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(DeleteWebhookMtlsConfig)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['webhookMtlsId'] = String(flags['webhook-mtls-id'])

    const queryParams: Record<string, string> = {}
    if (flags['force-delete'] !== undefined && flags['force-delete'] !== null) {
      queryParams['forceDelete'] = String(flags['force-delete'])
    }

    await this.confirmOrAbort('DELETE', '/v1/webhooks_settings/mtls/{webhookMtlsId}')

    const result = await this.makeRequest(
      'DELETE',
      '/v1/webhooks_settings/mtls/{webhookMtlsId}',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
