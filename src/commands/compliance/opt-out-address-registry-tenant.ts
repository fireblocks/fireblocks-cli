import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class OptOutAddressRegistryTenant extends FireblocksBaseCommand {
  static summary = 'Opt the workspace out of the address registry'

  static description = 'Opts the workspace out. No request body. Response uses the same JSON shape as GET; status is OPTED_OUT.\n\nOperation ID: optOutAddressRegistryTenant\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/optOutAddressRegistryTenant'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'DELETE'
  static path = '/v1/address_registry/tenant'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(OptOutAddressRegistryTenant)


    const headers: Record<string, string> = {}



    await this.confirmOrAbort('DELETE', '/v1/address_registry/tenant')

    const result = await this.makeRequest(
      'DELETE',
      '/v1/address_registry/tenant',
      {
        headers,
      },
    )

    return result
  }
}
