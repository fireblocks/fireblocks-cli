import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class SendGenieMessage extends FireblocksBaseCommand {
  static summary = 'Send a message to a Genie session'

  static description = 'Sends a question to Genie and returns a single answer. Reuse the \`sessionId\` from the original session on follow-up messages to continue the conversation with prior context.\n\n**Note:** This endpoint is currently in beta and might be subject to changes.\n\nOperation ID: sendGenieMessage\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Genie/sendGenieMessage'

  static enableJsonFlag = false

  static flags = {
    'session-id': Flags.string({
      description: 'The Genie session ID returned from \`POST /genie/sessions\`.',
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
  static path = '/v1/genie/sessions/{sessionId}/messages'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(SendGenieMessage)

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
    pathParams['sessionId'] = String(flags['session-id'])


    await this.confirmOrAbort('POST', '/v1/genie/sessions/{sessionId}/messages')

    const result = await this.makeRequest(
      'POST',
      '/v1/genie/sessions/{sessionId}/messages',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
