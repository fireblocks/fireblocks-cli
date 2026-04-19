import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class UpdateAmlScreeningConfiguration extends FireblocksBaseCommand {
  static summary = 'Update AML Configuration'

  static description = 'Updates bypass screening, inbound delay, or outbound delay configurations for AML.\n\nOperation ID: updateAmlScreeningConfiguration\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/updateAmlScreeningConfiguration'

  static enableJsonFlag = false

  static flags = {
  }

  static method = 'PUT'
  static path = '/v1/screening/aml/policy_configuration'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(UpdateAmlScreeningConfiguration)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }



    await this.confirmOrAbort('PUT', '/v1/screening/aml/policy_configuration')

    const result = await this.makeRequest(
      'PUT',
      '/v1/screening/aml/policy_configuration',
      {
        headers,
      },
    )

    return result
  }
}
