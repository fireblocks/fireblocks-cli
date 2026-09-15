import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class UpdateConnectedAccountCredentials extends FireblocksBaseCommand {
  static summary = 'Update connected account credentials'

  static description = 'Replace the API credentials (secret + API key) of a connected account.\n\nCredentials belong to an API key, which can back a single account or an entire hierarchy.\nUpdating them affects all accounts sharing that key, so the endpoint returns an array of modified accounts.\n\nThe \`creds\` field must be a Base64-encoded RSA-encrypted credential blob; use\n\`GET /connected_accounts/credentials/public_key\` to retrieve the public key for encryption.\nBoth \`creds\` and \`apiKey\` are mandatory.\n\nValidation against the exchange is synchronous, but the update itself is **pending mobile\napproval** — the existing credentials stay live until the change is approved, so none of the\naffected accounts are disconnected in the meantime.\n\nEndpoint Permission: Admin, Non-Signing Admin.\n\n**Note:** This endpoint is currently in beta and might be subject to changes.\n\nOperation ID: updateConnectedAccountCredentials\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Connected%20Accounts/updateConnectedAccountCredentials'

  static enableJsonFlag = false

  static flags = {
    'account-id': Flags.string({
      description: 'The unique identifier of the connected account whose API key credentials are being replaced.',
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
  static path = '/v1/connected_accounts/{accountId}/credentials'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(UpdateConnectedAccountCredentials)

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

    const pathParams: Record<string, string> = {}
    pathParams['accountId'] = String(flags['account-id'])


    await this.confirmOrAbort('POST', '/v1/connected_accounts/{accountId}/credentials')

    const result = await this.makeRequest(
      'POST',
      '/v1/connected_accounts/{accountId}/credentials',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
