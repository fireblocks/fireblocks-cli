import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateReport extends FireblocksBaseCommand {
  static summary = 'Create a report'

  static description = 'Creates a new asynchronous report job and returns a receipt containing the report ID.\nPoll \`GET /v1/reports/{reportId}\` to check status. When \`status\` is \`COMPLETED\`, the poll\nresponse includes a fresh pre-signed download URL in \`links.downloadUrl\`.\n\n**Note:** These endpoints are currently in beta and might be subject to changes.\n\nEndpoint Permission: Viewer and above.\n\nOperation ID: createReport\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Reports/createReport'

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
  static path = '/v1/reports'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateReport)

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



    await this.confirmOrAbort('POST', '/v1/reports')

    const result = await this.makeRequest(
      'POST',
      '/v1/reports',
      {
        body,
        headers,
      },
    )

    return result
  }
}
