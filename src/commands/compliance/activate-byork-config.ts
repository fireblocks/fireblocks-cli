import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class ActivateByorkConfig extends FireblocksBaseCommand {
  static summary = 'Activate BYORK Light'

  static description = 'Activates BYORK Light for the authenticated tenant (sets config.active to true). Once activated, BYORK screening applies to matching transactions. Requires BYORK Light to be enabled for the tenant (contact your CSM to enable).\n\nOperation ID: activateByorkConfig\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/activateByorkConfig'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/screening/byork/config/activate'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(ActivateByorkConfig)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }



    await this.confirmOrAbort('POST', '/v1/screening/byork/config/activate')

    const result = await this.makeRequest(
      'POST',
      '/v1/screening/byork/config/activate',
      {
        headers,
      },
    )

    return result
  }
}
