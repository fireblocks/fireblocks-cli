import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetLayerZeroDvnConfig extends FireblocksBaseCommand {
  static summary = 'Get LayerZero DVN configuration'

  static description = 'Retrieve the DVN (Data Verification Network) configuration for a specific adapter. Returns DVN configurations for channels between the source adapter and its peers.\n\nOperation ID: getLayerZeroDvnConfig\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tokenization/getLayerZeroDvnConfig'

  static enableJsonFlag = false

  static flags = {
    'adapter-token-link-id': Flags.string({
      description: 'The token link id of the adapter token link',
      required: true,
    }),
    'peer-adapter-token-link-id': Flags.string({
      description: 'Optional peer adapter token link ID to filter results',
    }),
  }

  static method = 'GET'
  static path = '/v1/tokenization/multichain/bridge/layerzero/config/{adapterTokenLinkId}/dvns'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetLayerZeroDvnConfig)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['adapterTokenLinkId'] = String(flags['adapter-token-link-id'])

    const queryParams: Record<string, string> = {}
    if (flags['peer-adapter-token-link-id'] !== undefined && flags['peer-adapter-token-link-id'] !== null) {
      queryParams['peerAdapterTokenLinkId'] = String(flags['peer-adapter-token-link-id'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/tokenization/multichain/bridge/layerzero/config/{adapterTokenLinkId}/dvns',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
