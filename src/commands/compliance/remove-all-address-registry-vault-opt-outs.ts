import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class RemoveAllAddressRegistryVaultOptOuts extends FireblocksBaseCommand {
  static summary = 'Remove all vault-level address registry opt-outs for the workspace'

  static description = 'Removes all vault accounts from the workspace opt-out list.\n\nOperation ID: removeAllAddressRegistryVaultOptOuts\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/removeAllAddressRegistryVaultOptOuts'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'DELETE'
  static path = '/v1/address_registry/vaults'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(RemoveAllAddressRegistryVaultOptOuts)


    const headers: Record<string, string> = {}



    await this.confirmOrAbort('DELETE', '/v1/address_registry/vaults')

    const result = await this.makeRequest(
      'DELETE',
      '/v1/address_registry/vaults',
      {
        headers,
      },
    )

    return result
  }
}
