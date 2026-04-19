import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetTRLinkCustomerById extends FireblocksBaseCommand {
  static summary = 'Get customer by ID'

  static description = 'Retrieves detailed information about a specific customer by their unique identifier.\n\nOperation ID: getTRLinkCustomerById\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/TRLink/getTRLinkCustomerById'

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
  static path = '/v1/screening/trlink/customers/{customerId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetTRLinkCustomerById)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['customerId'] = String(flags['customer-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/screening/trlink/customers/{customerId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
