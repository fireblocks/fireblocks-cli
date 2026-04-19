import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateExternalWallet extends FireblocksBaseCommand {
  static summary = 'Create an external wallet'

  static description = 'Creates a new external wallet with the requested name.\n\nExternal Wallet is a whitelisted address of a wallet that belongs to your users/counterparties.\n\n- You cannot see the balance of the external wallet.\n- You cannot initiate transactions from an external wallet as the source via Fireblocks.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: createExternalWallet\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/External%20wallets/createExternalWallet'

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
  static path = '/v1/external_wallets'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateExternalWallet)

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



    await this.confirmOrAbort('POST', '/v1/external_wallets')

    const result = await this.makeRequest(
      'POST',
      '/v1/external_wallets',
      {
        body,
        headers,
      },
    )

    return result
  }
}
