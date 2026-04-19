import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetAddressRegistryVaultOptOut extends FireblocksBaseCommand {
  static summary = 'Get whether a vault account is opted out of the address registry'

  static description = 'Returns whether this vault account is on the workspace opt-out list (\`optedOut\` true or false). List, add, and clear-all are available on \`/v1/address_registry/vaults\`; this path reads or removes one vault.\n\nOperation ID: getAddressRegistryVaultOptOut\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/getAddressRegistryVaultOptOut'

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

  static method = 'GET'
  static path = '/v1/address_registry/vaults/{vaultAccountId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetAddressRegistryVaultOptOut)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['vaultAccountId'] = String(flags['vault-account-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/address_registry/vaults/{vaultAccountId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
