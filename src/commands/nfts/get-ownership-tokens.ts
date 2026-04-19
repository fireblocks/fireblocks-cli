import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetOwnershipTokens extends FireblocksBaseCommand {
  static summary = 'List all owned tokens (paginated)'

  static description = 'Returns all tokens and their data in your workspace.\n\nOperation ID: getOwnershipTokens\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/NFTs/getOwnershipTokens'

  static enableJsonFlag = false

  static flags = {
    'blockchain-descriptor': Flags.string({
      description: 'Blockchain descriptor filter',
      options: ['ETH', 'ETH_TEST3', 'ETH_TEST5', 'ETH_TEST6', 'POLYGON', 'POLYGON_TEST_MUMBAI', 'AMOY_POLYGON_TEST', 'XTZ', 'XTZ_TEST', 'BASECHAIN_ETH', 'BASECHAIN_ETH_TEST3', 'BASECHAIN_ETH_TEST5', 'ETHERLINK', 'ETHERLINK_TEST', 'MANTLE', 'MANTLE_TEST', 'GUN_GUNZILLA', 'GUN_GUNZILLA_TEST', 'ETH_SONEIUM', 'SONEIUM_MINATO_TEST', 'IOTX_IOTEX', 'KLAY_KAIA', 'KLAY_KAIA_TEST', 'APECHAIN', 'APECHAIN_TEST', 'CRONOS', 'CRONOS_TEST', 'ROBINHOOD_CHAIN_TESTNET_TEST'],
    }),
    'vault-account-ids': Flags.string({
      description: 'A comma separated list of Vault Account IDs. Up to 100 are allowed in a single request.  This field will be ignored when walletType=END_USER_WALLET or ncwId is provided.',
    }),
    'ncw-id': Flags.string({
      description: 'Tenant\'s Non-Custodial Wallet ID',
    }),
    'ncw-account-ids': Flags.string({
      description: 'A comma separated list of Non-Custodial account IDs. Up to 100 are allowed in a single request. This field will be ignored when walletType=VAULT_ACCOUNT or ncwId is not provided.',
    }),
    'wallet-type': Flags.string({
      description: 'Wallet type, it can be \`VAULT_ACCOUNT\` or \`END_USER_WALLET\`',
      default: 'VAULT_ACCOUNT',
      options: ['VAULT_ACCOUNT', 'END_USER_WALLET'],
    }),
    'ids': Flags.string({
      description: 'A comma separated list of NFT IDs. Up to 100 are allowed in a single request.',
    }),
    'collection-ids': Flags.string({
      description: 'A comma separated list of collection IDs. Up to 100 are allowed in a single request.',
    }),
    'page-cursor': Flags.string({
      description: 'Page cursor to fetch',
    }),
    'page-size': Flags.string({
      description: 'Items per page (max 100)',
    }),
    'sort': Flags.string({
      description: 'Sort by param, it can be one param or a list of params separated by comma',
    }),
    'order': Flags.string({
      description: 'Order direction, it can be \`ASC\` for ascending or \`DESC\` for descending',
      default: 'ASC',
      options: ['DESC', 'ASC'],
    }),
    'status': Flags.string({
      description: 'Token ownership status',
      default: 'LISTED',
      options: ['LISTED', 'ARCHIVED'],
    }),
    'search': Flags.string({
      description: 'Search owned tokens and their collections. Possible criteria for search:  token name and id within the contract/collection, collection name, blockchain descriptor and name.',
    }),
    'spam': Flags.string({
      description: 'Token ownership spam status.',
      options: ['true', 'false', 'all'],
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/nfts/ownership/tokens'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetOwnershipTokens)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['blockchain-descriptor'] !== undefined && flags['blockchain-descriptor'] !== null) {
      queryParams['blockchainDescriptor'] = String(flags['blockchain-descriptor'])
    }
    if (flags['vault-account-ids'] !== undefined && flags['vault-account-ids'] !== null) {
      queryParams['vaultAccountIds'] = String(flags['vault-account-ids'])
    }
    if (flags['ncw-id'] !== undefined && flags['ncw-id'] !== null) {
      queryParams['ncwId'] = String(flags['ncw-id'])
    }
    if (flags['ncw-account-ids'] !== undefined && flags['ncw-account-ids'] !== null) {
      queryParams['ncwAccountIds'] = String(flags['ncw-account-ids'])
    }
    if (flags['wallet-type'] !== undefined && flags['wallet-type'] !== null) {
      queryParams['walletType'] = String(flags['wallet-type'])
    }
    if (flags['ids'] !== undefined && flags['ids'] !== null) {
      queryParams['ids'] = String(flags['ids'])
    }
    if (flags['collection-ids'] !== undefined && flags['collection-ids'] !== null) {
      queryParams['collectionIds'] = String(flags['collection-ids'])
    }
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }
    if (flags['sort'] !== undefined && flags['sort'] !== null) {
      queryParams['sort'] = String(flags['sort'])
    }
    if (flags['order'] !== undefined && flags['order'] !== null) {
      queryParams['order'] = String(flags['order'])
    }
    if (flags['status'] !== undefined && flags['status'] !== null) {
      queryParams['status'] = String(flags['status'])
    }
    if (flags['search'] !== undefined && flags['search'] !== null) {
      queryParams['search'] = String(flags['search'])
    }
    if (flags['spam'] !== undefined && flags['spam'] !== null) {
      queryParams['spam'] = String(flags['spam'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/nfts/ownership/tokens',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
