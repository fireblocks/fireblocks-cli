import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class ListLegalEntities extends FireblocksBaseCommand {
  static summary = 'List legal entities (Paginated)'

  static description = 'Returns legal entity registrations for the workspace with cursor-based pagination.\nIf query parameter vaultAccountId is used it returns the legal entity registration associated with a specific vault account. If no explicit mapping exists for the vault, the workspace default legal entity is returned. Returns an empty response if neither a vault mapping nor a default legal entity is configured.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nOperation ID: listLegalEntities\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/listLegalEntities'

  static enableJsonFlag = false

  static flags = {
    'vault-account-id': Flags.string({
      description: 'The ID of the vault account. When provided, returns the legal entity associated with that vault account and pagination parameters are ignored.',
    }),
    'page-cursor': Flags.string({
      description: 'Cursor string returned in \`next\` or \`prev\` of a previous response. Ignored when \`vaultAccountId\` is provided.',
    }),
    'page-size': Flags.integer({
      description: 'Maximum number of registrations to return. Ignored when \`vaultAccountId\` is provided.',
      default: 50,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/legal_entities'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(ListLegalEntities)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['vault-account-id'] !== undefined && flags['vault-account-id'] !== null) {
      queryParams['vaultAccountId'] = String(flags['vault-account-id'])
    }
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/legal_entities',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
