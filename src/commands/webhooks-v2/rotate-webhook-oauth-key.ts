import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class RotateWebhookOauthKey extends FireblocksBaseCommand {
  static summary = 'Rotate the signing key of OAuth credentials'

  static description = 'Switches the OAuth credentials to their successor key and generates a new successor, for credentials using \`private_key_jwt\`. Takes no body. The new signing key is one your authorization server already holds, since the successor is published from the start, so the switch causes no outage.\n\nThe key replaced is no longer used to sign, but stays in the published set for 30 days and is then deleted. Rotating again within those 30 days is allowed: each key rotated out keeps its own 30 days, and any of them can be revoked by \`kid\`. The credentials can hold at most 5 keys in their signing algorithm at once, counting the active key, its successor and those rotated out; at that limit, revoke a rotated-out key (the error names the oldest) and rotate again. To stop trusting a key at once — after a leak — use \`revoke_key\` instead.\n\nReturns the \`kid\` of the key rotated out. The public keys are at the \`jwksUri\` of the credentials: fetch them again, or register the new successor with your authorization server, before the next rotation.\n\n**Endpoint Permissions:** Owner, Admin, Non-Signing Admin.\n\nOperation ID: rotateWebhookOauthKey\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Webhooks%20V2/rotateWebhookOauthKey'

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

  static method = 'POST'
  static path = '/v1/webhooks_settings/oauth/{webhookOauthId}/rotate_key'
  static operationId = 'rotateWebhookOauthKey'
  static isEa = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(RotateWebhookOauthKey)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['webhookOauthId'] = String(flags['webhook-oauth-id'])


    await this.confirmOrAbort('POST', '/v1/webhooks_settings/oauth/{webhookOauthId}/rotate_key')

    const result = await this.makeRequest(
      'POST',
      '/v1/webhooks_settings/oauth/{webhookOauthId}/rotate_key',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
