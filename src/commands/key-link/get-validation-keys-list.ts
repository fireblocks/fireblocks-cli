import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetValidationKeysList extends FireblocksBaseCommand {
  static summary = 'Get list of registered validation keys'

  static description = 'Returns the list of validation keys in the workspace\n\nOperation ID: getValidationKeysList\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Key%20Link/getValidationKeysList'

  static enableJsonFlag = false

  static flags = {
    'page-cursor': Flags.string({
      description: 'Cursor to the next page',
    }),
    'page-size': Flags.string({
      description: 'Amount of results to return in the next page',
      default: '10',
    }),
    'sort-by': Flags.string({
      description: 'Field(s) to use for sorting',
      default: 'createdAt',
      options: ['createdAt'],
    }),
    'order': Flags.string({
      description: 'Is the order ascending or descending',
      default: 'ASC',
      options: ['ASC', 'DESC'],
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/key_link/validation_keys'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetValidationKeysList)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }
    if (flags['sort-by'] !== undefined && flags['sort-by'] !== null) {
      queryParams['sortBy'] = String(flags['sort-by'])
    }
    if (flags['order'] !== undefined && flags['order'] !== null) {
      queryParams['order'] = String(flags['order'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/key_link/validation_keys',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
