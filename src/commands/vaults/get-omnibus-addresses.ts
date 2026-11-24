import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetOmnibusAddresses extends FireblocksBaseCommand {
  static summary = 'List omnibus deposit addresses'

  static description = 'Returns a page of the deposit addresses of the omnibus account of the given vault account, protocol and asset, ordered by index, highest first.\n**Note:** This endpoint is currently in beta and might be subject to changes.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nOperation ID: getOmnibusAddresses\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/getOmnibusAddresses'

  static enableJsonFlag = false

  static flags = {
    'vault-account-id': Flags.string({
      description: 'The ID of the omnibus vault account',
      required: true,
    }),
    'protocol': Flags.string({
      description: 'The omnibus protocol',
      required: true,
      options: ['EVM', 'TEMPO'],
    }),
    'asset-id': Flags.string({
      description: 'The ID of the asset',
      required: true,
    }),
    'from-index': Flags.integer({
      description: 'Return only addresses with an index greater than or equal to this value.',
    }),
    'search': Flags.string({
      description: 'Return only addresses that start with this value (case-insensitive). Surrounding whitespace is ignored.',
    }),
    'page-cursor': Flags.string({
      description: 'The cursor returned in \`next\` of the previous page. Omit for the first page.',
    }),
    'page-size': Flags.integer({
      description: 'The number of addresses per page.',
      default: 100,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/vault/accounts/{vaultAccountId}/omnibus/{protocol}/{assetId}/addresses'
  static operationId = 'getOmnibusAddresses'
  static isEa = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetOmnibusAddresses)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['vaultAccountId'] = String(flags['vault-account-id'])
    pathParams['protocol'] = String(flags['protocol'])
    pathParams['assetId'] = String(flags['asset-id'])

    const queryParams: Record<string, string> = {}
    if (flags['from-index'] !== undefined && flags['from-index'] !== null) {
      queryParams['fromIndex'] = String(flags['from-index'])
    }
    if (flags['search'] !== undefined && flags['search'] !== null) {
      queryParams['search'] = String(flags['search'])
    }
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/vault/accounts/{vaultAccountId}/omnibus/{protocol}/{assetId}/addresses',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
