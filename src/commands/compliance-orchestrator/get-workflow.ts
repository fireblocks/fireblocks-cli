import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetWorkflow extends FireblocksBaseCommand {
  static summary = 'Get a Compliance Orchestrator workflow'

  static description = 'Returns a workflow\'s status and its steps in execution order. Read it to see what a given \`workflowId\` will screen, and which fields its rules may reference.\n\nOperation ID: getWorkflow\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance%20Orchestrator/getWorkflow'

  static enableJsonFlag = false

  static flags = {
    'workflow-id': Flags.string({
      description: 'The workflow\'s identifier.',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/compliance/orchestrator/workflows/{workflowId}'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetWorkflow)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['workflowId'] = String(flags['workflow-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/compliance/orchestrator/workflows/{workflowId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
