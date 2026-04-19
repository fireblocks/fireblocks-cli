import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class UpdateGasStationConfiguration extends FireblocksBaseCommand {
  static summary = 'Edit gas station settings'

  static description = 'Configures gas station settings for ETH.\nLearn more about the Fireblocks Gas Station in the following [guide](https://developers.fireblocks.com/docs/work-with-gas-station).\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: updateGasStationConfiguration\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Gas%20stations/updateGasStationConfiguration'

  static enableJsonFlag = false

  static flags = {
    data: Flags.string({
      description: 'JSON request body',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'PUT'
  static path = '/v1/gas_station/configuration'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(UpdateGasStationConfiguration)

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



    await this.confirmOrAbort('PUT', '/v1/gas_station/configuration')

    const result = await this.makeRequest(
      'PUT',
      '/v1/gas_station/configuration',
      {
        body,
        headers,
      },
    )

    return result
  }
}
