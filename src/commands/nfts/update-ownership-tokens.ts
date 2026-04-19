import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class UpdateOwnershipTokens extends FireblocksBaseCommand {
  static summary = 'Refresh vault account tokens'

  static description = 'Updates all tokens and balances per blockchain and vault account.\nLearn more about Fireblocks NFT management in the following [guide](https://developers.fireblocks.com/reference/deploy-an-nft-collection).\n\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: updateOwnershipTokens\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/NFTs/updateOwnershipTokens'

  static enableJsonFlag = false

  static flags = {
    'blockchain-descriptor': Flags.string({
      description: 'Blockchain descriptor filter',
      required: true,
      options: ['ETH', 'ETH_TEST5', 'ETH_TEST6', 'POLYGON', 'POLYGON_TEST_MUMBAI', 'AMOY_POLYGON_TEST', 'BASECHAIN_ETH', 'BASECHAIN_ETH_TEST5', 'ETHERLINK', 'ETHERLINK_TEST', 'MANTLE', 'MANTLE_TEST', 'GUN_GUNZILLA', 'GUN_GUNZILLA_TEST', 'ETH_SONEIUM', 'SONEIUM_MINATO_TEST', 'IOTX_IOTEX', 'KLAY_KAIA', 'KLAY_KAIA_TEST', 'APECHAIN', 'APECHAIN_TEST', 'ROBINHOOD_CHAIN_TESTNET_TEST'],
    }),
    'vault-account-id': Flags.string({
      description: 'Vault account filter',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'PUT'
  static path = '/v1/nfts/ownership/tokens'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(UpdateOwnershipTokens)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }


    const queryParams: Record<string, string> = {}
    if (flags['blockchain-descriptor'] !== undefined && flags['blockchain-descriptor'] !== null) {
      queryParams['blockchainDescriptor'] = String(flags['blockchain-descriptor'])
    }
    if (flags['vault-account-id'] !== undefined && flags['vault-account-id'] !== null) {
      queryParams['vaultAccountId'] = String(flags['vault-account-id'])
    }

    await this.confirmOrAbort('PUT', '/v1/nfts/ownership/tokens')

    const result = await this.makeRequest(
      'PUT',
      '/v1/nfts/ownership/tokens',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
