import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class ValidateAddress extends FireblocksBaseCommand {
  static summary = 'Validate destination address'

  static description = 'Checks if an address is valid and active (for XRP, DOT, XLM, and EOS).\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: validateAddress\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Transactions/validateAddress'

  static enableJsonFlag = false

  static flags = {
    'asset-id': Flags.string({
      description: 'The asset of the address',
      required: true,
    }),
    'address': Flags.string({
      description: 'The address to validate',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/transactions/validate_address/{assetId}/{address}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(ValidateAddress)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['assetId'] = String(flags['asset-id'])
    pathParams['address'] = String(flags['address'])


    const result = await this.makeRequest(
      'GET',
      '/v1/transactions/validate_address/{assetId}/{address}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
