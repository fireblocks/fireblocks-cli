import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class RemoveLayerZeroPeers extends FireblocksBaseCommand {
  static summary = 'Remove LayerZero peers'

  static description = 'Remove LayerZero peers to disconnect adapter contracts. This endpoint removes peer relationships between LayerZero adapters.\n\nOperation ID: removeLayerZeroPeers\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tokenization/removeLayerZeroPeers'

  static enableJsonFlag = false

  static flags = {
    data: Flags.string({
      description: 'JSON request body',
      required: true,
    }),
  }

  static method = 'DELETE'
  static path = '/v1/tokenization/multichain/bridge/layerzero/config/peers'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(RemoveLayerZeroPeers)

    let body: Record<string, unknown> | undefined
    if (flags.data) {
      try {
        const parsed = JSON.parse(flags.data)
        if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
          this.error('--data must be a JSON object (e.g., \'{"key": "value"}\')')
        }
        body = parsed as Record<string, unknown>
      } catch {
        this.error('Invalid JSON in --data flag. Ensure the value is valid JSON.')
      }
    }

    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }



    await this.confirmOrAbort('DELETE', '/v1/tokenization/multichain/bridge/layerzero/config/peers')

    const result = await this.makeRequest(
      'DELETE',
      '/v1/tokenization/multichain/bridge/layerzero/config/peers',
      {
        body,
        headers,
      },
    )

    return result
  }
}
