import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetLegalEntityForAddress extends FireblocksBaseCommand {
  static summary = 'Look up legal entity by blockchain address'

  static description = 'Returns legal entity information for the given blockchain address (verification status, LEI, Travel Rule providers, contact email, and related fields — see response schema). URL-encode \`{address}\` when required.\n\nOperation ID: getLegalEntityForAddress\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/getLegalEntityForAddress'

  static enableJsonFlag = false

  static flags = {
    'address': Flags.string({
      description: 'Blockchain address to look up',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/address_registry/legal_entities/{address}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetLegalEntityForAddress)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['address'] = String(flags['address'])


    const result = await this.makeRequest(
      'GET',
      '/v1/address_registry/legal_entities/{address}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
