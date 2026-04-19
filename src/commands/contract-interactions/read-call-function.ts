import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class ReadCallFunction extends FireblocksBaseCommand {
  static summary = 'Call a read function on a deployed contract'

  static description = 'Call a read function on a deployed contract by blockchain native asset id and contract address\n\nOperation ID: readCallFunction\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Contract%20Interactions/readCallFunction'

  static enableJsonFlag = false

  static flags = {
    'contract-address': Flags.string({
      description: 'The contract\'s onchain address',
      required: true,
    }),
    'base-asset-id': Flags.string({
      description: 'The baseAssetId parameter',
      required: true,
    }),
    data: Flags.string({
      description: 'JSON request body',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/contract_interactions/base_asset_id/{baseAssetId}/contract_address/{contractAddress}/functions/read'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(ReadCallFunction)

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

    const pathParams: Record<string, string> = {}
    pathParams['contractAddress'] = String(flags['contract-address'])
    pathParams['baseAssetId'] = String(flags['base-asset-id'])


    await this.confirmOrAbort('POST', '/v1/contract_interactions/base_asset_id/{baseAssetId}/contract_address/{contractAddress}/functions/read')

    const result = await this.makeRequest(
      'POST',
      '/v1/contract_interactions/base_asset_id/{baseAssetId}/contract_address/{contractAddress}/functions/read',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
