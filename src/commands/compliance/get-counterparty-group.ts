import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetCounterpartyGroup extends FireblocksBaseCommand {
  static summary = 'Get a counterparty group'

  static description = 'Returns the details of a specific counterparty group.\n\n**Endpoint Permissions:** Admin, Non-Signing Admin, Viewer.\n\nOperation ID: getCounterpartyGroup\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/getCounterpartyGroup'

  static enableJsonFlag = false

  static flags = {
    'group-id': Flags.string({
      description: 'The unique identifier of the counterparty group',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/counterparty_groups/{groupId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetCounterpartyGroup)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['groupId'] = String(flags['group-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/counterparty_groups/{groupId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
