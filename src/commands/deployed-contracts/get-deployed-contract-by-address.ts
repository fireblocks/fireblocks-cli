import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetDeployedContractByAddress extends FireblocksBaseCommand {
  static summary = 'Return deployed contract data'

  static description = 'Return deployed contract data by blockchain native asset id and contract address\n\nOperation ID: getDeployedContractByAddress\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Deployed%20Contracts/getDeployedContractByAddress'

  static enableJsonFlag = false

  static flags = {
    'contract-address': Flags.string({
      description: 'The contract\'s onchain address',
      required: true,
    }),
    'asset-id': Flags.string({
      description: 'The assetId parameter',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/tokenization/contracts/{assetId}/{contractAddress}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetDeployedContractByAddress)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['contractAddress'] = String(flags['contract-address'])
    pathParams['assetId'] = String(flags['asset-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/tokenization/contracts/{assetId}/{contractAddress}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
