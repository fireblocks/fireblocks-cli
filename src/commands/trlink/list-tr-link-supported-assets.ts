import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class ListTRLinkSupportedAssets extends FireblocksBaseCommand {
  static summary = 'List supported assets'

  static description = 'Retrieves a paginated list of assets supported by the partner integration. Includes a flag indicating whether the partner can handle assets not explicitly listed. Supports cursor-based pagination.\n\nOperation ID: listTRLinkSupportedAssets\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/TRLink/listTRLinkSupportedAssets'

  static enableJsonFlag = false

  static flags = {
    'customer-integration-id': Flags.string({
      description: 'Customer integration unique identifier',
      required: true,
    }),
    'page-size': Flags.integer({
      description: 'Number of results per page (max 100)',
      default: 100,
    }),
    'page-cursor': Flags.string({
      description: 'Cursor for pagination (from previous response)',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/screening/trlink/customers/integration/{customerIntegrationId}/assets'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(ListTRLinkSupportedAssets)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['customerIntegrationId'] = String(flags['customer-integration-id'])

    const queryParams: Record<string, string> = {}
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/screening/trlink/customers/integration/{customerIntegrationId}/assets',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
