import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class Get extends FireblocksBaseCommand {
  static summary = 'List all open Web3 connections.'

  static description = 'Get open Web3 connections.\n\nOperation ID: get\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Web3%20connections/get'

  static enableJsonFlag = false

  static flags = {
    'order': Flags.string({
      description: 'List order; ascending or descending.',
      default: 'ASC',
      options: ['ASC', 'DESC'],
    }),
    'filter': Flags.string({
      description: 'Parsed filter object',
    }),
    'sort': Flags.string({
      description: 'Property to sort Web3 connections by.',
      default: 'createdAt',
      options: ['id', 'userId', 'vaultAccountId', 'createdAt', 'feeLevel', 'appUrl', 'appName'],
    }),
    'page-size': Flags.string({
      description: 'Amount of results to return in the next page.',
      default: '10',
    }),
    'next': Flags.string({
      description: 'Cursor to the next page',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/connections'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(Get)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['order'] !== undefined && flags['order'] !== null) {
      queryParams['order'] = String(flags['order'])
    }
    if (flags['filter'] !== undefined && flags['filter'] !== null) {
      queryParams['filter'] = String(flags['filter'])
    }
    if (flags['sort'] !== undefined && flags['sort'] !== null) {
      queryParams['sort'] = String(flags['sort'])
    }
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }
    if (flags['next'] !== undefined && flags['next'] !== null) {
      queryParams['next'] = String(flags['next'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/connections',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
