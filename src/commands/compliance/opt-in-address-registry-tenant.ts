import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class OptInAddressRegistryTenant extends FireblocksBaseCommand {
  static summary = 'Opt this workspace in to the address registry'

  static description = 'Turn on the address registry for this workspace. No request body. Returns \`OPTED_IN\`.\n\nOperation ID: optInAddressRegistryTenant\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/optInAddressRegistryTenant'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/address_registry/tenant'
  static operationId = 'optInAddressRegistryTenant'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(OptInAddressRegistryTenant)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }



    await this.confirmOrAbort('POST', '/v1/address_registry/tenant')

    const result = await this.makeRequest(
      'POST',
      '/v1/address_registry/tenant',
      {
        headers,
      },
    )

    return result
  }
}
