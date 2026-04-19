import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetEmbeddedWalletDeviceSetupState extends FireblocksBaseCommand {
  static summary = 'Get device key setup state'

  static description = 'Get the state of the specific device setup key under a specific Non Custodial Wallet\n\nOperation ID: GetEmbeddedWalletDeviceSetupState\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Embedded%20Wallets/GetEmbeddedWalletDeviceSetupState'

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
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/ncw/wallets/{walletId}/devices/{deviceId}/setup_status'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetEmbeddedWalletDeviceSetupState)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['walletId'] = String(flags['wallet-id'])
    pathParams['deviceId'] = String(flags['device-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/ncw/wallets/{walletId}/devices/{deviceId}/setup_status',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
