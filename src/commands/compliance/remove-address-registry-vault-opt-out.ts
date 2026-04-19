import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class RemoveAddressRegistryVaultOptOut extends FireblocksBaseCommand {
  static summary = 'Remove a single vault account from the address registry opt-out list'

  static description = 'Removes this vault account id from the workspace opt-out list if it is present; otherwise the call still succeeds. Response body matches GET (\`optedOut\` is \`false\` after success). To clear the whole list, use \`DELETE /v1/address_registry/vaults\`.\n\nOperation ID: removeAddressRegistryVaultOptOut\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/removeAddressRegistryVaultOptOut'

  static enableJsonFlag = false

  static flags = {
    'vault-account-id': Flags.integer({
      description: 'Vault account id (non-negative integer).',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'DELETE'
  static path = '/v1/address_registry/vaults/{vaultAccountId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(RemoveAddressRegistryVaultOptOut)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['vaultAccountId'] = String(flags['vault-account-id'])


    await this.confirmOrAbort('DELETE', '/v1/address_registry/vaults/{vaultAccountId}')

    const result = await this.makeRequest(
      'DELETE',
      '/v1/address_registry/vaults/{vaultAccountId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
