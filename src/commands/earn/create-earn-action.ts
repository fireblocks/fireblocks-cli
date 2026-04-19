import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateEarnAction extends FireblocksBaseCommand {
  static summary = 'Create and execute a lending action (deposit or withdraw)'

  static description = 'Creates and runs a sequence of on-chain steps for either a deposit into or a withdrawal from an earn\nvault/market. Specify the operation with \`action\` in the request body (\`DEPOSIT\` or \`WITHDRAW\`).\n\n**Note:** This endpoint is currently in beta and might be subject to changes.\n\nOperation ID: createEarnAction\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Earn/createEarnAction'

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
  static path = '/v1/earn/actions'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateEarnAction)

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



    await this.confirmOrAbort('POST', '/v1/earn/actions')

    const result = await this.makeRequest(
      'POST',
      '/v1/earn/actions',
      {
        body,
        headers,
      },
    )

    return result
  }
}
