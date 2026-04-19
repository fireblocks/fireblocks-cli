import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetAmlPostScreeningPolicy extends FireblocksBaseCommand {
  static summary = 'AML - View Post-Screening Policy'

  static description = 'Get the post-screening policy for AML.\n\nOperation ID: getAmlPostScreeningPolicy\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/getAmlPostScreeningPolicy'

  static enableJsonFlag = false

  static flags = {
  }

  static method = 'GET'
  static path = '/v1/screening/aml/post_screening_policy'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetAmlPostScreeningPolicy)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/screening/aml/post_screening_policy',
      {
        headers,
      },
    )

    return result
  }
}
