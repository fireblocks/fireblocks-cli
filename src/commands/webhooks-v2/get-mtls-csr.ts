import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetMtlsCsr extends FireblocksBaseCommand {
  static summary = 'Get mTLS CSR'

  static description = 'Returns the Certificate Signing Request (CSR) PEM that customers use to generate their signed client certificate.\n\nThe private key the CSR is built from is held by Fireblocks and is specific to this workspace. It is created on the first request for a given key type, and the same CSR is returned on subsequent requests for that type.\n\nPass \`keyAlgorithm\` to choose RSA or ECDSA. A workspace may hold one key of each: the CSR returned is always the one for the type requested, so a certificate signed against it matches the key used at delivery time.\n\nOperation ID: getMtlsCsr\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Webhooks%20V2/getMtlsCsr'

  static enableJsonFlag = false

  static flags = {
    'key-algorithm': Flags.string({
      description: 'Algorithm of the private key the CSR is generated for. ECDSA keys are smaller and quicker to issue, but the certificate authority signing the request has to accept an EC subject key, which some do not by default.',
      default: 'RSA',
      options: ['RSA', 'ECDSA'],
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/webhooks_settings/mtls_csr'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetMtlsCsr)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['key-algorithm'] !== undefined && flags['key-algorithm'] !== null) {
      queryParams['keyAlgorithm'] = String(flags['key-algorithm'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/webhooks_settings/mtls_csr',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
