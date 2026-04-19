import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetTRLinkPartners extends FireblocksBaseCommand {
  static summary = 'List available TRSupport partners'

  static description = 'Retrieves a list of all available Travel Rule Support integration partners. Partners provide Travel Rule compliance services such as VASP discovery, TRM exchange, and PII encryption.\n\nOperation ID: getTRLinkPartners\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/TRLink/getTRLinkPartners'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/screening/trlink/partners'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetTRLinkPartners)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/screening/trlink/partners',
      {
        headers,
      },
    )

    return result
  }
}
