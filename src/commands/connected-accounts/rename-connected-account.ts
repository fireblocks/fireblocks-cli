import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class RenameConnectedAccount extends FireblocksBaseCommand {
  static summary = 'Rename Connected Account'

  static description = 'Rename a connected account by account ID.\n\n**Note:** This endpoint is currently in beta and might be subject to changes.\n\nOperation ID: renameConnectedAccount\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Connected%20Accounts/renameConnectedAccount'

  static enableJsonFlag = false

  static flags = {
    'account-id': Flags.string({
      description: 'The unique identifier of the connected account',
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
  static path = '/v1/connected_accounts/{accountId}/rename'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(RenameConnectedAccount)

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


    await this.confirmOrAbort('POST', '/v1/connected_accounts/{accountId}/rename')

    const result = await this.makeRequest(
      'POST',
      '/v1/connected_accounts/{accountId}/rename',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
