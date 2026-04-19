import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetVaultAssets extends FireblocksBaseCommand {
  static summary = 'Get asset balance for chosen assets'

  static description = 'Gets the assets amount summary for all accounts or filtered accounts.\n\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nOperation ID: getVaultAssets\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/getVaultAssets'

  static enableJsonFlag = false

  static flags = {
    'account-name-prefix': Flags.string({
      description: 'The accountNamePrefix parameter',
    }),
    'account-name-suffix': Flags.string({
      description: 'The accountNameSuffix parameter',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/vault/assets'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetVaultAssets)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['account-name-prefix'] !== undefined && flags['account-name-prefix'] !== null) {
      queryParams['accountNamePrefix'] = String(flags['account-name-prefix'])
    }
    if (flags['account-name-suffix'] !== undefined && flags['account-name-suffix'] !== null) {
      queryParams['accountNameSuffix'] = String(flags['account-name-suffix'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/vault/assets',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
