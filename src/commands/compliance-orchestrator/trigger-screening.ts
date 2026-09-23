import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class TriggerScreening extends FireblocksBaseCommand {
  static summary = 'Trigger a Compliance Orchestrator screening'

  static description = 'Starts a compliance screening against an active workflow and returns a \`screeningId\`. The screening runs asynchronously — poll \`GET /v1/compliance/orchestrator/screenings/{screeningId}\` for the result.\n\nUnlike the screening that applies automatically to submitted transactions under \`/v1/screening\`, this is called on demand, before anything exists on-chain.\n\nOperation ID: triggerScreening\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance%20Orchestrator/triggerScreening'

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
  static path = '/v1/compliance/orchestrator/screenings'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(TriggerScreening)

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



    await this.confirmOrAbort('POST', '/v1/compliance/orchestrator/screenings')

    const result = await this.makeRequest(
      'POST',
      '/v1/compliance/orchestrator/screenings',
      {
        body,
        headers,
      },
    )

    return result
  }
}
