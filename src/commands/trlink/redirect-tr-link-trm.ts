import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class RedirectTRLinkTrm extends FireblocksBaseCommand {
  static summary = 'Redirect Travel Rule Message'

  static description = 'Redirects a Travel Rule Message to a subsidiary VASP. This operation requires the partner to support nested VASPs functionality.\n\nOperation ID: redirectTRLinkTrm\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/TRLink/redirectTRLinkTrm'

  static enableJsonFlag = false

  static flags = {
    'customer-integration-id': Flags.string({
      description: 'Customer integration unique identifier',
      required: true,
    }),
    'trm-id': Flags.string({
      description: 'Travel Rule Message unique identifier',
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

  static method = 'POST'
  static path = '/v1/screening/trlink/customers/integration/{customerIntegrationId}/trm/{trmId}/redirect'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(RedirectTRLinkTrm)

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
    pathParams['customerIntegrationId'] = String(flags['customer-integration-id'])
    pathParams['trmId'] = String(flags['trm-id'])


    await this.confirmOrAbort('POST', '/v1/screening/trlink/customers/integration/{customerIntegrationId}/trm/{trmId}/redirect')

    const result = await this.makeRequest(
      'POST',
      '/v1/screening/trlink/customers/integration/{customerIntegrationId}/trm/{trmId}/redirect',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
