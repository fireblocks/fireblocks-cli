import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class DeactivateByorkConfig extends FireblocksBaseCommand {
  static summary = 'Deactivate BYORK Light'

  static description = 'Deactivates BYORK Light for the authenticated tenant (sets config.active to false). Once deactivated, BYORK screening no longer applies until activated again. Requires BYORK Light to be enabled for the tenant (contact your CSM to enable).\n\nOperation ID: deactivateByorkConfig\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/deactivateByorkConfig'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/screening/byork/config/deactivate'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(DeactivateByorkConfig)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }



    await this.confirmOrAbort('POST', '/v1/screening/byork/config/deactivate')

    const result = await this.makeRequest(
      'POST',
      '/v1/screening/byork/config/deactivate',
      {
        headers,
      },
    )

    return result
  }
}
