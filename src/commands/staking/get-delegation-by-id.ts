import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetDelegationById extends FireblocksBaseCommand {
  static summary = 'Get position details'

  static description = 'Returns full details for a single staking position: amounts, rewards, status, chain, and vault.\n\nOperation ID: getDelegationById\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Staking/getDelegationById'

  static enableJsonFlag = false

  static flags = {
    'id': Flags.string({
      description: 'Unique identifier of the staking position.',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/staking/positions/{id}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetDelegationById)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['id'] = String(flags['id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/staking/positions/{id}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
