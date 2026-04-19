import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetDeployedContracts extends FireblocksBaseCommand {
  static summary = 'List deployed contracts data'

  static description = 'Return a filtered lean representation of the deployed contracts data on all blockchains (paginated)\n\nOperation ID: getDeployedContracts\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Deployed%20Contracts/getDeployedContracts'

  static enableJsonFlag = false

  static flags = {
    'page-cursor': Flags.string({
      description: 'Page cursor to get the next page',
    }),
    'page-size': Flags.string({
      description: 'Number of items per page, requesting more then max will return max items',
    }),
    'contract-address': Flags.string({
      description: 'The contract\'s onchain address',
    }),
    'base-asset-id': Flags.string({
      description: 'The baseAssetId parameter',
    }),
    'contract-template-id': Flags.string({
      description: 'The contractTemplateId parameter',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/tokenization/contracts'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetDeployedContracts)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }
    if (flags['contract-address'] !== undefined && flags['contract-address'] !== null) {
      queryParams['contractAddress'] = String(flags['contract-address'])
    }
    if (flags['base-asset-id'] !== undefined && flags['base-asset-id'] !== null) {
      queryParams['baseAssetId'] = String(flags['base-asset-id'])
    }
    if (flags['contract-template-id'] !== undefined && flags['contract-template-id'] !== null) {
      queryParams['contractTemplateId'] = String(flags['contract-template-id'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/tokenization/contracts',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
