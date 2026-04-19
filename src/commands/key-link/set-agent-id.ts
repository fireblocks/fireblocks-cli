import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class SetAgentId extends FireblocksBaseCommand {
  static summary = 'Set agent user id'

  static description = 'Can modify existing signing key id if the key is not enabled. The change done in background and will be visible once applied. If key is already enabled (after proof of ownership) the user cannot be changed.\n\nOperation ID: setAgentId\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Key%20Link/setAgentId'

  static enableJsonFlag = false

  static flags = {
    'key-id': Flags.string({
      description: 'The unique identifier for the signing key provided by Fireblocks',
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

  static method = 'PATCH'
  static path = '/v1/key_link/signing_keys/{keyId}/agent_user_id'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(SetAgentId)

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

    const pathParams: Record<string, string> = {}
    pathParams['keyId'] = String(flags['key-id'])


    await this.confirmOrAbort('PATCH', '/v1/key_link/signing_keys/{keyId}/agent_user_id')

    const result = await this.makeRequest(
      'PATCH',
      '/v1/key_link/signing_keys/{keyId}/agent_user_id',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
