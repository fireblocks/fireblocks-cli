import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateGenieSession extends FireblocksBaseCommand {
  static summary = 'Create a Genie session'

  static description = 'Starts a new conversation with Genie, the Fireblocks AI assistant. Returns a \`sessionId\` — pass it when sending messages, and reuse it across calls to keep one continuous conversation.\n\n**Note:** This endpoint is currently in beta and might be subject to changes.\n\nOperation ID: createGenieSession\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Genie/createGenieSession'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/genie/sessions'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateGenieSession)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }



    await this.confirmOrAbort('POST', '/v1/genie/sessions')

    const result = await this.makeRequest(
      'POST',
      '/v1/genie/sessions',
      {
        headers,
      },
    )

    return result
  }
}
