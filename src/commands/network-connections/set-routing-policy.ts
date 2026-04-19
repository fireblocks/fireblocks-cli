import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class SetRoutingPolicy extends FireblocksBaseCommand {
  static summary = 'Update network connection routing policy.'

  static description = 'Updates an existing network connection\'s routing policy.\n\nOperation ID: setRoutingPolicy\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Network%20connections/setRoutingPolicy'

  static enableJsonFlag = false

  static flags = {
    'connection-id': Flags.string({
      description: 'The ID of the network connection',
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

  static method = 'PATCH'
  static path = '/v1/network_connections/{connectionId}/set_routing_policy'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(SetRoutingPolicy)

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

    const pathParams: Record<string, string> = {}
    pathParams['connectionId'] = String(flags['connection-id'])


    await this.confirmOrAbort('PATCH', '/v1/network_connections/{connectionId}/set_routing_policy')

    const result = await this.makeRequest(
      'PATCH',
      '/v1/network_connections/{connectionId}/set_routing_policy',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
