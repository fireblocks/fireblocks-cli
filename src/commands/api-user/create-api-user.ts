import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateApiUser extends FireblocksBaseCommand {
  static summary = 'Create API Key'

  static description = 'Create a new API key in your workspace.\nLearn more about Fireblocks API Keys management in the following [guide](https://developers.fireblocks.com/docs/manage-api-keys).\nEndpoint Permission: Admin, Non-Signing Admin.\n\nOperation ID: createApiUser\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Api%20User/createApiUser'

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
  static path = '/v1/management/api_users'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateApiUser)

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



    await this.confirmOrAbort('POST', '/v1/management/api_users')

    const result = await this.makeRequest(
      'POST',
      '/v1/management/api_users',
      {
        body,
        headers,
      },
    )

    return result
  }
}
