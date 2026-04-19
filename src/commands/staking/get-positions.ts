import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetPositions extends FireblocksBaseCommand {
  static summary = 'List staking positions (Paginated)'

  static description = 'Returns staking positions with core details: amounts, rewards, status, chain, and vault. It supports cursor-based pagination for efficient data retrieval. This endpoint always returns a paginated response with {data, next} structure.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: getPositions\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Staking/getPositions'

  static enableJsonFlag = false

  static flags = {
    'chain-descriptor': Flags.string({
      description: 'Protocol identifier to filter positions (e.g., ATOM_COS/AXL/CELESTIA}). If omitted, positions across all supported chains are returned.',
    }),
    'vault-account-id': Flags.string({
      description: 'Filter positions by Fireblocks vault account ID. If omitted, positions across all vault accounts are returned.',
    }),
    'page-size': Flags.integer({
      description: 'Number of results per page. When provided, the response returns a paginated object with {data, next}. If omitted, all results are returned as an array.',
      required: true,
      default: 10,
    }),
    'page-cursor': Flags.string({
      description: 'Cursor for the next page of results. Use the value from the \'next\' field in the previous response.',
    }),
    'order': Flags.string({
      description: 'ASC / DESC ordering (default DESC)',
      default: 'DESC',
      options: ['ASC', 'DESC'],
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/staking/positions_paginated'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetPositions)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['chain-descriptor'] !== undefined && flags['chain-descriptor'] !== null) {
      queryParams['chainDescriptor'] = String(flags['chain-descriptor'])
    }
    if (flags['vault-account-id'] !== undefined && flags['vault-account-id'] !== null) {
      queryParams['vaultAccountId'] = String(flags['vault-account-id'])
    }
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }
    if (flags['order'] !== undefined && flags['order'] !== null) {
      queryParams['order'] = String(flags['order'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/staking/positions_paginated',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
