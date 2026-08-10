import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetVASPByDID extends FireblocksBaseCommand {
  static summary = 'Get VASP details'

  static description = 'Get VASP Details.\n\nReturns information about a VASP that has the specified DID.\n\nThe response may contain fields that are not documented in the schema below. Clients must ignore unrecognised fields rather than failing to deserialize.\n\nOperation ID: getVASPByDID\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Travel%20Rule/getVASPByDID'

  static enableJsonFlag = false

  static flags = {
    'did': Flags.string({
      description: 'The Decentralized Identifier (DID) of the VASP.',
      required: true,
    }),
    'fields': Flags.string({
      description: 'The VASP fields to return.\n\nOptional. If omitted, or supplied with an empty value, the complete VASP record is returned, which is the same as passing \`all\`.\n\nMost field names return exactly the requested field. A few behave differently: \`documents\` and \`ddq\` return a small default set of identifying fields instead of the requested one, and \`travelRule_EMAIL\` returns an empty object. An unrecognised field name causes an error.',
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
