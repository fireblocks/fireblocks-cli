import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetBulkSigningKeysJobs extends FireblocksBaseCommand {
  static summary = 'Get bulk registration jobs'

  static description = 'Returns the workspace\'s bulk registration jobs, newest first, a page at a time.\n\nOperation ID: getBulkSigningKeysJobs\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Key%20Link/getBulkSigningKeysJobs'

  static enableJsonFlag = false

  static flags = {
    'page-cursor': Flags.string({
      description: 'Cursor to the next page',
    }),
    'page-size': Flags.integer({
      description: 'Amount of results to return in the next page',
      default: 10,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/key_link/signing_keys/bulk/jobs'
  static operationId = 'getBulkSigningKeysJobs'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetBulkSigningKeysJobs)


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
      '/v1/key_link/signing_keys/bulk/jobs',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
