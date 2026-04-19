import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class DeleteContractTemplateById extends FireblocksBaseCommand {
  static summary = 'Delete a contract template by id'

  static description = 'Delete a contract by id. allowed only for private contract templates. Notice: it is irreversible!\n\nOperation ID: deleteContractTemplateById\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Contract%20Templates/deleteContractTemplateById'

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

  static method = 'DELETE'
  static path = '/v1/tokenization/templates/{contractTemplateId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(DeleteContractTemplateById)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['contractTemplateId'] = String(flags['contract-template-id'])


    await this.confirmOrAbort('DELETE', '/v1/tokenization/templates/{contractTemplateId}')

    const result = await this.makeRequest(
      'DELETE',
      '/v1/tokenization/templates/{contractTemplateId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
