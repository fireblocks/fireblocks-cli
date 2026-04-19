import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetConstructorByContractTemplateId extends FireblocksBaseCommand {
  static summary = 'Return contract template\'s constructor'

  static description = 'Return contract template\'s constructor ABI\n\nOperation ID: getConstructorByContractTemplateId\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Contract%20Templates/getConstructorByContractTemplateId'

  static enableJsonFlag = false

  static flags = {
    'contract-template-id': Flags.string({
      description: 'The Contract Template identifier',
      required: true,
    }),
    'with-docs': Flags.boolean({
      description: 'true if you want to get the abi with its docs',
      default: false,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/tokenization/templates/{contractTemplateId}/constructor'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetConstructorByContractTemplateId)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['contractTemplateId'] = String(flags['contract-template-id'])

    const queryParams: Record<string, string> = {}
    if (flags['with-docs'] !== undefined && flags['with-docs'] !== null) {
      queryParams['withDocs'] = String(flags['with-docs'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/tokenization/templates/{contractTemplateId}/constructor',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
