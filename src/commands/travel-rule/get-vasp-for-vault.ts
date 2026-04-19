import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetVaspForVault extends FireblocksBaseCommand {
  static summary = 'Get assigned VASP to vault'

  static description = 'Get assigned VASP Did for a specific vault. Returns empty string vaspDid value in response if none assigned.\n\nOperation ID: getVaspForVault\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Travel%20Rule/getVaspForVault'

  static enableJsonFlag = false

  static flags = {
    'vault-account-id': Flags.string({
      description: 'The ID of the vault account',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/screening/travel_rule/vault/{vaultAccountId}/vasp'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetVaspForVault)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['vaultAccountId'] = String(flags['vault-account-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/screening/travel_rule/vault/{vaultAccountId}/vasp',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
