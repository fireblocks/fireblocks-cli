import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetContractAddress extends FireblocksBaseCommand {
  static summary = 'Get contract address by transaction hash'

  static description = 'Retrieve the contract address by blockchain native asset ID and transaction hash\n\nOperation ID: getContractAddress\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Contract%20Interactions/getContractAddress'

  static enableJsonFlag = false

  static flags = {
    'base-asset-id': Flags.string({
      description: 'The blockchain base assetId',
      required: true,
    }),
    'tx-hash': Flags.string({
      description: 'The transaction hash',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/contract_interactions/base_asset_id/{baseAssetId}/tx_hash/{txHash}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetContractAddress)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['baseAssetId'] = String(flags['base-asset-id'])
    pathParams['txHash'] = String(flags['tx-hash'])


    const result = await this.makeRequest(
      'GET',
      '/v1/contract_interactions/base_asset_id/{baseAssetId}/tx_hash/{txHash}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
