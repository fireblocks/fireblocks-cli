import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class SetOtaStatus extends FireblocksBaseCommand {
  static summary = 'Enable or disable transactions to OTA'

  static description = 'Enable or disable transactions to One Time Addresses (Non Whitelisted addresses).\nLearn more about [One Time Addresses](https://support.fireblocks.io/hc/en-us/articles/4409104568338-One-Time-Address-OTA-feature)\n\nOperation ID: setOtaStatus\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/OTA/setOtaStatus'

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
  static path = '/v1/management/ota'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(SetOtaStatus)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')

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



    await this.confirmOrAbort('PUT', '/v1/management/ota')

    const result = await this.makeRequest(
      'PUT',
      '/v1/management/ota',
      {
        body,
        headers,
      },
    )

    return result
  }
}
