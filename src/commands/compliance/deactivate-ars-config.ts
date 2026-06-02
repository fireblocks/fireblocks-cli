import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class DeactivateArsConfig extends FireblocksBaseCommand {
  static summary = 'Deactivate ARS (Address Registry Screening)'

  static description = 'Deactivates ARS (Address Registry Screening) for the authenticated tenant (sets config.active to false). Once deactivated, ARS screening no longer applies until activated again.\n\nOperation ID: deactivateArsConfig\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/deactivateArsConfig'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/screening/ars/config/deactivate'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(DeactivateArsConfig)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }



    await this.confirmOrAbort('POST', '/v1/screening/ars/config/deactivate')

    const result = await this.makeRequest(
      'POST',
      '/v1/screening/ars/config/deactivate',
      {
        headers,
      },
    )

    return result
  }
}
