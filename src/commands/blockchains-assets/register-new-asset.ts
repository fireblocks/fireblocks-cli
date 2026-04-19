import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class RegisterNewAsset extends FireblocksBaseCommand {
  static summary = 'Register an asset'

  static description = 'Register a new asset to a workspace and return the newly created asset\'s details. Currently supported chains are:\n- EVM based chains\n- Stellar\n- Algorand\n- TRON\n- NEAR\n- Solana\n- Sui\n- TON\n\nOperation ID: registerNewAsset\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Blockchains%20%26%20assets/registerNewAsset'

  static enableJsonFlag = false

  static flags = {
    data: Flags.string({
      description: 'JSON request body',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/assets'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(RegisterNewAsset)

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



    await this.confirmOrAbort('POST', '/v1/assets')

    const result = await this.makeRequest(
      'POST',
      '/v1/assets',
      {
        body,
        headers,
      },
    )

    return result
  }
}
