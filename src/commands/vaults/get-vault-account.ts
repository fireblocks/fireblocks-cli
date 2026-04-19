import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetVaultAccount extends FireblocksBaseCommand {
  static summary = 'Get a vault account by ID'

  static description = 'Get a vault account by its unique ID.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nOperation ID: getVaultAccount\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/getVaultAccount'

  static enableJsonFlag = false

  static flags = {
    'vault-account-id': Flags.string({
      description: 'The ID of the vault account',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/vault/accounts/{vaultAccountId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetVaultAccount)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['vaultAccountId'] = String(flags['vault-account-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/vault/accounts/{vaultAccountId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
