import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetAddressRegistryTenantParticipationStatus extends FireblocksBaseCommand {
  static summary = 'Get address registry participation status for the authenticated workspace'

  static description = 'Returns whether the workspace is \`OPTED_IN\` or \`OPTED_OUT\` of the address registry.\n\nOperation ID: getAddressRegistryTenantParticipationStatus\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/getAddressRegistryTenantParticipationStatus'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/address_registry/tenant'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetAddressRegistryTenantParticipationStatus)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/address_registry/tenant',
      {
        headers,
      },
    )

    return result
  }
}
