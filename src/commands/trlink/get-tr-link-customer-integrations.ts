import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetTRLinkCustomerIntegrations extends FireblocksBaseCommand {
  static summary = 'Get customer integrations'

  static description = 'Retrieves all TRSupport integrations for a specific customer. Returns a list of partner integrations configured for Travel Rule compliance.\n\nOperation ID: getTRLinkCustomerIntegrations\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/TRLink/getTRLinkCustomerIntegrations'

  static enableJsonFlag = false

  static flags = {
    'customer-id': Flags.string({
      description: 'Customer unique identifier',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/screening/trlink/customers/{customerId}/integrations'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetTRLinkCustomerIntegrations)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['customerId'] = String(flags['customer-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/screening/trlink/customers/{customerId}/integrations',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
