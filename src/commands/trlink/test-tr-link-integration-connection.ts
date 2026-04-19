import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class TestTRLinkIntegrationConnection extends FireblocksBaseCommand {
  static summary = 'Test connection'

  static description = 'Tests the connection to a customer integration by validating stored credentials and attempting communication with the Travel Rule partner. Returns connection status and any error messages.\n\nOperation ID: testTRLinkIntegrationConnection\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/TRLink/testTRLinkIntegrationConnection'

  static enableJsonFlag = false

  static flags = {
    'customer-integration-id': Flags.string({
      description: 'Customer integration unique identifier',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/screening/trlink/customers/integration/{customerIntegrationId}/test_connection'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(TestTRLinkIntegrationConnection)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['customerIntegrationId'] = String(flags['customer-integration-id'])


    await this.confirmOrAbort('POST', '/v1/screening/trlink/customers/integration/{customerIntegrationId}/test_connection')

    const result = await this.makeRequest(
      'POST',
      '/v1/screening/trlink/customers/integration/{customerIntegrationId}/test_connection',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
