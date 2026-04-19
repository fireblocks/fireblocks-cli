import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetTRLinkSupportedAsset extends FireblocksBaseCommand {
  static summary = 'Get supported asset by ID'

  static description = 'Retrieves detailed information about a specific asset by its Fireblocks asset ID. Returns the transformed Fireblocks asset data, raw partner response, and support status.\n\nOperation ID: getTRLinkSupportedAsset\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/TRLink/getTRLinkSupportedAsset'

  static enableJsonFlag = false

  static flags = {
    'customer-integration-id': Flags.string({
      description: 'Customer integration unique identifier',
      required: true,
    }),
    'asset-id': Flags.string({
      description: 'Fireblocks asset ID',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/screening/trlink/customers/integration/{customerIntegrationId}/assets/{assetId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetTRLinkSupportedAsset)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['customerIntegrationId'] = String(flags['customer-integration-id'])
    pathParams['assetId'] = String(flags['asset-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/screening/trlink/customers/integration/{customerIntegrationId}/assets/{assetId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
