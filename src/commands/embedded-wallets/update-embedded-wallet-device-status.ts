import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class UpdateEmbeddedWalletDeviceStatus extends FireblocksBaseCommand {
  static summary = 'Update device status'

  static description = 'Update the enabled/disabled status of a specific device for a Non Custodial Wallet\n\nOperation ID: updateEmbeddedWalletDeviceStatus\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Embedded%20Wallets/updateEmbeddedWalletDeviceStatus'

  static enableJsonFlag = false

  static flags = {
    'wallet-id': Flags.string({
      description: 'Wallet Id',
      required: true,
    }),
    'device-id': Flags.string({
      description: 'Device Id',
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
  static path = '/v1/ncw/wallets/{walletId}/devices/{deviceId}/status'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(UpdateEmbeddedWalletDeviceStatus)

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
    pathParams['walletId'] = String(flags['wallet-id'])
    pathParams['deviceId'] = String(flags['device-id'])


    await this.confirmOrAbort('PATCH', '/v1/ncw/wallets/{walletId}/devices/{deviceId}/status')

    const result = await this.makeRequest(
      'PATCH',
      '/v1/ncw/wallets/{walletId}/devices/{deviceId}/status',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
