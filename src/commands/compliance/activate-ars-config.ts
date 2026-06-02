import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class ActivateArsConfig extends FireblocksBaseCommand {
  static summary = 'Activate ARS (Address Registry Screening)'

  static description = 'Activates ARS (Address Registry Screening) for the authenticated tenant (sets config.active to true). Once activated, ARS screening applies to matching transactions.\n\nOperation ID: activateArsConfig\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/activateArsConfig'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/screening/ars/config/activate'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(ActivateArsConfig)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }



    await this.confirmOrAbort('POST', '/v1/screening/ars/config/activate')

    const result = await this.makeRequest(
      'POST',
      '/v1/screening/ars/config/activate',
      {
        headers,
      },
    )

    return result
  }
}
