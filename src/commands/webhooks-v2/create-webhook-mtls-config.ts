import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateWebhookMtlsConfig extends FireblocksBaseCommand {
  static summary = 'Create an mTLS configuration'

  static description = 'Stores a certificate signed against the CSR from \`GET /v1/webhooks_settings/mtls_csr\` and returns its id, which is then set as \`webhookMtlsId\` on a webhook or on OAuth credentials. The private key the certificate was issued for is derived from the certificate, so it is never named by the caller.\n\nRe-uploading a certificate already stored returns the existing id rather than creating a second configuration, so several webhooks and OAuth credentials can share one certificate.\n\nA certificate that was not issued for a private key this workspace holds is rejected with a \`400\`.\n\n**Endpoint Permissions:** Owner, Admin, Non-Signing Admin.\n\nOperation ID: createWebhookMtlsConfig\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Webhooks%20V2/createWebhookMtlsConfig'

  static enableJsonFlag = false

  static flags = {
    data: Flags.string({
      description: 'JSON request body',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/webhooks_settings/mtls'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateWebhookMtlsConfig)

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



    await this.confirmOrAbort('POST', '/v1/webhooks_settings/mtls')

    const result = await this.makeRequest(
      'POST',
      '/v1/webhooks_settings/mtls',
      {
        body,
        headers,
      },
    )

    return result
  }
}
