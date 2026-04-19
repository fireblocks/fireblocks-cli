import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateFlowExecution extends FireblocksBaseCommand {
  static summary = 'Create workflow execution'

  static description = 'Validate the "workflow-config" previously created by utilizing the unique "configId". This step requires the mandatory field amount, and allows for modifications to other fields defined via the "workflow-config" endpoint, including pre-screening preferences. A response containing the "workflowExecutionId" and detailing the validation status will be provided. Execution is ready when the "workflow-execution" status is READY_FOR_LAUNCH, at which point it can be initiated with "POST /workflow-execution/{workflowExecutionId}/actions/execute".\n\nOperation ID: createFlowExecution\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Payments%20-%20Flows/createFlowExecution'

  static enableJsonFlag = false

  static flags = {
    data: Flags.string({
      description: 'JSON request body',
    }),
  }

  static method = 'POST'
  static path = '/v1/payments/workflow_execution'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateFlowExecution)

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



    await this.confirmOrAbort('POST', '/v1/payments/workflow_execution')

    const result = await this.makeRequest(
      'POST',
      '/v1/payments/workflow_execution',
      {
        body,
        headers,
      },
    )

    return result
  }
}
