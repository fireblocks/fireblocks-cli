import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetVASPByDID extends FireblocksBaseCommand {
  static summary = 'Get VASP details'

  static description = 'Get VASP Details.\n\nReturns information about a VASP that has the specified DID.\n\nOperation ID: getVASPByDID\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Travel%20Rule/getVASPByDID'

  static enableJsonFlag = false

  static flags = {
    'did': Flags.string({
      description: 'The did parameter',
      required: true,
    }),
    'fields': Flags.string({
      description: 'A CSV of fields to return. Choose from the following options:',
    }),
  }

  static method = 'GET'
  static path = '/v1/screening/travel_rule/vasp/{did}'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetVASPByDID)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['did'] = String(flags['did'])

    const queryParams: Record<string, string> = {}
    if (flags['fields'] !== undefined && flags['fields'] !== null) {
      queryParams['fields'] = String(flags['fields'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/screening/travel_rule/vasp/{did}',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
