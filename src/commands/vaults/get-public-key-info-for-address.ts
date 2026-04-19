import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetPublicKeyInfoForAddress extends FireblocksBaseCommand {
  static summary = 'Get an asset\'s public key'

  static description = 'Get the public key information for a specific asset in a vault account.\nEndpoint Permission: Admin, Non-Signing Admin.\n\nOperation ID: getPublicKeyInfoForAddress\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/getPublicKeyInfoForAddress'

  static enableJsonFlag = false

  static flags = {
    'vault-account-id': Flags.string({
      description: 'The vaultAccountId parameter',
      required: true,
    }),
    'asset-id': Flags.string({
      description: 'The assetId parameter',
      required: true,
    }),
    'change': Flags.string({
      description: 'The change parameter',
      required: true,
    }),
    'address-index': Flags.string({
      description: 'The addressIndex parameter',
      required: true,
    }),
    'compressed': Flags.boolean({
      description: 'The compressed parameter',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/vault/accounts/{vaultAccountId}/{assetId}/{change}/{addressIndex}/public_key_info'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetPublicKeyInfoForAddress)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['vaultAccountId'] = String(flags['vault-account-id'])
    pathParams['assetId'] = String(flags['asset-id'])
    pathParams['change'] = String(flags['change'])
    pathParams['addressIndex'] = String(flags['address-index'])

    const queryParams: Record<string, string> = {}
    if (flags['compressed'] !== undefined && flags['compressed'] !== null) {
      queryParams['compressed'] = String(flags['compressed'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/vault/accounts/{vaultAccountId}/{assetId}/{change}/{addressIndex}/public_key_info',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
