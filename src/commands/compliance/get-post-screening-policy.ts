import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetPostScreeningPolicy extends FireblocksBaseCommand {
  static summary = 'Travel Rule - View Post-Screening Policy'

  static description = 'Get the post-screening policy for Travel Rule.\n\nOperation ID: getPostScreeningPolicy\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/getPostScreeningPolicy'

  static enableJsonFlag = false

  static flags = {
  }

  static method = 'GET'
  static path = '/v1/screening/travel_rule/post_screening_policy'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetPostScreeningPolicy)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/screening/travel_rule/post_screening_policy',
      {
        headers,
      },
    )

    return result
  }
}
