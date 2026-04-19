import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetBlockchain extends FireblocksBaseCommand {
  static summary = 'Get a Blockchain by ID'

  static description = 'Returns a blockchain by ID or legacyID.\n\nOperation ID: getBlockchain\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Blockchains%20%26%20assets/getBlockchain'

  static enableJsonFlag = false

  static flags = {
    'id': Flags.string({
      description: 'The ID or legacyId of the blockchain',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/blockchains/{id}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetBlockchain)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['id'] = String(flags['id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/blockchains/{id}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
