import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetSigningKeysList extends FireblocksBaseCommand {
  static summary = 'Get list of signing keys'

  static description = 'Returns the list of signing keys in the workspace\n\nOperation ID: getSigningKeysList\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Key%20Link/getSigningKeysList'

  static enableJsonFlag = false

  static flags = {
    'page-cursor': Flags.string({
      description: 'Cursor to the next page',
    }),
    'page-size': Flags.string({
      description: 'Amount of results to return in the next page',
      default: '10',
    }),
    'sort-by': Flags.string({
      description: 'Field(s) to use for sorting',
      default: 'createdAt',
      options: ['createdAt'],
    }),
    'order': Flags.string({
      description: 'Is the order ascending or descending',
      default: 'ASC',
      options: ['ASC', 'DESC'],
    }),
    'vault-account-id': Flags.string({
      description: 'Return keys assigned to a specific vault',
    }),
    'agent-user-id': Flags.string({
      description: 'Return keys associated with a specific agent user',
    }),
    'algorithm': Flags.string({
      description: 'Return only keys with a specific algorithm',
      options: ['ECDSA_SECP256K1', 'EDDSA_ED25519'],
    }),
    'enabled': Flags.boolean({
      description: 'Return keys that have been proof of ownership',
    }),
    'available': Flags.boolean({
      description: 'Return keys that are proof of ownership but not assigned. Available filter can be used only when vaultAccountId and enabled filters are not set',
    }),
    'is-assigned': Flags.boolean({
      description: 'Return keys that are assigned to a vault account',
    }),
    'key-prefix': Flags.string({
      description: 'A case-insensitive prefix filter that matches records where either keyId or signingDeviceKeyID starts with the specified value.',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/key_link/signing_keys'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetSigningKeysList)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }
    if (flags['sort-by'] !== undefined && flags['sort-by'] !== null) {
      queryParams['sortBy'] = String(flags['sort-by'])
    }
    if (flags['order'] !== undefined && flags['order'] !== null) {
      queryParams['order'] = String(flags['order'])
    }
    if (flags['vault-account-id'] !== undefined && flags['vault-account-id'] !== null) {
      queryParams['vaultAccountId'] = String(flags['vault-account-id'])
    }
    if (flags['agent-user-id'] !== undefined && flags['agent-user-id'] !== null) {
      queryParams['agentUserId'] = String(flags['agent-user-id'])
    }
    if (flags['algorithm'] !== undefined && flags['algorithm'] !== null) {
      queryParams['algorithm'] = String(flags['algorithm'])
    }
    if (flags['enabled'] !== undefined && flags['enabled'] !== null) {
      queryParams['enabled'] = String(flags['enabled'])
    }
    if (flags['available'] !== undefined && flags['available'] !== null) {
      queryParams['available'] = String(flags['available'])
    }
    if (flags['is-assigned'] !== undefined && flags['is-assigned'] !== null) {
      queryParams['isAssigned'] = String(flags['is-assigned'])
    }
    if (flags['key-prefix'] !== undefined && flags['key-prefix'] !== null) {
      queryParams['keyPrefix'] = String(flags['key-prefix'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/key_link/signing_keys',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
