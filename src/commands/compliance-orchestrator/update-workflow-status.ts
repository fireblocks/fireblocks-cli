import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class UpdateWorkflowStatus extends FireblocksBaseCommand {
  static summary = 'Update a Compliance Orchestrator workflow\'s status'

  static description = 'Moves a workflow between \`DRAFT\` and \`ACTIVE\`. A workflow must be \`ACTIVE\` before \`POST /v1/compliance/orchestrator/screenings\` will accept a screening against it. Returns the workflow\'s id and new status, not its full configuration.\n\nOperation ID: updateWorkflowStatus\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance%20Orchestrator/updateWorkflowStatus'

  static enableJsonFlag = false

  static flags = {
    'workflow-id': Flags.string({
      description: 'The workflow\'s identifier.',
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
  static path = '/v1/compliance/orchestrator/workflows/{workflowId}/status'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(UpdateWorkflowStatus)

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
    pathParams['workflowId'] = String(flags['workflow-id'])


    await this.confirmOrAbort('PATCH', '/v1/compliance/orchestrator/workflows/{workflowId}/status')

    const result = await this.makeRequest(
      'PATCH',
      '/v1/compliance/orchestrator/workflows/{workflowId}/status',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
