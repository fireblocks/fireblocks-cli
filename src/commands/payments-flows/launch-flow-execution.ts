import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class LaunchFlowExecution extends FireblocksBaseCommand {
  static summary = 'Execute the payments workflow'

  static description = 'Launch the execution of a pre-configured workflow, identified by "workflowExecutionId", once it reaches the READY_FOR_LAUNCH state. The workflow undergoes several phases during execution - EXECUTION_IN_PROGRESS - Marks the start of the workflow execution. EXECUTION_COMPLETED or EXECUTION_FAILED - Indicates the execution has reached a final state.\n\nOperation ID: launchFlowExecution\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Payments%20-%20Flows/launchFlowExecution'

  static enableJsonFlag = false

  static flags = {
    'workflow-execution-id': Flags.string({
      description: 'The workflowExecutionId parameter',
      required: true,
    }),
  }

  static method = 'POST'
  static path = '/v1/payments/workflow_execution/{workflowExecutionId}/actions/execute'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(LaunchFlowExecution)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['workflowExecutionId'] = String(flags['workflow-execution-id'])


    await this.confirmOrAbort('POST', '/v1/payments/workflow_execution/{workflowExecutionId}/actions/execute')

    const result = await this.makeRequest(
      'POST',
      '/v1/payments/workflow_execution/{workflowExecutionId}/actions/execute',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
