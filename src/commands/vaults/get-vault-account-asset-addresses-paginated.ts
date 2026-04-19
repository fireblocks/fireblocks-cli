import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetVaultAccountAssetAddressesPaginated extends FireblocksBaseCommand {
  static summary = 'Get addresses (Paginated)'

  static description = 'Returns a paginated response of the addresses for a given vault account and asset.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nOperation ID: getVaultAccountAssetAddressesPaginated\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/getVaultAccountAssetAddressesPaginated'

  static enableJsonFlag = false

  static flags = {
    'vault-account-id': Flags.string({
      description: 'The ID of the vault account to return',
      required: true,
    }),
    'asset-id': Flags.string({
      description: 'The ID of the asset',
      required: true,
    }),
    'limit': Flags.string({
      description: 'The limit parameter',
    }),
    'before': Flags.string({
      description: 'The before parameter',
    }),
    'after': Flags.string({
      description: 'The after parameter',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/vault/accounts/{vaultAccountId}/{assetId}/addresses_paginated'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetVaultAccountAssetAddressesPaginated)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['vaultAccountId'] = String(flags['vault-account-id'])
    pathParams['assetId'] = String(flags['asset-id'])

    const queryParams: Record<string, string> = {}
    if (flags['limit'] !== undefined && flags['limit'] !== null) {
      queryParams['limit'] = String(flags['limit'])
    }
    if (flags['before'] !== undefined && flags['before'] !== null) {
      queryParams['before'] = String(flags['before'])
    }
    if (flags['after'] !== undefined && flags['after'] !== null) {
      queryParams['after'] = String(flags['after'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/vault/accounts/{vaultAccountId}/{assetId}/addresses_paginated',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
