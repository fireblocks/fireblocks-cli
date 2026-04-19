import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateNetworkId extends FireblocksBaseCommand {
  static summary = 'Creates a new Network ID'

  static description = 'Create a new Network ID.\n\nOperation ID: createNetworkId\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Network%20connections/createNetworkId'

  static enableJsonFlag = false

  static flags = {
    data: Flags.string({
      description: 'JSON request body',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/network_ids'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateNetworkId)

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



    await this.confirmOrAbort('POST', '/v1/network_ids')

    const result = await this.makeRequest(
      'POST',
      '/v1/network_ids',
      {
        body,
        headers,
      },
    )

    return result
  }
}
