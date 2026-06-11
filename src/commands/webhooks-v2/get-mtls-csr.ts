import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetMtlsCsr extends FireblocksBaseCommand {
  static summary = 'Get mTLS CSR'

  static description = 'Returns the Fireblocks Certificate Signing Request (CSR) PEM that customers use to generate their signed client certificate.\n\nOperation ID: getMtlsCsr\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Webhooks%20V2/getMtlsCsr'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/webhooks/mtls/csr'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetMtlsCsr)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/webhooks/mtls/csr',
      {
        headers,
      },
    )

    return result
  }
}
