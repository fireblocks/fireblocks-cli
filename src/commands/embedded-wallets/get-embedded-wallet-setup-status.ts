import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetEmbeddedWalletSetupStatus extends FireblocksBaseCommand {
  static summary = 'Get wallet key setup state'

  static description = 'Get the key setup state for a specific Non Custodial Wallet, including required algorithms and device setup status\n\nOperation ID: getEmbeddedWalletSetupStatus\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Embedded%20Wallets/getEmbeddedWalletSetupStatus'

  static enableJsonFlag = false

  static flags = {
    'wallet-id': Flags.string({
      description: 'Wallet Id',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/ncw/wallets/{walletId}/setup_status'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetEmbeddedWalletSetupStatus)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['walletId'] = String(flags['wallet-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/ncw/wallets/{walletId}/setup_status',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
