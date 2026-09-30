import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class UpdateWebhookMtlsConfig extends FireblocksBaseCommand {
  static summary = 'Update an mTLS configuration'

  static description = 'Renames a configuration, replaces its certificate, or both. Only the fields present in the request are changed; anything omitted is left as it is, and a request with neither field is rejected with a \`400\`.\n\nReplacing \`signedCert\` switches every webhook and OAuth credentials set using this configuration over to the new certificate in one write, and the private key it was issued for is re-derived from the certificate. A replacement that was not issued for a private key this workspace holds is rejected with a \`400\`.\n\nSending \`name: null\` removes the label.\n\n**Endpoint Permissions:** Owner, Admin, Non-Signing Admin.\n\nOperation ID: updateWebhookMtlsConfig\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Webhooks%20V2/updateWebhookMtlsConfig'

  static enableJsonFlag = false

  static flags = {
    'webhook-mtls-id': Flags.string({
      description: 'The unique identifier of the mTLS configuration',
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
  static path = '/v1/webhooks_settings/mtls/{webhookMtlsId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(UpdateWebhookMtlsConfig)

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
    pathParams['webhookMtlsId'] = String(flags['webhook-mtls-id'])


    await this.confirmOrAbort('PATCH', '/v1/webhooks_settings/mtls/{webhookMtlsId}')

    const result = await this.makeRequest(
      'PATCH',
      '/v1/webhooks_settings/mtls/{webhookMtlsId}',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
