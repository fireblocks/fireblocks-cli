import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetContracts extends FireblocksBaseCommand {
  static summary = 'List Whitelisted Contracts'

  static description = 'Gets a list of whitelisted contracts. Endpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nOperation ID: getContracts\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Contracts/getContracts'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/contracts'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetContracts)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/contracts',
      {
        headers,
      },
    )

    return result
  }
}
