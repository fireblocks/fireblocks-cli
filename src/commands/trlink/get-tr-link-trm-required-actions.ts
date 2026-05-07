import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetTRLinkTrmRequiredActions extends FireblocksBaseCommand {
  static summary = 'Get required actions for a TRM'

  static description = 'Retrieves the list of required actions (e.g., PII fields) needed to process the Travel Rule Message.\n\nOperation ID: getTRLinkTrmRequiredActions\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/TRLink/getTRLinkTrmRequiredActions'

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
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/screening/trlink/customers/integration/{customerIntegrationId}/trm/{trmId}/required_actions'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetTRLinkTrmRequiredActions)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['customerIntegrationId'] = String(flags['customer-integration-id'])
    pathParams['trmId'] = String(flags['trm-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/screening/trlink/customers/integration/{customerIntegrationId}/trm/{trmId}/required_actions',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
