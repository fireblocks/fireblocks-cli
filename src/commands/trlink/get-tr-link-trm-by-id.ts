import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetTRLinkTrmById extends FireblocksBaseCommand {
  static summary = 'Get TRM by ID'

  static description = 'Retrieves a Travel Rule Message by its unique identifier from the partner provider. Returns full TRM details including status, IVMS101 data, and transaction information.\n\nOperation ID: getTRLinkTrmById\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/TRLink/getTRLinkTrmById'

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
  static path = '/v1/screening/trlink/customers/integration/{customerIntegrationId}/trm/{trmId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetTRLinkTrmById)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['customerIntegrationId'] = String(flags['customer-integration-id'])
    pathParams['trmId'] = String(flags['trm-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/screening/trlink/customers/integration/{customerIntegrationId}/trm/{trmId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
