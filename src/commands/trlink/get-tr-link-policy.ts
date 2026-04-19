import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetTRLinkPolicy extends FireblocksBaseCommand {
  static summary = 'Get TRLink policy'

  static description = 'Retrieves the complete TRSupport policy for the authenticated tenant, including pre-screening rules, post-screening rules, and missing TRM rules. Pre-screening rules determine whether transactions should be screened. Post-screening rules determine actions based on screening results. Missing TRM rules handle cases when screening data is unavailable.\n\nOperation ID: getTRLinkPolicy\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/TRLink/getTRLinkPolicy'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/screening/trlink/policy'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetTRLinkPolicy)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/screening/trlink/policy',
      {
        headers,
      },
    )

    return result
  }
}
