import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class SetLayerZeroDvnConfig extends FireblocksBaseCommand {
  static summary = 'Set LayerZero DVN configuration'

  static description = 'Configure DVN settings for LayerZero adapters. This endpoint sets up the DVN configuration for message verification between source and destination adapters.\n\nOperation ID: setLayerZeroDvnConfig\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tokenization/setLayerZeroDvnConfig'

  static enableJsonFlag = false

  static flags = {
    data: Flags.string({
      description: 'JSON request body',
      required: true,
    }),
  }

  static method = 'POST'
  static path = '/v1/tokenization/multichain/bridge/layerzero/config/dvns'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(SetLayerZeroDvnConfig)

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



    await this.confirmOrAbort('POST', '/v1/tokenization/multichain/bridge/layerzero/config/dvns')

    const result = await this.makeRequest(
      'POST',
      '/v1/tokenization/multichain/bridge/layerzero/config/dvns',
      {
        body,
        headers,
      },
    )

    return result
  }
}
