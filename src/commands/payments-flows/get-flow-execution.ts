import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetFlowExecution extends FireblocksBaseCommand {
  static summary = 'Get workflow execution details'

  static description = 'Retrieve details of a previously initiated workflow execution by specifying the "workflowExecutionId"\n\nOperation ID: getFlowExecution\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Payments%20-%20Flows/getFlowExecution'

  static enableJsonFlag = false

  static flags = {
    'workflow-execution-id': Flags.string({
      description: 'The workflowExecutionId parameter',
      required: true,
    }),
  }

  static method = 'GET'
  static path = '/v1/payments/workflow_execution/{workflowExecutionId}'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetFlowExecution)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['workflowExecutionId'] = String(flags['workflow-execution-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/payments/workflow_execution/{workflowExecutionId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
