import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class SetLayerZeroPeers extends FireblocksBaseCommand {
  static summary = 'Set LayerZero peers'

  static description = 'Set LayerZero peers to establish connections between adapter contracts. This endpoint creates peer relationships that enable cross-chain communication. It sets the destination adapter as a peer of the source adapter. If \`bidirectional\` is true, it also sets the source adapter as a peer of the destination adapter(s).\n\nOperation ID: setLayerZeroPeers\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tokenization/setLayerZeroPeers'

  static enableJsonFlag = false

  static flags = {
    data: Flags.string({
      description: 'JSON request body',
      required: true,
    }),
  }

  static method = 'POST'
  static path = '/v1/tokenization/multichain/bridge/layerzero/config/peers'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(SetLayerZeroPeers)

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



    await this.confirmOrAbort('POST', '/v1/tokenization/multichain/bridge/layerzero/config/peers')

    const result = await this.makeRequest(
      'POST',
      '/v1/tokenization/multichain/bridge/layerzero/config/peers',
      {
        body,
        headers,
      },
    )

    return result
  }
}
