import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class OptOutAddressRegistryCustomer extends FireblocksBaseCommand {
  static summary = 'Opt your customer out of the address registry'

  static description = 'Set your customer\'s default to opted out. Workspaces without their own setting will follow this default. No request body. Returns \`OPTED_OUT\`. If the customer for this workspace cannot be determined, returns HTTP 404 with error code **2147**.\n\nOperation ID: optOutAddressRegistryCustomer\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/optOutAddressRegistryCustomer'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'DELETE'
  static path = '/v1/address_registry/customer'
  static operationId = 'optOutAddressRegistryCustomer'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(OptOutAddressRegistryCustomer)


    const headers: Record<string, string> = {}



    await this.confirmOrAbort('DELETE', '/v1/address_registry/customer')

    const result = await this.makeRequest(
      'DELETE',
      '/v1/address_registry/customer',
      {
        headers,
      },
    )

    return result
  }
}
