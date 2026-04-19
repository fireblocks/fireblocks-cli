import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetScreeningPolicy extends FireblocksBaseCommand {
  static summary = 'Travel Rule - View Screening Policy'

  static description = 'Get the screening policy for Travel Rule.\n\nOperation ID: getScreeningPolicy\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/getScreeningPolicy'

  static enableJsonFlag = false

  static flags = {
  }

  static method = 'GET'
  static path = '/v1/screening/travel_rule/screening_policy'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetScreeningPolicy)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/screening/travel_rule/screening_policy',
      {
        headers,
      },
    )

    return result
  }
}
