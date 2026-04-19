import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetEmbeddedWalletPublicKeyInfoForAddress extends FireblocksBaseCommand {
  static summary = 'Get the public key of an asset'

  static description = 'Gets the public key of an asset associated with a specific account within a Non-Custodial Wallet\n\nOperation ID: GetEmbeddedWalletPublicKeyInfoForAddress\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Embedded%20Wallets/GetEmbeddedWalletPublicKeyInfoForAddress'

  static enableJsonFlag = false

  static flags = {
    'wallet-id': Flags.string({
      description: 'The ID of the Non-Custodial wallet',
      required: true,
    }),
    'account-id': Flags.string({
      description: 'The ID of the account',
      required: true,
    }),
    'asset-id': Flags.string({
      description: 'The ID of the asset',
      required: true,
    }),
    'change': Flags.string({
      description: 'BIP44 derivation path - change value',
      required: true,
    }),
    'address-index': Flags.string({
      description: 'BIP44 derivation path - index value',
      required: true,
    }),
    'compressed': Flags.boolean({
      description: 'Compressed/Uncompressed public key format',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/ncw/wallets/{walletId}/accounts/{accountId}/assets/{assetId}/{change}/{addressIndex}/public_key_info'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetEmbeddedWalletPublicKeyInfoForAddress)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['walletId'] = String(flags['wallet-id'])
    pathParams['accountId'] = String(flags['account-id'])
    pathParams['assetId'] = String(flags['asset-id'])
    pathParams['change'] = String(flags['change'])
    pathParams['addressIndex'] = String(flags['address-index'])

    const queryParams: Record<string, string> = {}
    if (flags['compressed'] !== undefined && flags['compressed'] !== null) {
      queryParams['compressed'] = String(flags['compressed'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/ncw/wallets/{walletId}/accounts/{accountId}/assets/{assetId}/{change}/{addressIndex}/public_key_info',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
