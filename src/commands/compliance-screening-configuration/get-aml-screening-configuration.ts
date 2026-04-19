import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetAmlScreeningConfiguration extends FireblocksBaseCommand {
  static summary = 'Get AML Screening Policy Configuration'

  static description = 'Retrieves the configuration for Travel Rule screening policy.\n\nOperation ID: getAmlScreeningConfiguration\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance%20Screening%20Configuration/getAmlScreeningConfiguration'

  static enableJsonFlag = false

  static flags = {
  }

  static method = 'GET'
  static path = '/v1/screening/aml/policy_configuration'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetAmlScreeningConfiguration)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/screening/aml/policy_configuration',
      {
        headers,
      },
    )

    return result
  }
}
