import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class DeployAndLinkAdapters extends FireblocksBaseCommand {
  static summary = 'Deploy LayerZero adapters'

  static description = 'Deploy LayerZero adapters for multichain token bridging functionality. This endpoint creates adapter contracts that enable cross-chain token transfers.\n\nOperation ID: deployAndLinkAdapters\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tokenization/deployAndLinkAdapters'

  static enableJsonFlag = false

  static flags = {
    data: Flags.string({
      description: 'JSON request body',
      required: true,
    }),
  }

  static method = 'POST'
  static path = '/v1/tokenization/multichain/bridge/layerzero'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(DeployAndLinkAdapters)

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



    await this.confirmOrAbort('POST', '/v1/tokenization/multichain/bridge/layerzero')

    const result = await this.makeRequest(
      'POST',
      '/v1/tokenization/multichain/bridge/layerzero',
      {
        body,
        headers,
      },
    )

    return result
  }
}
