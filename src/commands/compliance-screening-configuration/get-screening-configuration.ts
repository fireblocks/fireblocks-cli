import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetScreeningConfiguration extends FireblocksBaseCommand {
  static summary = 'Get Travel Rule Screening Policy Configuration'

  static description = 'Retrieves the configuration for Travel Rule screening policy.\n\nOperation ID: getScreeningConfiguration\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance%20Screening%20Configuration/getScreeningConfiguration'

  static enableJsonFlag = false

  static flags = {
  }

  static method = 'GET'
  static path = '/v1/screening/travel_rule/policy_configuration'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetScreeningConfiguration)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/screening/travel_rule/policy_configuration',
      {
        headers,
      },
    )

    return result
  }
}
