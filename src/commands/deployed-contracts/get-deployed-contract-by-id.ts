import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetDeployedContractById extends FireblocksBaseCommand {
  static summary = 'Return deployed contract data by id'

  static description = 'Return deployed contract data by id\n\nOperation ID: getDeployedContractById\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Deployed%20Contracts/getDeployedContractById'

  static enableJsonFlag = false

  static flags = {
    'id': Flags.string({
      description: 'The deployed contract data identifier',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/tokenization/contracts/{id}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetDeployedContractById)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['id'] = String(flags['id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/tokenization/contracts/{id}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
