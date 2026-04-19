import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetContractTemplateById extends FireblocksBaseCommand {
  static summary = 'Return contract template by id'

  static description = 'Return detailed information about the contract template\n\nOperation ID: getContractTemplateById\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Contract%20Templates/getContractTemplateById'

  static enableJsonFlag = false

  static flags = {
    'contract-template-id': Flags.string({
      description: 'The Contract Template identifier',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/tokenization/templates/{contractTemplateId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetContractTemplateById)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['contractTemplateId'] = String(flags['contract-template-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/tokenization/templates/{contractTemplateId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
