import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class OptInAddressRegistryCustomer extends FireblocksBaseCommand {
  static summary = 'Opt your customer in to the address registry'

  static description = 'Set your customer\'s default to opted in. Workspaces without their own setting will follow this default. No request body. Returns \`OPTED_IN\`. If the customer for this workspace cannot be determined, returns HTTP 404 with error code **2147**.\n\nOperation ID: optInAddressRegistryCustomer\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/optInAddressRegistryCustomer'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/address_registry/customer'
  static operationId = 'optInAddressRegistryCustomer'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(OptInAddressRegistryCustomer)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }



    await this.confirmOrAbort('POST', '/v1/address_registry/customer')

    const result = await this.makeRequest(
      'POST',
      '/v1/address_registry/customer',
      {
        headers,
      },
    )

    return result
  }
}
