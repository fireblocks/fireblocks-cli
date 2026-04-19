import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetVaultAccounts extends FireblocksBaseCommand {
  static summary = 'Get vault accounts'

  static description = 'DEPRECATED - Please use \`/vault/accounts_paged\` endpoint instead.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nOperation ID: getVaultAccounts\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/getVaultAccounts'

  static enableJsonFlag = false

  static flags = {
    'name-prefix': Flags.string({
      description: 'The namePrefix parameter',
    }),
    'name-suffix': Flags.string({
      description: 'The nameSuffix parameter',
    }),
    'min-amount-threshold': Flags.string({
      description: 'The minAmountThreshold parameter',
    }),
    'asset-id': Flags.string({
      description: 'The assetId parameter',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/vault/accounts'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetVaultAccounts)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['name-prefix'] !== undefined && flags['name-prefix'] !== null) {
      queryParams['namePrefix'] = String(flags['name-prefix'])
    }
    if (flags['name-suffix'] !== undefined && flags['name-suffix'] !== null) {
      queryParams['nameSuffix'] = String(flags['name-suffix'])
    }
    if (flags['min-amount-threshold'] !== undefined && flags['min-amount-threshold'] !== null) {
      queryParams['minAmountThreshold'] = String(flags['min-amount-threshold'])
    }
    if (flags['asset-id'] !== undefined && flags['asset-id'] !== null) {
      queryParams['assetId'] = String(flags['asset-id'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/vault/accounts',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
