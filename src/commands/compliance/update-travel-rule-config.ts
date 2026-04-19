import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class UpdateTravelRuleConfig extends FireblocksBaseCommand {
  static summary = 'Update Travel Rule Configuration'

  static description = 'Updates bypass screening, inbound delay, or outbound delay configurations for Travel Rule.\n\nOperation ID: updateTravelRuleConfig\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/updateTravelRuleConfig'

  static enableJsonFlag = false

  static flags = {
  }

  static method = 'PUT'
  static path = '/v1/screening/travel_rule/policy_configuration'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(UpdateTravelRuleConfig)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }



    await this.confirmOrAbort('PUT', '/v1/screening/travel_rule/policy_configuration')

    const result = await this.makeRequest(
      'PUT',
      '/v1/screening/travel_rule/policy_configuration',
      {
        headers,
      },
    )

    return result
  }
}
