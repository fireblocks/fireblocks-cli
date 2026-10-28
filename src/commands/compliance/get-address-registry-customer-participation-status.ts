import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetAddressRegistryCustomerParticipationStatus extends FireblocksBaseCommand {
  static summary = 'Get your customer\'s address registry default'

  static description = 'Read your customer\'s organization-wide address registry setting. Workspaces without their own choice use this as the default. Returns \`NOT_SET\` when no choice has been made yet, or \`OPTED_IN\` / \`OPTED_OUT\` when one has.\n\nOperation ID: getAddressRegistryCustomerParticipationStatus\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/getAddressRegistryCustomerParticipationStatus'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/address_registry/customer'
  static operationId = 'getAddressRegistryCustomerParticipationStatus'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetAddressRegistryCustomerParticipationStatus)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/address_registry/customer',
      {
        headers,
      },
    )

    return result
  }
}
