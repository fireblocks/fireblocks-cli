import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetTrustProofOfAddress extends FireblocksBaseCommand {
  static summary = 'Retrieve Trust Network Proof of Address Signature'

  static description = 'Retrieves the TRUST-compatible encoded signature for a proof of address transaction. Send this signature directly to TRUST for verification.\n\nOperation ID: getTrustProofOfAddress\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Travel%20Rule/getTrustProofOfAddress'

  static enableJsonFlag = false

  static flags = {
    'transaction-id': Flags.string({
      description: 'Fireblocks transaction ID (UUID format)',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/screening/travel_rule/providers/trust/proof_of_address/{transactionId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetTrustProofOfAddress)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['transactionId'] = String(flags['transaction-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/screening/travel_rule/providers/trust/proof_of_address/{transactionId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
