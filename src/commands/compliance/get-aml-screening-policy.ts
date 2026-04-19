import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetAmlScreeningPolicy extends FireblocksBaseCommand {
  static summary = 'AML - View Screening Policy'

  static description = 'Get the screening policy for AML.\n\nOperation ID: getAmlScreeningPolicy\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/getAmlScreeningPolicy'

  static enableJsonFlag = false

  static flags = {
  }

  static method = 'GET'
  static path = '/v1/screening/aml/screening_policy'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetAmlScreeningPolicy)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/screening/aml/screening_policy',
      {
        headers,
      },
    )

    return result
  }
}
