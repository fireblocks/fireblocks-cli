import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetContract extends FireblocksBaseCommand {
  static summary = 'Find a Specific Whitelisted Contract'

  static description = 'Returns a whitelisted contract by Fireblocks Contract ID. Endpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: getContract\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Contracts/getContract'

  static enableJsonFlag = false

  static flags = {
    'contract-id': Flags.string({
      description: 'The ID of the contract to return',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/contracts/{contractId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetContract)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['contractId'] = String(flags['contract-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/contracts/{contractId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
