import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetTRLinkIntegrationPublicKey extends FireblocksBaseCommand {
  static summary = 'Get public key for PII encryption'

  static description = 'Retrieves the partner\'s public key in JWK format for encrypting PII data in Travel Rule Messages. Use this key to encrypt sensitive originator and beneficiary information before sending Travel Rule messages.\n\nOperation ID: getTRLinkIntegrationPublicKey\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/TRLink/getTRLinkIntegrationPublicKey'

  static enableJsonFlag = false

  static flags = {
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
  static path = '/v1/screening/trlink/customers/integration/{customerIntegrationId}/public_key'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetTRLinkIntegrationPublicKey)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['customerIntegrationId'] = String(flags['customer-integration-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/screening/trlink/customers/integration/{customerIntegrationId}/public_key',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
