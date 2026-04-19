import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetFlowConfiguration extends FireblocksBaseCommand {
  static summary = 'Retrieve workflow configuration'

  static description = 'Retrieve a previously created workflow configuration using the specified "configId".\n\nOperation ID: getFlowConfiguration\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Payments%20-%20Flows/getFlowConfiguration'

  static enableJsonFlag = false

  static flags = {
    'config-id': Flags.string({
      description: 'The configId parameter',
      required: true,
    }),
  }

  static method = 'GET'
  static path = '/v1/payments/workflow_config/{configId}'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetFlowConfiguration)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['configId'] = String(flags['config-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/payments/workflow_config/{configId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
