import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class ListCounterpartyGroups extends FireblocksBaseCommand {
  static summary = 'List counterparty groups'

  static description = 'Returns a paginated list of counterparty groups.\n\n**Endpoint Permissions:** Admin, Non-Signing Admin, Viewer.\n\nOperation ID: listCounterpartyGroups\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/listCounterpartyGroups'

  static enableJsonFlag = false

  static flags = {
    'page-cursor': Flags.string({
      description: 'Cursor of the required page',
    }),
    'page-size': Flags.integer({
      description: 'Maximum number of items in the page',
      default: 50,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/counterparty_groups'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(ListCounterpartyGroups)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/counterparty_groups',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
