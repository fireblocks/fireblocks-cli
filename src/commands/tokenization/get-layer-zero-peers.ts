import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetLayerZeroPeers extends FireblocksBaseCommand {
  static summary = 'Get LayerZero peers'

  static description = 'Retrieve the LayerZero peers configured for a specific adapter. Returns information about peer relationships for cross-chain communication.\n\nOperation ID: getLayerZeroPeers\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tokenization/getLayerZeroPeers'

  static enableJsonFlag = false

  static flags = {
    'adapter-token-link-id': Flags.string({
      description: 'The token link id of the adapter token link',
      required: true,
    }),
  }

  static method = 'GET'
  static path = '/v1/tokenization/multichain/bridge/layerzero/config/{adapterTokenLinkId}/peers'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetLayerZeroPeers)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['adapterTokenLinkId'] = String(flags['adapter-token-link-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/tokenization/multichain/bridge/layerzero/config/{adapterTokenLinkId}/peers',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
