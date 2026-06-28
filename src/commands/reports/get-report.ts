import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetReport extends FireblocksBaseCommand {
  static summary = 'Get report status'

  static description = 'Returns the current status of a report job. Check the \`status\` field to determine the outcome.\n\nWhen \`status\` is \`COMPLETED\`, the response includes a fresh pre-signed download URL in\n\`links.downloadUrl\` (TTL ~1 hour). Re-poll this endpoint to obtain a new URL after expiry.\n\nWhen \`status\` is \`FAILED\`, the \`failedAt\` timestamp indicates when the failure occurred.\n\n**Note:** These endpoints are currently in beta and might be subject to changes.\n\nEndpoint Permission: Viewer and above.\n\nOperation ID: getReport\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Reports/getReport'

  static enableJsonFlag = false

  static flags = {
    'report-id': Flags.string({
      description: 'The unique identifier of the report job',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/reports/{reportId}'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetReport)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['reportId'] = String(flags['report-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/reports/{reportId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
