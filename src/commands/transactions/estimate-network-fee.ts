import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class EstimateNetworkFee extends FireblocksBaseCommand {
  static summary = 'Estimate the required fee for an asset'

  static description = 'Gets the estimated required fee for an asset.\nFireblocks fetches, calculates and caches the result every 30 seconds.\nCustomers should query this API while taking the caching interval into consideration.\nNotes:\n- The \`networkFee\` parameter is the \`gasPrice\` with a given delta added, multiplied by the gasLimit plus the delta. - The estimation provided depends on the asset type.\n    - For UTXO-based assets, the response contains the \`feePerByte\` parameter\n    - For ETH-based and all EVM based assets, the response will contain \`gasPrice\` parameter. This is calculated by adding the \`baseFee\` to the \`actualPriority\` based on the latest 12 blocks. The response for ETH-based  contains the \`baseFee\`, \`gasPrice\`, and \`priorityFee\` parameters.\n    - For ADA-based assets, the response will contain the parameter \`networkFee\` and \`feePerByte\` parameters.\n    - For XRP and XLM, the response will contain the transaction fee.\n    - For other assets, the response will contain the \`networkFee\` parameter.\n\nLearn more about Fireblocks Fee Management in the following [guide](https://developers.fireblocks.com/reference/estimate-transaction-fee).\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: estimateNetworkFee\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Transactions/estimateNetworkFee'

  static enableJsonFlag = false

  static flags = {
    'asset-id': Flags.string({
      description: 'The asset for which to estimate the fee',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/estimate_network_fee'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(EstimateNetworkFee)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['asset-id'] !== undefined && flags['asset-id'] !== null) {
      queryParams['assetId'] = String(flags['asset-id'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/estimate_network_fee',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
