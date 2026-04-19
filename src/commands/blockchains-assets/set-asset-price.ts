import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class SetAssetPrice extends FireblocksBaseCommand {
  static summary = 'Set asset price'

  static description = 'Set asset price for the given asset id. Returns the asset price response.\n\nOperation ID: setAssetPrice\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Blockchains%20%26%20assets/setAssetPrice'

  static enableJsonFlag = false

  static flags = {
    'id': Flags.string({
      description: 'The ID of the asset',
      required: true,
    }),
    data: Flags.string({
      description: 'JSON request body',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/assets/prices/{id}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(SetAssetPrice)

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
    pathParams['id'] = String(flags['id'])


    await this.confirmOrAbort('POST', '/v1/assets/prices/{id}')

    const result = await this.makeRequest(
      'POST',
      '/v1/assets/prices/{id}',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
