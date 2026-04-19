import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class SetNetworkIdName extends FireblocksBaseCommand {
  static summary = 'Update network ID\'s name.'

  static description = 'Updates name of a specified network ID.\n\nOperation ID: setNetworkIdName\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Network%20connections/setNetworkIdName'

  static enableJsonFlag = false

  static flags = {
    'network-id': Flags.string({
      description: 'The ID of the network',
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

  static method = 'PATCH'
  static path = '/v1/network_ids/{networkId}/set_name'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(SetNetworkIdName)

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
    pathParams['networkId'] = String(flags['network-id'])


    await this.confirmOrAbort('PATCH', '/v1/network_ids/{networkId}/set_name')

    const result = await this.makeRequest(
      'PATCH',
      '/v1/network_ids/{networkId}/set_name',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
