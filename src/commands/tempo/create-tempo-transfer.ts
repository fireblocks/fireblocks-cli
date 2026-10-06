import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateTempoTransfer extends FireblocksBaseCommand {
  static summary = 'Create a Tempo transfer transaction'

  static description = 'Creates a new Tempo transfer transaction.\n\nOperation ID: createTempoTransfer\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tempo/createTempoTransfer'

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
  static path = '/v1/operations/tempo/transfer'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateTempoTransfer)

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



    await this.confirmOrAbort('POST', '/v1/operations/tempo/transfer')

    const result = await this.makeRequest(
      'POST',
      '/v1/operations/tempo/transfer',
      {
        body,
        headers,
      },
    )

    return result
  }
}
