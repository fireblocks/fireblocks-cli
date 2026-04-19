import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetTRLinkVaspById extends FireblocksBaseCommand {
  static summary = 'Get VASP by ID'

  static description = 'Retrieves detailed information about a specific VASP by its unique identifier. Returns VASP details including public key if available.\n\nOperation ID: getTRLinkVaspById\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/TRLink/getTRLinkVaspById'

  static enableJsonFlag = false

  static flags = {
    'customer-integration-id': Flags.string({
      description: 'Customer integration unique identifier',
      required: true,
    }),
    'vasp-id': Flags.string({
      description: 'VASP unique identifier (DID format)',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/screening/trlink/customers/integration/{customerIntegrationId}/vasps/{vaspId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetTRLinkVaspById)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['customerIntegrationId'] = String(flags['customer-integration-id'])
    pathParams['vaspId'] = String(flags['vasp-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/screening/trlink/customers/integration/{customerIntegrationId}/vasps/{vaspId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
