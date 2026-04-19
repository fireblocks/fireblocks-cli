import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class ListVaultsForLegalEntity extends FireblocksBaseCommand {
  static summary = 'List vault accounts for a legal entity (Paginated)'

  static description = 'Returns vault account IDs explicitly assigned to a specific legal entity registration, with cursor-based pagination.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nOperation ID: listVaultsForLegalEntity\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/listVaultsForLegalEntity'

  static enableJsonFlag = false

  static flags = {
    'legal-entity-id': Flags.string({
      description: 'The unique ID of the legal entity registration',
      required: true,
    }),
    'page-cursor': Flags.string({
      description: 'Cursor string returned in \`next\` or \`prev\` of a previous response',
    }),
    'page-size': Flags.integer({
      description: 'Maximum number of registrations to return',
      default: 50,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/legal_entities/{legalEntityId}/vaults'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(ListVaultsForLegalEntity)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['legalEntityId'] = String(flags['legal-entity-id'])

    const queryParams: Record<string, string> = {}
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/legal_entities/{legalEntityId}/vaults',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
