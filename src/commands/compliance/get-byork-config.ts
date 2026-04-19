import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetByorkConfig extends FireblocksBaseCommand {
  static summary = 'Get BYORK Light configuration'

  static description = 'Retrieves BYORK Light configuration for the authenticated tenant (timeouts, active flag, allowed timeout ranges). Returns default config when none exists. Requires BYORK Light to be enabled for the tenant.\n\nOperation ID: getByorkConfig\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/getByorkConfig'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/screening/byork/config'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetByorkConfig)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/screening/byork/config',
      {
        headers,
      },
    )

    return result
  }
}
