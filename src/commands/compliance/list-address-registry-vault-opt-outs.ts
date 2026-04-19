import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class ListAddressRegistryVaultOptOuts extends FireblocksBaseCommand {
  static summary = 'List vault-level address registry opt-outs (paginated)'

  static description = 'Lists vault accounts that are opted out of the address registry for this workspace. Pagination uses \`next\` and \`prev\` cursors from the response. If \`pageSize\` is omitted, **50** items are returned per page; allowed range is **1–100** per request.\n\nOperation ID: listAddressRegistryVaultOptOuts\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/listAddressRegistryVaultOptOuts'

  static enableJsonFlag = false

  static flags = {
    'page-cursor': Flags.string({
      description: 'Opaque cursor from a previous response (\`next\` or \`prev\`). Omit for the first page.',
    }),
    'page-size': Flags.integer({
      description: 'Page size. Default **50** if omitted; must be between **1** and **100**.',
      default: 50,
    }),
    'order': Flags.string({
      description: 'Sort direction by vault account id. Omit for ascending; use the enum value for descending.',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/address_registry/vaults'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(ListAddressRegistryVaultOptOuts)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }
    if (flags['order'] !== undefined && flags['order'] !== null) {
      queryParams['order'] = String(flags['order'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/address_registry/vaults',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
