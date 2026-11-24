import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class RevokeWebhookOauthKey extends FireblocksBaseCommand {
  static summary = 'Revoke a signing key of OAuth credentials'

  static description = 'Deletes a key of OAuth credentials at once, for when a key may have leaked: it drops out of the published set immediately rather than being kept for 30 days. Revoking never causes an outage.\n\nWithout a \`kid\`, revokes the key Fireblocks is signing with: signing switches to the successor, which your authorization server already holds, and a new successor is generated. A cached access token is discarded, so the next delivery fetches a new one.\n\nWith the successor\'s \`kid\`, deletes the successor and generates a new one; signing is unchanged. With the \`kid\` of a key rotated out by \`rotate_key\` and still published, deletes that key, and a cached access token is discarded as well. Keys left behind by a \`signingAlg\` change drop out of the published set after 5 minutes but are kept for 30 days, and can be revoked by \`kid\` until then. Credentials using \`private_key_jwt\` always keep a key to sign with.\n\nOn credentials that no longer use \`private_key_jwt\`, whose keys stay published for 30 days after the switch, a \`kid\` is required: that key is deleted and nothing is generated. The last key they hold can be revoked too, leaving an empty set.\n\nReturns the \`kid\` of the key revoked, which without a \`kid\` in the request is the key Fireblocks was signing with. The public keys are at the \`jwksUri\` of the credentials: fetch them again, or register the new successor with your authorization server. Use \`rotate_key\` for a routine rotation, which keeps the replaced key published for 30 days.\n\n**Endpoint Permissions:** Owner, Admin, Non-Signing Admin.\n\nOperation ID: revokeWebhookOauthKey\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Webhooks%20V2/revokeWebhookOauthKey'

  static enableJsonFlag = false

  static flags = {
    'webhook-oauth-id': Flags.string({
      description: 'The unique identifier of the OAuth credentials',
      required: true,
    }),
    data: Flags.string({
      description: 'JSON request body',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/webhooks_settings/oauth/{webhookOauthId}/revoke_key'
  static operationId = 'revokeWebhookOauthKey'
  static isEa = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(RevokeWebhookOauthKey)

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
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['webhookOauthId'] = String(flags['webhook-oauth-id'])


    await this.confirmOrAbort('POST', '/v1/webhooks_settings/oauth/{webhookOauthId}/revoke_key')

    const result = await this.makeRequest(
      'POST',
      '/v1/webhooks_settings/oauth/{webhookOauthId}/revoke_key',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
