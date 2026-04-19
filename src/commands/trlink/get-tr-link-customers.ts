import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetTRLinkCustomers extends FireblocksBaseCommand {
  static summary = 'Get all customers'

  static description = 'Retrieves all customers associated with the authenticated tenant. Returns a list of legal entities configured for Travel Rule compliance.\n\nOperation ID: getTRLinkCustomers\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/TRLink/getTRLinkCustomers'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/screening/trlink/customers'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetTRLinkCustomers)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/screening/trlink/customers',
      {
        headers,
      },
    )

    return result
  }
}
