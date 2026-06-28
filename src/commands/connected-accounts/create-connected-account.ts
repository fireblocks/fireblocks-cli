import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateConnectedAccount extends FireblocksBaseCommand {
  static summary = 'Create a connected account'

  static description = 'Creates a new connected account for the authenticated tenant.\n\nThe \`creds\` field must be a Base64-encoded RSA-encrypted credential blob.\nUse \`GET /exchange_accounts/credentials_public_key\` to retrieve the public key for encryption.\n\nThe \`providerType\` is derived server-side from the \`providerId\` — callers do not supply it.\n\nEndpoint Permission: Editor, Admin, Non-Signing Admin.\n\n**Note:** This endpoint is currently in beta and might be subject to changes.\n\nOperation ID: createConnectedAccount\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Connected%20Accounts/createConnectedAccount'

  static enableJsonFlag = false

  static flags = {
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
  static path = '/v1/connected_accounts'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateConnectedAccount)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')

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



    await this.confirmOrAbort('POST', '/v1/connected_accounts')

    const result = await this.makeRequest(
      'POST',
      '/v1/connected_accounts',
      {
        body,
        headers,
      },
    )

    return result
  }
}
