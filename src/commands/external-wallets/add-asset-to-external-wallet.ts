import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class AddAssetToExternalWallet extends FireblocksBaseCommand {
  static summary = 'Add an asset to an external wallet.'

  static description = 'Adds an asset to an existing external wallet. Endpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: addAssetToExternalWallet\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/External%20wallets/addAssetToExternalWallet'

  static enableJsonFlag = false

  static flags = {
    'wallet-id': Flags.string({
      description: 'The ID of the wallet',
      required: true,
    }),
    'asset-id': Flags.string({
      description: 'The ID of the asset to add',
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
  static path = '/v1/external_wallets/{walletId}/{assetId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(AddAssetToExternalWallet)

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
    pathParams['assetId'] = String(flags['asset-id'])


    await this.confirmOrAbort('POST', '/v1/external_wallets/{walletId}/{assetId}')

    const result = await this.makeRequest(
      'POST',
      '/v1/external_wallets/{walletId}/{assetId}',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
