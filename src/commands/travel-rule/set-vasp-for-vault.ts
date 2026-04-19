import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class SetVaspForVault extends FireblocksBaseCommand {
  static summary = 'Assign VASP to vault'

  static description = 'Sets the VASP Did for a specific vault. Pass empty string to remove existing one.\n\nOperation ID: setVaspForVault\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Travel%20Rule/setVaspForVault'

  static enableJsonFlag = false

  static flags = {
    'vault-account-id': Flags.string({
      description: 'The ID of the vault account',
      required: true,
    }),
    data: Flags.string({
      description: 'JSON request body',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/screening/travel_rule/vault/{vaultAccountId}/vasp'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(SetVaspForVault)

    let body: Record<string, unknown> | undefined
    if (flags.data) {
      try {
        const parsed = JSON.parse(flags.data)
        if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
          this.error('--data must be a JSON object (e.g., \'{"key": "value"}\')')
        }
        body = parsed as Record<string, unknown>
      } catch {
        this.error('Invalid JSON in --data flag. Ensure the value is valid JSON.')
      }
    }

    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['vaultAccountId'] = String(flags['vault-account-id'])


    await this.confirmOrAbort('POST', '/v1/screening/travel_rule/vault/{vaultAccountId}/vasp')

    const result = await this.makeRequest(
      'POST',
      '/v1/screening/travel_rule/vault/{vaultAccountId}/vasp',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
