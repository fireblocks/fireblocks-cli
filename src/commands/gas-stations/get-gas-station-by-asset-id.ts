import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetGasStationByAssetId extends FireblocksBaseCommand {
  static summary = 'Get gas station settings by asset'

  static description = 'Returns gas station settings and balances for a requested asset.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: getGasStationByAssetId\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Gas%20stations/getGasStationByAssetId'

  static enableJsonFlag = false

  static flags = {
    'asset-id': Flags.string({
      description: 'The ID of the asset',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/gas_station/{assetId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetGasStationByAssetId)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['assetId'] = String(flags['asset-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/gas_station/{assetId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
