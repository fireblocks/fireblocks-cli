import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class LookupVaultByAddress extends FireblocksBaseCommand {
  static summary = 'Look up a vault account by blockchain address'

  static description = 'Resolves a blockchain address to the vault account that owns it. Returns the vault account ID and the blockchains associated with the address.\n**Note:** This endpoint is currently in beta and might be subject to changes.\n\nOperation ID: lookupVaultByAddress\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/lookupVaultByAddress'

  static enableJsonFlag = false

  static flags = {
    'address': Flags.string({
      description: 'The blockchain address to resolve.',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/vault/lookup_by_address'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(LookupVaultByAddress)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['address'] !== undefined && flags['address'] !== null) {
      queryParams['address'] = String(flags['address'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/vault/lookup_by_address',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
