import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateTRLinkTrm extends FireblocksBaseCommand {
  static summary = 'Create Travel Rule Message'

  static description = 'Creates a new travel rule message with IVMS101-compliant PII data. Encrypts sensitive originator and beneficiary information before sending to partner.\n\nOperation ID: createTRLinkTrm\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/TRLink/createTRLinkTrm'

  static enableJsonFlag = false

  static flags = {
    'customer-integration-id': Flags.string({
      description: 'Customer integration unique identifier',
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
  static path = '/v1/screening/trlink/customers/integration/{customerIntegrationId}/trm'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateTRLinkTrm)

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


    await this.confirmOrAbort('POST', '/v1/screening/trlink/customers/integration/{customerIntegrationId}/trm')

    const result = await this.makeRequest(
      'POST',
      '/v1/screening/trlink/customers/integration/{customerIntegrationId}/trm',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
