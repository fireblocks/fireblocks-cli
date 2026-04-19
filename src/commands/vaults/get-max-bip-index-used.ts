import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetMaxBipIndexUsed extends FireblocksBaseCommand {
  static summary = 'Get maximum BIP44 index used'

  static description = 'Retrieves the maximum BIP44 address index and change address index used for a specific asset in a vault account (BIP44 standard).\n\nOperation ID: getMaxBipIndexUsed\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/getMaxBipIndexUsed'

  static enableJsonFlag = false

  static flags = {
    'vault-account-id': Flags.string({
      description: 'The ID of the vault account',
      required: true,
    }),
    'asset-id': Flags.string({
      description: 'The ID of the asset',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/vault/accounts/{vaultAccountId}/{assetId}/max_bip44_index_used'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetMaxBipIndexUsed)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['vaultAccountId'] = String(flags['vault-account-id'])
    pathParams['assetId'] = String(flags['asset-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/vault/accounts/{vaultAccountId}/{assetId}/max_bip44_index_used',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
