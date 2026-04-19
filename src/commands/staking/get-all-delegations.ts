import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetAllDelegations extends FireblocksBaseCommand {
  static summary = 'List staking positions'

  static description = 'Returns all staking positions with core details: amounts, rewards, status, chain, and vault.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: getAllDelegations\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Staking/getAllDelegations'

  static enableJsonFlag = false

  static flags = {
    'chain-descriptor': Flags.string({
      description: 'Protocol identifier to filter positions (e.g., ATOM_COS/AXL/CELESTIA}). If omitted, positions across all supported chains are returned.',
    }),
    'vault-account-id': Flags.string({
      description: 'Filter positions by vault account ID.',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/staking/positions'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetAllDelegations)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['chain-descriptor'] !== undefined && flags['chain-descriptor'] !== null) {
      queryParams['chainDescriptor'] = String(flags['chain-descriptor'])
    }
    if (flags['vault-account-id'] !== undefined && flags['vault-account-id'] !== null) {
      queryParams['vaultAccountId'] = String(flags['vault-account-id'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/staking/positions',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
