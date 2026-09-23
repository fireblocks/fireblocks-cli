import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetScreeningResult extends FireblocksBaseCommand {
  static summary = 'Get a Compliance Orchestrator screening\'s result'

  static description = 'Returns the result of a screening started by \`POST /v1/compliance/orchestrator/screenings\`, with a result per workflow step and an audit log. Safe to poll: a screening still in flight reports \`PENDING\` or \`RUNNING\`. Only screenings owned by the requesting tenant are returned.\n\nOperation ID: getScreeningResult\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance%20Orchestrator/getScreeningResult'

  static enableJsonFlag = false

  static flags = {
    'screening-id': Flags.string({
      description: 'The screening\'s identifier, returned by \`POST /v1/compliance/orchestrator/screenings\`.',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/compliance/orchestrator/screenings/{screeningId}'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetScreeningResult)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['screeningId'] = String(flags['screening-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/compliance/orchestrator/screenings/{screeningId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
