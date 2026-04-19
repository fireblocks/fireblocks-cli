import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class ValidateLayerZeroChannelConfig extends FireblocksBaseCommand {
  static summary = 'Validate LayerZero channel configuration'

  static description = 'Validate the LayerZero channel configuration between adapters. This endpoint checks if the channel configuration is correct and returns any validation errors.\n\nOperation ID: validateLayerZeroChannelConfig\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tokenization/validateLayerZeroChannelConfig'

  static enableJsonFlag = false

  static flags = {
    'adapter-token-link-id': Flags.string({
      description: 'The token link ID of the adapter',
      required: true,
    }),
    'peer-adapter-token-link-id': Flags.string({
      description: 'Peer adapter token link ID to validate against',
      required: true,
    }),
  }

  static method = 'GET'
  static path = '/v1/tokenization/multichain/bridge/layerzero/validate'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(ValidateLayerZeroChannelConfig)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['adapter-token-link-id'] !== undefined && flags['adapter-token-link-id'] !== null) {
      queryParams['adapterTokenLinkId'] = String(flags['adapter-token-link-id'])
    }
    if (flags['peer-adapter-token-link-id'] !== undefined && flags['peer-adapter-token-link-id'] !== null) {
      queryParams['peerAdapterTokenLinkId'] = String(flags['peer-adapter-token-link-id'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/tokenization/multichain/bridge/layerzero/validate',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
