import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class DeleteFlowConfiguration extends FireblocksBaseCommand {
  static summary = 'Delete workflow configuration'

  static description = 'Delete a configuration using the specified "configId".\n\nOperation ID: deleteFlowConfiguration\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Payments%20-%20Flows/deleteFlowConfiguration'

  static enableJsonFlag = false

  static flags = {
    'config-id': Flags.string({
      description: 'The configId parameter',
      required: true,
    }),
  }

  static method = 'DELETE'
  static path = '/v1/payments/workflow_config/{configId}'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(DeleteFlowConfiguration)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['configId'] = String(flags['config-id'])


    await this.confirmOrAbort('DELETE', '/v1/payments/workflow_config/{configId}')

    const result = await this.makeRequest(
      'DELETE',
      '/v1/payments/workflow_config/{configId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
