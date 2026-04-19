import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetTRLinkCustomerIntegrationById extends FireblocksBaseCommand {
  static summary = 'Get customer integration by ID'

  static description = 'Retrieves detailed information about a specific customer integration.\n\nOperation ID: getTRLinkCustomerIntegrationById\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/TRLink/getTRLinkCustomerIntegrationById'

  static enableJsonFlag = false

  static flags = {
    'customer-id': Flags.string({
      description: 'Customer unique identifier',
      required: true,
    }),
    'customer-integration-id': Flags.string({
      description: 'Customer integration unique identifier',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/screening/trlink/customers/{customerId}/integrations/{customerIntegrationId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetTRLinkCustomerIntegrationById)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['customerId'] = String(flags['customer-id'])
    pathParams['customerIntegrationId'] = String(flags['customer-integration-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/screening/trlink/customers/{customerId}/integrations/{customerIntegrationId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
