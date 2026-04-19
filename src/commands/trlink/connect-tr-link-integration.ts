import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class ConnectTRLinkIntegration extends FireblocksBaseCommand {
  static summary = 'Connect customer integration'

  static description = 'Connects a customer integration by providing API credentials. Stores encrypted credentials and enables the integration for use.\n\nOperation ID: connectTRLinkIntegration\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/TRLink/connectTRLinkIntegration'

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

  static method = 'PUT'
  static path = '/v1/screening/trlink/customers/integration/{customerIntegrationId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(ConnectTRLinkIntegration)

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


    await this.confirmOrAbort('PUT', '/v1/screening/trlink/customers/integration/{customerIntegrationId}')

    const result = await this.makeRequest(
      'PUT',
      '/v1/screening/trlink/customers/integration/{customerIntegrationId}',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
