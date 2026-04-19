import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class AddAddressRegistryVaultOptOuts extends FireblocksBaseCommand {
  static summary = 'Add vault accounts to the address registry opt-out list'

  static description = 'Adds one or more vault account ids to the workspace opt-out list for the address registry.\n\nOperation ID: addAddressRegistryVaultOptOuts\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/addAddressRegistryVaultOptOuts'

  static enableJsonFlag = false

  static flags = {
    data: Flags.string({
      description: 'JSON request body',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/address_registry/vaults'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(AddAddressRegistryVaultOptOuts)

    let body: Record<string, unknown> | undefined
    if (flags.data) {
      try {
        const parsed = JSON.parse(flags.data)
        if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
          this.error('--data must be a JSON object (e.g., \'{"key": "value"}\')')
        }
        body = parsed as Record<string, unknown>
      } catch {
        this.error('Invalid JSON in --data flag. Ensure the value is valid JSON.')
      }
    }

    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }



    await this.confirmOrAbort('POST', '/v1/address_registry/vaults')

    const result = await this.makeRequest(
      'POST',
      '/v1/address_registry/vaults',
      {
        body,
        headers,
      },
    )

    return result
  }
}
