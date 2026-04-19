import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class DeleteTRLinkCustomer extends FireblocksBaseCommand {
  static summary = 'Delete customer'

  static description = 'Deletes a customer and all associated integrations. This action cannot be undone.\n\nOperation ID: deleteTRLinkCustomer\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/TRLink/deleteTRLinkCustomer'

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

  static method = 'DELETE'
  static path = '/v1/screening/trlink/customers/{customerId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(DeleteTRLinkCustomer)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['customerId'] = String(flags['customer-id'])


    await this.confirmOrAbort('DELETE', '/v1/screening/trlink/customers/{customerId}')

    const result = await this.makeRequest(
      'DELETE',
      '/v1/screening/trlink/customers/{customerId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
