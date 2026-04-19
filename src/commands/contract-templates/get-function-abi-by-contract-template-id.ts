import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetFunctionAbiByContractTemplateId extends FireblocksBaseCommand {
  static summary = 'Return contract template\'s function'

  static description = 'Return contract template\`s function ABI by signature\n\nOperation ID: getFunctionAbiByContractTemplateId\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Contract%20Templates/getFunctionAbiByContractTemplateId'

  static enableJsonFlag = false

  static flags = {
    'contract-template-id': Flags.string({
      description: 'The Contract Template identifier',
      required: true,
    }),
    'function-signature': Flags.string({
      description: 'The functionSignature parameter',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/tokenization/templates/{contractTemplateId}/function'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetFunctionAbiByContractTemplateId)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['contractTemplateId'] = String(flags['contract-template-id'])

    const queryParams: Record<string, string> = {}
    if (flags['function-signature'] !== undefined && flags['function-signature'] !== null) {
      queryParams['functionSignature'] = String(flags['function-signature'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/tokenization/templates/{contractTemplateId}/function',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
