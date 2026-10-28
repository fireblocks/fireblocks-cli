import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetAddressRegistryTenantParticipationStatus extends FireblocksBaseCommand {
  static summary = 'Get address registry status for this workspace'

  static description = 'Check whether this workspace uses the address registry. The response is \`OPTED_IN\` or \`OPTED_OUT\`. If this workspace has not been configured yet, it follows your customer\'s default (see \`GET /v1/address_registry/customer\`) when that default is \`OPTED_IN\` or \`OPTED_OUT\`; otherwise the workspace is opted in by default.\n\nOperation ID: getAddressRegistryTenantParticipationStatus\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/getAddressRegistryTenantParticipationStatus'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/address_registry/tenant'
  static operationId = 'getAddressRegistryTenantParticipationStatus'
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
